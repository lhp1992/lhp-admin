<template>
  <div class="grid-page-item-box">
    <div class="grid-page-item-header">
      <slot name="title"></slot>
      <div class="grid-page-item-header-right">
        <slot name="header-right"></slot>
      </div>
    </div>
    <div class="grid-page-item-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
  .grid-page-item-box{
    height: 100%;
    .grid-page-item-header{
      border-bottom: 1px solid $borderSolidColor;
      height: 40px;
      line-height: 40px;
      background-image: url(../assets/grid-page-item-header-icon.png);
      background-repeat: no-repeat;
      background-position: 0% 50%;
      padding-left: 40px;
      padding-right: 10px;
      color: $textColorDark;
      .grid-page-item-header-right{
        float: right;
      }
    }
    .grid-page-item-content{
      height: calc(100% - 40px);
      overflow: auto;
      padding: 5px;
    }
  }
</style>