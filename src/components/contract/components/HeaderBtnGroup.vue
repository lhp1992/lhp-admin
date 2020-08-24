<template>
  <div class="right-btns">
    <el-button type="primary" size="mini">提交</el-button>
    <el-button type="primary" size="mini">保存</el-button>
    <el-button type="primary" size="mini">转发</el-button>
    <span>
      <el-dropdown trigger="click" size="small">
        <i class="el-icon-menu" style="font-size: 24px; cursor: pointer;"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>显示列定制</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </span>
  </div>
</template>

<style lang="scss" scoped>
  .right-btns {
    height: 39px;
    display: flex;
    align-items: center;
    &>span {
      line-height: 1;
      margin-left: 10px;
      &:first-child{
        margin-left: 0px;
      }
    }
  }
</style>