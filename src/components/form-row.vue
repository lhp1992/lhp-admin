<template>
  <el-form :label-width="labelWidth">
    <el-row :gutter="gutter">
      <slot></slot>
    </el-row>
  </el-form>
</template>

<script>
export default {
  props: {
    col: {
      type: Number,
      default: 2
    },
    gutter: {
      type: Number,
      default: 30
    },
    labelWidth: {
      type: String,
      default: '5em'
    }
  },
  provide() {
    return {
      col: this.col
    }
  }
};
</script>