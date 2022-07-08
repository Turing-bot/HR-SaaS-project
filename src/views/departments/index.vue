<template>
  <el-card class="tree-card">
    <el-row
      type="flex"
      justify="space-between"
      align="middle"
      class="abc"
      style="height: 40px; border-bottom: 1px solid #ccc"
    >
      <el-col>
        <span>公司集团组织架构</span>
      </el-col>
      <el-col :span="4">
        <el-row type="flex" justify="end">
          <el-col>负责人</el-col>
          <el-col>
            <el-dropdown>
              <span>操作<i class="el-icon-arrow-down" /></span>
              <el-dropdown-menu>
                <el-dropdown-item>添加子部门</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
      <el-row
        slot-scope="{ data }"
        type="flex"
        justify="space-between"
        align="middle"
        style="height: 40px; width: 100%"
      >
        <el-col>
          <span>{{ data.name }}</span>
        </el-col>
        <el-col :span="4">
          <el-row type="flex" justify="end">
            <el-col>{{ data.manager }}</el-col>
            <el-col>
              <el-dropdown>
                <span
                  >操作
                  <i class="el-icon-arrow-down" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>添加子部门</el-dropdown-item>
                  <el-dropdown-item>编辑部门</el-dropdown-item>
                  <el-dropdown-item>删除部门</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-tree>
  </el-card>
</template>

<script>
export default {
  name: 'Departments',
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
      { name: '人事部', manager: '王五' }]
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
