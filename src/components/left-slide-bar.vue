<template>
  <div :class="{ 'left-slide-box': true, 'active': !isShow }">
    <div class="left-slide-content">
      <slot></slot>
    </div>
    <div class="left-slide-btn" @click="isShow = !isShow"></div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isShow: this.value
    }
  },
  watch: {
    isShow() {
      this.$emit('input', this.value)
    }
  }
};
</script>

<style lang="scss" scoped>
  .left-slide-box {
    height: 100%;
    position: relative;
  }
  .left-slide-content {
    height: 100%;
    overflow: hidden;
  }
  .left-slide-box.active {
    width: 0;
  }
  .left-slide-btn {
    width: 18px;
    height: 60px;
    position: absolute;
    top: 50%;
    right: 0;
    margin-top: -30px;
    margin-right: -18px;
    z-index: 11;
    cursor: pointer;
    background: url(../assets/leftTree-show.png) no-repeat -2px 0;
    &:hover {
      background: url(../assets/leftTree-show-hover.png) no-repeat -2px 0;
    }
  }
  .left-slide-box.active .left-slide-btn {
    background: url(../assets/leftTree-hide.png) no-repeat -2px 0;
    &:hover {
      background: url(../assets/leftTree-hide-hover.png) no-repeat -2px 0;
    }
  }
</style>