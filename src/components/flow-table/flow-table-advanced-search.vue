<template>
  <div style="display: inline-block;">
    <el-button size="mini" plain class="flow-table-advanced-search" @click="visible = !visible">高级搜索</el-button>
    <transition name="zoom-in-top">
      <div class="advanced-search-box" v-show="visible">
        <div class="mask"></div>
        <div class="advanced-search-container" @click.stop>
          <div class="advanced-search-wrapper">
            <slot :form="form"></slot>
          </div>
          <div class="advanced-search-footer">
            <el-button size="small" type="primary" @click="submit">搜索</el-button>
            <el-button size="small" plain @click="form = {}">重置</el-button>
            <el-button size="small" plain @click="visible = false">取消</el-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  inject: ['top'],
  data() {
    return {
      visible: false,
      form: {}
    }
  },
  watch: {
    visible(newValue) {
      if (newValue) {
        document.addEventListener('click', this.hide, false)
      } else {
        document.removeEventListener('click', this.hide, false)
      }
    }
  },
  methods: {
    hide() {
      this.visible = false
    },
    submit() {
      this.visible = false
      this.top.search({
        ...this.form
      })
    }
  }
};
</script>

<style lang="scss" scoped>
  .flow-table-advanced-search {
    margin-left: -1px;
    position: relative;
    border-radius: 0;
    &:hover,
    &:focus {
      z-index: 2;
    }
  }


  .zoom-in-top-enter-active,
  .zoom-in-top-leave-active {
    transition: .3s;
    & .advanced-search-container {
      opacity: 1;
      transform: scaleY(1);
      transition: transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1);
      transform-origin: center top
    }
    & .mask {
      opacity: 1;
      transition: opacity .3s cubic-bezier(.23,1,.32,1);
    }
  }

  .zoom-in-top-enter,
  .zoom-in-top-leave-active {
    & .advanced-search-container {
      opacity: 0;
      transform: scaleY(0)
    }
    & .mask {
      opacity: 0;
    }
  }


  .advanced-search-box {
    position: absolute;
    width: 100%;
    height: calc(100% - 41px);
    right: 0;
    z-index: 9;
    top: 41px;
    .mask {
      position: absolute;
      background-color: rgba(0, 0, 0, 0.25);
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
  .advanced-search-container {
    background-color: #fff;
    position: relative;
    z-index: 1;
  }
  .advanced-search-wrapper {
    height: 300px;
    overflow-y: auto;
    padding: 0 25px;
  }
  .advanced-search-footer {
    border: 1px solid $borderSolidColor;
    padding: 12px 0;
    text-align: center;
  }
</style>

<style lang="scss">
  .advanced-search-wrapper {
    .el-form-item__label {
      text-align: left;
    }
    .el-form-item {
      margin-bottom: 5px;
    }
    .el-collapse-item__content{
      padding-left: 15px;
      padding-right: 15px;
      @include clearfix;
    }
  }
</style>
