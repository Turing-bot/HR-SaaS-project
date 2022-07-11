<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height: 60px">
              <el-button icon="el-icon-plus" size="small" type="primary"
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
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary">编辑</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="deleteUser(row.id)"
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
  </div>
</template>

<script>
import { getRoleInfo, getCompanyInfo, deleteUser, getUserInfo } from '@/api/setting'
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
      }
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created () {
    this.getRoleInfo()
    this.getCompanyInfo()
  },
  methods: {
    async getRoleInfo () {
      const { rows, total } = await getRoleInfo()
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
    async deleteUser (id) {
      try {
        await this.$confirm('确认删除该角色吗？')
        await deleteUser(id)
        this.getRoleInfo()
        this.$message.success('删除角色成功')
      } catch (err) {
        console.log(err)
      }
    },
    async getUserInfo (id) {
      const result = await getUserInfo(id)
      console.log(result)
    }
  }

}
</script>

<style>
</style>
