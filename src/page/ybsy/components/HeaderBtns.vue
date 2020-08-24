<template>
  <div class="right-btns">
    <span>
      <el-button type="primary" size="small">全部已读</el-button>
    </span>

    <span>
      <el-button-group>
        <el-button :type="top.tableSelect.length < 1 ? 'info' : 'primary'" :disabled="top.tableSelect.length < 1" size="small">{{ checkedType === 'submit' ? '批量提交' : '批量关注' }}</el-button>
        <el-dropdown trigger="click" size="small">
          <el-button type="primary" size="small" class="el-dropdown__caret-button">
            <i class="el-dropdown__icon el-icon-arrow-down"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="checkedType = 'submit'">批量提交</el-dropdown-item>
            <el-dropdown-item @click.native="checkedType = 'watch'">批量关注</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-button-group>
    </span>

    <span>
      <el-dropdown trigger="click" size="small">
        <i class="el-icon-menu" style="font-size: 24px; cursor: pointer;"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item 
            @click.native="top.transfer"
          >显示列定制</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </span>
  </div>
</template>

<script>
export default {
  inject: ['top'],
  data() {
    return {
      checkedType: 'submit',
    }
  }
};
</script>

<style lang="scss">
  .right-btns .el-dropdown__icon {
    line-height: 0;
  }
</style>

<style lang="scss" scoped>
  .right-btns {
    height: 50px;
    display: flex;
    align-items: center;
    &>span {
      line-height: 1;
      margin-left: 5px;
      &:first-child{
        margin-left: 0px;
      }
    }
  }
</style>
