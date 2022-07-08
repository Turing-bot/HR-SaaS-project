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
          :default-expand-all="true"
        >
          <TreeTools slot-scope="{ data }" :tree-node="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'

export default {
  name: 'Departments',
  components: {
    TreeTools
  },
  data () {
    return {
      defaultProps: {
        label: 'name'
      },
      departs: [{
        name: '总裁办',
        manager: '曹操',
        children: [
          { name: '董事会', manager: '张三' }
        ]
      },
      { name: '行政部', manager: '李四' },
      { name: '人事部', manager: '王五' }],
      company: { name: '公司集团组织架构', manager: '负责人' }
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
