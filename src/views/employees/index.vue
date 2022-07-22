<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <span slot="before">共{{ this.page.total }}条记录</span>
        <template #after>
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
            >导入</el-button
          >
          <el-button size="small" type="danger" @click="exportData"
            >导出</el-button
          >
          <el-button
            size="small"
            type="primary"
            :disabled="!checkPermission('POINT_USER_ADD')"
            @click="showDialog = true"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table v-loading="loading" border :data="list">
          <el-table-column
            align="center"
            label="序号"
            sortable=""
            type="index"
          />
          <el-table-column
            align="center"
            label="姓名"
            sortable=""
            prop="username"
          />
          <el-table-column align="center" label="照片" prop="workNumber">
            <template slot-scope="{ row }">
              <img
                v-imageerror="require('@/assets/common/bigUserHeader.png')"
                :src="row.staffPhoto"
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
                @click="showQrCode(row.staffPhoto)"
              />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="工号"
            sortable=""
            prop="workNumber"
          />
          <el-table-column
            align="center"
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
            :formatter="formatEmployment"
          />
          <el-table-column
            align="center"
            label="部门"
            sortable=""
            prop="departmentName"
          />
          <el-table-column
            align="center"
            label="入职时间"
            sortable=""
            prop="timeOfEntry"
          >
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="账户状态"
            sortable=""
            prop="enableState"
          >
            <template slot-scope="{ row }">
              <el-switch :value="row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            fixed="right"
            width="280"
          >
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="small"
                :disabled="!checkPermission('POINT_USER_READ')"
                @click="$router.push(`/employees/detail/${row.id}`)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="editRole(row.id)"
                >角色</el-button
              >
              <el-button
                type="text"
                size="small"
                :disabled="!checkPermission('POINT_USER_DELETE')"
                @click="deleteRole(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="prev, pager, next"
            :current-page="page.page"
            :page-size="page.size"
            :total="page.total"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
      <AddEmployees :show-dialog.sync="showDialog" />
      <AssignRole
        ref="AssignRole"
        :show-role-dialog.sync="showRoleDialog"
        :user-id="userId"
      />
    </div>
    <el-dialog :visible.sync="showCodeDialog" title="头像">
      <el-row type="flex" justify="center">
        <canvas ref="myCanvas" />
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import AddEmployees from './components/add-employees.vue'
import AssignRole from './components/assign-role.vue'
import EmployeeEnum from '@/api/constant/employees'
import { getEmployeeList, deleteRole } from '@/api/employees'
import { formatDate } from '@/filters'
import QrCode from 'qrcode'

export default {
  name: 'Employees',
  components: {
    AddEmployees,
    AssignRole
  },
  data () {
    return {
      page: {
        page: 1,
        size: 10,
        total: 0
      },
      list: [],
      loading: false,
      showDialog: false,
      showRoleDialog: false,
      userId: null,
      showCodeDialog: false
    }
  },
  created () {
    this.getEmployeeList()
  },
  methods: {
    changePage (newPage) {
      this.page.page = newPage
      this.getEmployeeList()
    },
    async getEmployeeList () {
      this.loading = true
      const { total, rows } = await getEmployeeList(this.page)
      this.page.total = total
      this.list = rows
      this.loading = false
    },
    formatEmployment (row, column, cellValue, index) {
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    async deleteRole (id) {
      try {
        await this.$confirm('确认删除该员工信息吗？')
        await deleteRole(id)
        this.getEmployeeList()
        this.$message.success('删除员工信息成功')
      } catch (err) {
        console.log(err)
      }
    },
    async editRole (id) {
      this.userId = id
      this.$refs.AssignRole.getUserById(id)
      this.showRoleDialog = true
    },
    // 导出excel数据
    exportData () {
      const headers = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      // 懒加载
      import('@/vendor/Export2Excel').then(async excel => {
        await this.$confirm('确认导出员工信息吗？')
        const { rows } = await getEmployeeList({ page: 1, size: this.page.total })
        const data = this.formatJson(headers, rows) // 返回的data就是要导出的结构
        const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]
        const merges = ['A1:A2', 'B1:F1', 'G1:G2']
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data,
          filename: '员工资料表',
          multiHeader, // 复杂表头
          merges // 合并选项
        })
      })
    },
    // 该方法负责将数组转化成二维数组
    formatJson (headers, rows) {
      return rows.map(item => {
        return Object.keys(headers).map(key => {
          if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
            // 格式化日期
            return formatDate(item[headers[key]])
          } else if (headers[key] === 'formOfEmployment') {
            const obj = EmployeeEnum.hireType.find(obj => obj.id === item[headers[key]])
            return obj ? obj.value : '未知'
          }
          return item[headers[key]]
        })
      })
    },
    showQrCode (url) {
      if (url) {
        this.showCodeDialog = true
        this.$nextTick(() => {
          QrCode.toCanvas(this.$refs.myCanvas, url)
        })
      } else {
        this.$message.warning('用户还未上传照片')
      }
    }
  }
}
</script>

<style>
</style>
