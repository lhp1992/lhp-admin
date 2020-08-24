<template>
  <span class="wf_attention_span_typeset" style="display:inline-block;">
    <i class="el-icon-price-tag" style="cursor: pointer;"></i>
    <span style="display:inline-block;">
      <div class="wf_attention_div_btn" style="display:inline-block;background-color:#580864;color:#ffffff;"> 重复</div>
    </span>
  </span>
</template>

<script>
export default {
  methods: {
  }
};
</script>

<style lang="scss" scoped>
  .wf_attention_span_typeset {
    display: inline-block;
    margin-left: 10px;
    margin-right: 10px;
    padding-top: 0;
    height: 20px;
    line-height: 20px;
    &>span {
      position: absolute;
    }
  }
  .wf_attention_div_btn {
    display: inline-block;
    padding: 0 15px;
    margin-left: 5px;
    margin-top: 0;
    border-radius: 15px;
    cursor: pointer;
    color: #fff;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    overflow: hidden;
  }
</style>