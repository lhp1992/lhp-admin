<template>
  <div class="modal">
    <div class="modal-mask" @click="$emit('close')"></div>
    <slot></slot>
  </div>
</template>

<style>
  .ant-modal {
    position: relative;
    width: auto;
    margin: 0 auto;
    top: 150px;
  }
  .ant-modal-content {
    /* transform: translate(10px, 10px); */
    position: relative;
    background-color: #fff;
    border: 0;
    border-radius: 6px;
    background-clip: padding-box;
    display: flex;
    flex-direction: column;
  }
  .ant-modal-close, .ant-modal-scale {
    cursor: pointer;
    border: 0;
    background: transparent;
    position: absolute;
    right: 18px;
    top: 16px;
    z-index: 10;
    font-weight: 700;
    line-height: 1;
    text-decoration: none;
    -webkit-transition: color .3s ease;
    -o-transition: color .3s ease;
    transition: color .3s ease;
    color: #999;
    outline: 0;
  }
  .ant-modal-close-x, .ant-modal-scale-x {
    display: block;
    font-style: normal;
    vertical-align: baseline;
    text-align: center;
    text-transform: none;
    text-rendering: auto;
    width: 14px;
    height: 14px;
    font-size: 14px;
    line-height: 1;
  }
  .ant-modal-close:focus, .ant-modal-close:hover, .ant-modal-scale:focus, .ant-modal-scale:hover {
    color: #444;
    text-decoration: none;
  }
  .ant-modal-header {
    background-color: #f9f9f9;
    padding: 0;
    border-radius: 6px 6px 0 0;
    background: #fff;
    color: #666;
    border-bottom: 1px solid #e9e9e9;
  }
  .ant-modal-title {
    border-bottom: 1px solid #ebebeb;
    height: 40px;
    line-height: 40px;
    background-image: url(../assets/grid-page-item-header-icon.png);
    background-repeat: no-repeat;
    background-position: 0% 50%;
    padding-left: 40px;
    padding-right: 10px;
  }
  .ant-modal-content {
    height: 100%;
  }
  .ant-modal-body{
    height: calc(100% - 40px);
    background-color: #fff;
    flex: 1;
  }
  .ant-modal-footer {
    background-color: #f9f9f9;
    padding: 0;
    border-radius: 0 0 6px 6px;
    background: #fff;
    color: #666;
    border-top: 1px solid #e9e9e9;
  }
</style>

<style lang="scss" scoped>
  .modal {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    .modal-mask {
      position: absolute;
      background-color: rgba(0, 0, 0, 0.25);
      width: 100%;
      height: 200%;
      top: -50%;
      cursor: pointer;
    }
  }
</style>