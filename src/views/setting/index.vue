<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height: 60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="showDialog = true"
                >新增角色</el-button
              >
            </el-row>
            <!-- 表格 -->
            <el-table
              border=""
              :data="list"
              :default-sort="{ prop: 'name', order: 'descending' }"
            >
              <el-table-column
                align="center"
                label="序号"
                type="index"
                width="120"
              />
              <el-table-column
                align="center"
                label="角色名称"
                prop="name"
                width="240"
                sortable
              />
              <el-table-column
                align="center"
                label="描述"
                prop="description"
                sortable
              />
              <el-table-column align="center" label="操作">
                <template slot-scope="{ row }">
                  <el-button
                    size="small"
                    type="success"
                    @click="assignPerm(row.id)"
                    >分配权限</el-button
                  >
                  <el-button
                    size="small"
                    type="primary"
                    @click="editInfo(row.id)"
                    >编辑</el-button
                  >
                  <el-button
                    size="small"
                    type="danger"
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
              <!-- 分页组件 -->
              <el-pagination
                :current-page="page.page"
                :page-size="page.pagesize"
                :total="page.total"
                layout="prev, pager, next"
                @current-change="changePage"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top: 50px">
              <el-form-item label="公司名称">
                <el-input
                  v-model="companyInfo.name"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  v-model="companyInfo.companyAddress"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  v-model="companyInfo.mailbox"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="companyInfo.remarks"
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <el-dialog :visible="showDialog" :title="dialogTitle" @close="btnCancel">
      <el-form
        ref="roleForm"
        label-width="120px"
        :model="roleForm"
        :rules="rules"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="roleForm.description" />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button size="small" type="primary" @click="btnOK">确认</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog
      title="分配权限"
      :visible="showPermDialog"
      @close="btnPermCancel"
    >
      <!-- 权限是一颗树 -->
      <!-- 将数据绑定到组件上 -->
      <!-- :show-checkbox="true" 是否显示复选框 -->
      <!-- check-strictly 如果为true，表示父子之间不互相关联;默认为false互相关联-->
      <!-- :default-checked-keys="selectCheck" 默认选中的节点 -->
      <!-- node-key="id" id作为唯一标识,注意前面不需要加冒号":" -->
      <el-tree
        ref="permTree"
        :data="permData"
        :props="defaultProps"
        :default-expand-all="true"
        :show-checkbox="true"
        :check-strictly="true"
        :default-checked-keys="selectCheck"
        node-key="id"
      />
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnPermCancel">取消</el-button>
          <el-button type="primary" size="small" @click="btnPermOK"
            >确定</el-button
          >
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleInfo, getCompanyInfo, deleteRole, getRoleDetail, editRoleInfo, addRole } from '@/api/setting'
import { convertTreeData } from '@/utils'
import { getPermissionList } from '@/api/permission'
import { assignPerm } from '@/api/setting'
import { mapGetters } from 'vuex'

export default {
  name: 'Setting',
  data () {
    return {
      list: [],
      companyInfo: {},
      page: {
        page: 1,
        pagesize: 10,
        total: 0
      },
      showDialog: false,
      roleForm: {},
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      },
      showPermDialog: false, // 控制分配权限弹层的显示后者隐藏
      defaultProps: {
        label: 'name'
      },
      permData: [], // 专门用来接收权限数据 树形数据
      selectCheck: [], // 定义一个数组来接收 已经选中的节点
      roleId: null // 用来记录分配角色的id
    }
  },
  computed: {
    ...mapGetters(['companyId']),
    dialogTitle () {
      return this.roleForm.id ? '编辑信息' : '新增角色'
    }
  },
  created () {
    this.getRoleInfo()
    this.getCompanyInfo()
  },
  methods: {
    async getRoleInfo () {
      const { rows, total } = await getRoleInfo(this.page)
      this.page.total = total
      this.list = rows
    },
    changePage (newPage) {
      this.page.page = newPage
      this.getRoleInfo()
    },
    async getCompanyInfo () {
      this.companyInfo = await getCompanyInfo()
    },
    async deleteRole (id) {
      try {
        await this.$confirm('确认删除该角色吗？')
        await deleteRole(id)
        this.getRoleInfo()
        this.$message.success('删除角色成功')
      } catch (err) {
        this.getRoleInfo()
      }
    },
    async getRoleDetail (id) {
      const result = await getRoleDetail(id)
      console.log(result)
    },
    async editInfo (id) {
      this.roleForm = await getRoleDetail(id)
      this.showDialog = true
    },
    async btnOK () {
      try {
        await this.$refs.roleForm.validate()
        if (this.roleForm.id) {
          await editRoleInfo(this.roleForm)
          this.$message.success('编辑信息成功')
        } else {
          await addRole(this.roleForm)
          this.$message.success('新增角色成功')
        }
        this.roleForm = {
          name: '',
          description: ''
        }
        this.getRoleInfo()
        this.showDialog = false
      } catch (err) {
        this.getRoleInfo()
      }
    },
    btnCancel () {
      this.roleForm = {
        name: '',
        description: ''
      }
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    },
    async assignPerm (id) {
      this.permData = convertTreeData(await getPermissionList(), '0')
      this.roleId = id
      const { permIds } = await getRoleDetail(id)
      this.selectCheck = permIds
      this.showPermDialog = true
    },
    async btnPermOK () {
      await assignPerm({ permIds: this.$refs.permTree.getCheckedKeys(), id: this.roleId })
      this.$message.success('权限分配成功')
      this.showPermDialog = false
    },
    btnPermCancel () {
      this.selectCheck = []
      this.showPermDialog = false
    }
  }
}
</script>

<style>
</style>
