<template>
  <lhp-left-slide-bar>
    <div class="tree">
      <div class="tree-search">
        <strong>全部类型</strong>
        <el-input
          size="mini"
          class="tree-search-content"
          placeholder="输入关键字进行过滤"
          suffix-icon="el-icon-search"
          v-model="filterText">
        </el-input>
      </div>
      <div class="tree-content">
        <el-tree
          class="filter-tree"
          :data="data"
          default-expand-all
          highlight-current
          :expand-on-click-node="false"
          @current-change="handleCurrentChange"
          :filter-node-method="filterNode"
          :node-key="idKey"
          ref="tree">

          <!-- <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button
                type="text"
                size="mini">
                Append
              </el-button>
              <el-button
                type="text"
                size="mini">
                Delete
              </el-button>
            </span>
          </span> -->

        </el-tree>
      </div>
    </div>
  </lhp-left-slide-bar>
</template>


<script>
export default {
  inject: ['top'],
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    queryKey: {
      type: String,
      default: 'treeid'
    },
    idKey: {
      type: String,
      default: 'id'
    },
    unParent: Boolean,
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleCurrentChange(data, node) {
      let id = data[this.idKey]
      if (this.currentNodeKey === id) {
        this.currentNodeKey = undefined
        this.$refs.tree.setCurrentKey()
        id = undefined
      } else {
        this.currentNodeKey = data[this.idKey]
      }
      if (this.unParent && data.children && data.children.length > 0) {
        return false
      }
      let object = {}
      object[this.queryKey] = id
      this.top.search(object)
    }
  },
  data() {
    return {
      currentNodeKey: undefined,
      filterText: ''
    };
  }
};
</script>

<style lang="scss">
  .filter-tree{
    .el-tree-node__label {
      font-size: 12px;
    }
  }
</style>
<style lang="scss" scoped>
  .tree {
    width: 320px;
    height: 100%;
    border-right: 1px solid $borderSolidColor;
    @include flex(1);
  }
  .tree-content {
    overflow-y: auto;
    padding: 15px;
  }
  .tree-search {
    @include flex;
    padding: 6px 15px;
    border-bottom: 1px solid $borderSolidColor;
    &>strong {
      line-height: 28px;
      margin-right: 10px;
    }
    &>* {
      vertical-align: middle;
    }
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 8px;
  }
</style>
