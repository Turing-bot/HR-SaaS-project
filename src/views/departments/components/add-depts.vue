<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :title="showTitle" :visible="showDialog" @close="btnCancel">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form
      ref="deptForm"
      label-width="120px"
      :model="formData"
      :rules="rules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="formData.name"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="formData.code"
          style="width: 80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          style="width: 80%"
          placeholder="请选择"
          @focus="getEmployeeSimple"
        >
          <el-option
            v-for="item in peoples"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOk"> 确定 </el-button>
        <el-button size="small" @click="btnCancel"> 取消 </el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { addDepartments, getDepartmentsData, getDepartDetail } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'

export default {
  name: 'AddDepts',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data () {
    const checkNameRepeat = async (rule, value, callback) => {
      const { depts } = await getDepartmentsData()
      const isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      isRepeat ? callback(new Error('已存在相同名称部门')) : callback()
    }
    const checkCodeRepeat = async (rule, value, callback) => {
      const { depts } = await getDepartmentsData()
      const isRepeat = depts.some(item => item.code === value && value)
      isRepeat ? callback(new Error('已存在相同部门编码')) : callback()
    }
    return {
      peoples: [],
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [{ required: true, message: '部门名称不能为空！', trigger: 'blur' }, {
          min: 1, max: 50, message: '部门名称长度为1-50个字符', trigger: 'blur'
        }, {
          trigger: 'blur', validator: checkNameRepeat
        }],
        code: [{ required: true, message: '部门编码不能为空！', trigger: 'blur' }, {
          min: 1, max: 50, message: '部门编码长度为1-50个字符', trigger: 'blur'
        }, {
          trigger: 'blur', validator: checkCodeRepeat
        }],
        manager: [{ required: true, message: '部门负责人不能为空！', trigger: 'blur' }],
        introduce: [{ required: true, message: '部门介绍不能为空！', trigger: 'blur' }, {
          min: 1, max: 300, message: '部门介绍内容长度为1-300个字符', trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    showTitle () {
      return this.formData.id ? '编辑部门' : '新增子部门'
    }
  },
  methods: {
    async getEmployeeSimple () {
      this.peoples = await getEmployeeSimple()
    },
    btnOk () {
      this.$refs.deptForm.validate(async isOk => {
        if (isOk) {
          await addDepartments({ ...this.formData, pid: this.treeNode.id })
          this.$emit('addDepts')
          this.$emit('update:showDialog', false)
          this.$message.success('添加部门成功！')
        }
      })
    },
    btnCancel () {
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      this.$refs.deptForm.resetFields()
      this.$emit('update:showDialog', false)
    },
    async getDepartDetail (id) {
      this.formData = await getDepartDetail(id)
    }
  }
}
</script>

<style>
</style>
