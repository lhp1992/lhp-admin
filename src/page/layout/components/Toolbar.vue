<template>
  <div class="navbar-toolbar">
    <div class="navbar-toolbar-item" title="我的消息">
      <i class="navbar-icon el-icon-message-solid"></i>
    </div>
    <div class="navbar-toolbar-item" title="我的消息">
      <i class="navbar-icon el-icon-message-solid"></i>
    </div>
    <div class="navbar-toolbar-item" title="我的消息">
      <i class="navbar-icon el-icon-message-solid"></i>
    </div>
    <div class="navbar-toolbar-item" title="我的消息">
      <i class="navbar-icon el-icon-message-solid"></i>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .navbar-icon{
    font-size: 18px;
  }
  .navbar-toolbar{
    float: left;
    .navbar-toolbar-item {
      float: left;
      position: relative;
      width: 18px;
      height: 55px;
      line-height: 55px;
      margin: 0 10px;
      opacity: .8;
      filter: Alpha(opacity=80);
      cursor: pointer;
      transition: .15s linear;
      &:hover {
        opacity: 1;
        filter: Alpha(opacity=100);
      }
    }
  }
</style>