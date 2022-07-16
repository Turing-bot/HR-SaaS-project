<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <template v-slot:before>
          <span>权限管理请谨慎操作</span>
        </template>
        <template v-slot:after>
          <el-button type="primary" size="small" @click="addPermission(1, '0')"
            >添加权限</el-button
          >
        </template>
      </page-tools>
      <el-table border :data="list" row-key="id">
        <el-table-column align="center" label="名称" prop="name" />
        <el-table-column align="center" label="标识" prop="code" />
        <el-table-column align="center" label="描述" prop="description" />
        <el-table-column align="center" label="操作">
          <template slot-scope="{ row }">
            <el-button
              v-if="row.type === 1"
              type="text"
              @click="addPermission(2, row.id)"
              >添加</el-button
            >
            <el-button type="text" @click="editPermission(row.id)"
              >编辑</el-button
            >
            <el-button type="text" @click="delPermission(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :title="`${showText}权限点`"
        :visible="showDialog"
        @close="btnCancel"
      >
        <el-form
          ref="permForm"
          :model="formData"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="formData.name" style="width: 90%" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="formData.code" style="width: 90%" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" style="width: 90%" />
          </el-form-item>
          <el-form-item label="开启">
            <el-switch
              v-model="formData.enVisible"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" type="primary" @click="btnOK"
              >确定</el-button
            >
            <el-button size="small" @click="btnCancel">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { updatePermission, addPermission, getPermissionDetail, delPermission, getPermissionList } from '@/api/permission'
import { convertTreeData } from '@/utils'

export default {
  name: 'Permission',
  data () {
    return {
      list: [],
      formData: {
        code: '',
        description: '',
        enVisible: '',
        id: '',
        name: '',
        pid: '',
        type: ''
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      },
      showDialog: false
    }
  },
  computed: {
    showText () {
      return this.formData.id ? '编辑' : '新增'
    }
  },
  created () {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList () {
      this.list = convertTreeData(await getPermissionList(), '0')
    },
    async delPermission (id) {
      try {
        await this.$confirm('确定要删除该数据吗')
        await delPermission(id)
        this.getPermissionList()
        this.$message.success('删除成功')
      } catch (err) {
        console.log(err)
      }
    },
    btnOK () {
      this.$refs.permForm.validate().then(() => {
        if (this.formData.id) {
          // 表示要修改权限
          return updatePermission(this.formData)
        } else {
          // 否则就是添加权限
          return addPermission(this.formData)
        }
      }).then(() => {
        //  提示消息
        this.$message.success('新增成功')
        this.getPermissionList()
        this.showDialog = false
      })
    },
    btnCancel () {
      this.formData = {
        name: '',
        code: '',
        description: '',
        type: '',
        pid: '',
        enVisible: '0'
      }
      this.$refs.permForm.resetFields()
      this.showDialog = false
    },
    addPermission (type, pid) {
      // 访问权的type=1 按钮操作权的type=2
      // pid 表示当前数据的父节点标识
      // 记录当前添加的类型和父标识
      this.formData.pid = pid
      this.formData.type = type
      this.showDialog = true
    },
    async editPermission (id) {
      // 根据获取id获取详情
      this.formData = await getPermissionDetail(id)
      this.showDialog = true
    }
  }

}
</script>

<style>
</style>
