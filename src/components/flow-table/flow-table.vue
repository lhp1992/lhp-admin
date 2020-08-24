<template>
  <lhp-title-content-page icon="el-icon-s-claim" title="已办事宜" style="height: 100%;">

    <template slot="header-right">
      <slot name="header-right"></slot>
    </template>

    <div class="flow-table">
      <slot name="tree"></slot>
      <div class="flow-table-content">
        <div class="flow-table-box">
          <slot name="tabs"></slot>
          <div class="flow-table-box-content" ref="tableBox">
            <el-table
              ref="multipleTable"
              :data="top.tableData"
              :maxHeight="maxHeight"
              border
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <slot :ifShow="(name) => top.unThList.indexOf(name) === -1"></slot>
            </el-table>
          </div>
          <div class="flow-table-pagination">
            <lhp-pagination v-model="top.pageNumber" @onQuery="pageNumber => top.query(pageNumber)" />
          </div>
        </div>
      </div>
    </div>
  </lhp-title-content-page>
</template>

<script>
import getTop from './top'
export default {
  props: {
    tabsList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    let $top = getTop()
    $top.$vm = this
    return {
      top: $top,
      maxHeight: undefined
    };
  },
  provide() {
    return {
      top: this.top
    }
  },
  mounted() {
    this.maxHeight = this.$refs.tableBox.offsetHeight
  },
  methods: {
    handleSelectionChange(val) {
      this.top.tableSelectionChange(val)
    }
  }
};
</script>

<style lang="scss">
  .flow-table .el-table th {
    background-color: #f7fbfe;
    color: $textColor;
    padding: 6px 0;
    &.is-leaf{
      border-bottom: 2px solid #e2ecf2;
    }
  }

</style>
<style lang="scss" scoped>
  .flow-table {
    height: 100%;
    @include flex;
  }
  .flow-table-box {
    height: 100%;
    position: relative;
    @include flex(1);
  }
  .flow-table-pagination {
    padding: 15px;
    border-top: 1px solid $borderSolidColor;
  }
  .el-table {
    font-size: 12px;
  }
</style>
