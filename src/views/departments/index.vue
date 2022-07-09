<template>
  <div class="dashboard-container">
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
            @delDepts="getDepartments"
            @addDepts="addDepts"
          />
        </el-tree>
      </el-card>
    </div>
    <AddDepts :show-dialog="showDialog" :tree-node="node" />
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
      node: null
    }
  },
  created () {
    this.getDepartments()
  },
  methods: {
    async getDepartments () {
      const result = await getDepartmentsData()
      this.company = { name: result.companyName, manager: '负责人' }
      this.departs = convertTreeData(result.depts, '')
    },
    addDepts (node) {
      this.showDialog = true
      this.node = node
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
