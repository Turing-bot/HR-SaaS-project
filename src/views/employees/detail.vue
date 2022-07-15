<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <!-- 放置表单 -->
            <el-form
              ref="userForm"
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
              :model="userInfo"
              :rules="rules"
            >
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="userInfo.username" style="width: 300px" />
              </el-form-item>
              <el-form-item label="密码:" prop="password2">
                <el-input
                  v-model="userInfo.password2"
                  style="width: 300px"
                  type="password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateInfo">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <component :is="UserComponent" />
          </el-tab-pane>
          <el-tab-pane label="岗位信息" />
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import UserInfo from './components/user-info.vue'
import { getUserById } from '@/api/user'
import { saveRoleInfo } from '@/api/employees'

export default {
  components: {
    UserInfo
  },
  data () {
    return {
      UserComponent: 'UserInfo',
      userId: this.$route.params.id,
      userInfo: {
        username: '',
        password2: ''
      },
      rules: {
        username: [{ required: true, message: '员工姓名不能为空', trigger: 'blur' }, {
          min: 2, max: 4, message: '员工姓名长度在2-4位之间', trigger: 'blur'
        }],
        password2: [{ required: true, message: '密码不能为空', trigger: 'blur' }, {
          min: 6, max: 12, message: '密码长度在6到12位之间', trigger: 'blur'
        }]
      }
    }
  },
  created () {
    this.getUserById()
  },
  methods: {
    async getUserById () {
      this.userInfo = await getUserById(this.userId)
    },
    async updateInfo () {
      try {
        await this.$refs.userForm.validate()
        await saveRoleInfo({ ...this.userInfo, password: this.userInfo.password2 })
        this.$message.success('更新员工信息成功')
        this.$router.back()
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>
</style>
