<template>
  <el-input
    size="mini"
    class="flow-table-search"
    v-model="text"
    @keyup.native.enter="handleSubmit"
    placeholder="输入关键字进行过滤">
    <i slot="suffix" @click="handleSubmit" class="el-input__icon el-icon-search" style="cursor: pointer"></i>
  </el-input>
</template>

<script>
export default {
  inject: ['top'],
  props: {
    queryKey: {
      type: String,
      default: 'searchText'
    }
  },
  data() {
    return {
      text: ''
    }
  },
  methods: {
    handleSubmit() {
      let object = {}
      object[this.queryKey] = this.text
      this.top.search(object)
    }
  }
};
</script>

<style lang="scss">
  .flow-table-search {
    width: 200px;
    position: relative;
    z-index: 1;
    & .el-input__icon:hover{
      color: #409EFF;
    }
    input {
      border-radius: 0;
    }
  }
</style>
