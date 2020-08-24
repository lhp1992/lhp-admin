<template>
  <div style="height: 100%;">
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      tooltip-effect="dark"
      style="width: 100%">
      <slot></slot>
      <el-table-column
        prop="address"
        label="地址"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [...Array(10).keys()].map((e, i) => {
        return {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      })
    }
  },
  methods: {
  },
  created () {
  }
};
</script>

<style lang="scss" scoped>
</style>