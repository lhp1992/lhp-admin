<template>
  <el-col :span="span">
    <el-form-item :label="label">
      <!-- <el-input size="small" v-model="form.name"></el-input> -->
      <slot></slot>
    </el-form-item>
  </el-col>
</template>

<script>
export default {
  inject: ['col'],
  props: {
    label: String,
    span: {
      type: Number,
      default() {
        return parseInt(24 / this.col)
      }
    }
  }
};
</script>
