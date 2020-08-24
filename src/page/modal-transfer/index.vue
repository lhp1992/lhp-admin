<template>
  <div class="ant-modal" style="width: 700px; height: 536px;">
    <div class="ant-modal-content ">
      <span class="ant-modal-close" @click="$emit('close')"><span class="ant-modal-close-x"><i class="el-icon-close"></i></span></span>
      <div class="ant-modal-header">
        <div class="ant-modal-title">
          {{ params.title }}
        </div>
      </div>
      <div class="ant-modal-body">
        <div style="text-align: center">
          <el-transfer 
            v-model="value" 
            :data="params.data || []"
            :titles="params.titles || undefined"
          ></el-transfer>
        </div>
      </div>
      <div class="ant-modal-footer clearfix">
        <div style="float: right; padding: 10px 20px;">
          <el-button @click="handleSubmit" size="small" type="success">保存</el-button>
          <el-button @click="$emit('close')" size="small">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    params: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data(){
    return {
      value: [...this.params.label || []]
    }
  },
  methods: {
    handleSubmit() {
      this.params.onSubmit && this.params.onSubmit(this.value)
      this.$emit('close')
    }
  }
};
</script>

<style lang="scss">
  .el-transfer {
    display: inline-block;
    margin: 20px auto;
    text-align: left;
  }
  .el-checkbox__label {
    font-size: 12px;
  }
  .el-transfer-panel .el-transfer-panel__header .el-checkbox .el-checkbox__label {
    font-size: 12px;
  }
  .el-transfer-panel__body,
  .el-transfer-panel__list {
    height: 360px;
  }
</style>
