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
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary" @click="showDialog = true"
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
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="deleteRole(row.id)"
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
    </div>
  </div>
</template>

<script>
import AddEmployees from './components/add-employees.vue'
import { getEmployeeList, deleteRole } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'

export default {
  name: 'Employees',
  components: {
    AddEmployees
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
      showDialog: false
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
    }
  }
}
</script>

<style>
</style>
