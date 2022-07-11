<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <TreeTools
          :tree-node="company"
          style="border-bottom: 1px solid #ccc"
          :is-root="true"
          @addDepts="addDepts"
        />
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="false"
        >
          <TreeTools
            slot-scope="{ data }"
            :tree-node="data"
            @addDepts="addDepts"
            @editDepts="editDepts"
            @delDepts="getDepartments"
          />
        </el-tree>
      </el-card>
    </div>
    <AddDepts
      ref="addDept"
      :show-dialog.sync="showDialog"
      :tree-node="node"
      @addDepts="getDepartments"
    />
  </div>
</template>

<script>
import { getDepartmentsData } from '@/api/departments'
import { convertTreeData } from '@/utils'
import TreeTools from './components/tree-tools.vue'
import AddDepts from './components/add-depts.vue'

export default {
  name: 'Departments',
  components: {
    TreeTools,
    AddDepts
  },
  data () {
    return {
      departs: [],
      company: {},
      defaultProps: {
        label: 'name'
      },
      showDialog: false,
      node: null,
      loading: false
    }
  },
  created () {
    this.getDepartments()
  },
  methods: {
    async getDepartments () {
      this.loading = true
      const result = await getDepartmentsData()
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      this.departs = convertTreeData(result.depts, '')
      this.loading = false
    },
    addDepts (node) {
      this.showDialog = true
      this.node = node
    },
    editDepts (node) {
      this.showDialog = true
      this.node = node
      this.$refs.addDept.getDepartDetail(node.id)
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
