<template>
  <div class="t-c-p-box">
    <div class="t-c-p-header">
      <div class="t-c-p-header-icon">
        <slot name="header-icon">
          <i :class="icon"></i>
        </slot>
      </div>
      <span class="t-c-p-header-title">
        <slot name="title">
          {{ title }}
        </slot>
      </span>
      <div class="t-c-p-header-right">
        <slot name="header-right"></slot>
      </div>
    </div>
    <div class="t-c-p-content">
      <slot></slot>
    </div>
    <slot name="footer" class="t-c-p-footer"></slot>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'el-icon-s-home'
    }, 
    title: String
  }
};
</script>

<style lang="scss" scoped>
  .t-c-p-header {
    @include clearfix;
    height: 51px;
    background-color: $bgColorGrayLight;
    border-bottom: 1px solid $borderSolidColor;
    line-height: 50px;
    position: relative;
    padding: 0 15px;
    font-size: 14px;
  }
  .t-c-p-footer {
    height: 51px;
    background-color: $bgColorGrayLight;
    border-top: 1px solid $borderSolidColor;
    line-height: 50px;
  }
  .t-c-p-header-title {
    vertical-align: middle;
  }
  .t-c-p-header-icon {
    display: inline-block;
    vertical-align: middle;
    width: 35px;
    height: 35px;
    font-size: 22px;
    line-height: 35px;
    text-align: center;
    border-radius: 50%;
    margin-right: 10px;
    color: $titleIconColor;
    background: $titleIconBgColor;
  }
  .t-c-p-header-right {
    float: right;
  }
  .t-c-p-content {
    height: calc(100% - 51px);
  }
</style>