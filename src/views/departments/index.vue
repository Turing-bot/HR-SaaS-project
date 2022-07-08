<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <TreeTools
          :tree-node="company"
          style="border-bottom: 1px solid #ccc"
          :is-root="true"
        />

        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="false"
        >
          <TreeTools slot-scope="{ data }" :tree-node="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDepartmentsData } from '@/api/departments'
import { convertTreeData } from '@/utils'

export default {
  name: 'Departments',
  components: {
    TreeTools
  },
  data () {
    return {
      departs: [],
      company: {},
      defaultProps: {
        label: 'name'
      }
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
