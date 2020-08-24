<template>
  <div class="header-box">
    <div class="wea-new-top-req-main">
      <div class="wea-new-top-req-icon">
        <div class="icon-circle-base" style="background: rgb(0, 121, 222);">
          <i class="el-icon-s-claim"></i>
        </div>
      </div>

      <div class="wea-new-top-req-title-text">
        <div>
          流程:处理 - {{ title }} -  
          <tagsbar />
        </div>
      </div>

      <div class="contract-layout-tabs">
        <lhp-tabs :data="tabsParent.tabs" v-model="tabsParent.activeIndex">
          <template slot="tabs-right">
            <headerbtngroup/>
          </template>
        </lhp-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Tagsbar from './Tagsbar'
import HeaderBtnGroup from './HeaderBtnGroup'
export default {
  props: {
    title: String
  },
  components: {
    'tagsbar': Tagsbar,
    'headerbtngroup': HeaderBtnGroup
  },
  inject: ['top', 'tabsParent'],
  filters: {
    getLabel(list) {
      return list.map(e => e.label)
    }
  },
  methods: {
  }
};
</script>

<style lang="scss">
  .contract-layout-tabs {
    height: 39px;
    margin-top: -2px;
    margin-left: -4px;
    .el-tabs__nav-wrap::after {
      background-color: transparent;
    }
  }
</style>
<style lang="scss" scoped>
  .header-box {
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #eaeaea;
  }
  .wea-new-top-req-main {
    padding: 6px 0 0 80px;
    position: relative;
    height: 70px;
    padding-left: 65px;
    padding-top: 13px;
    background: #fff;
    .wea-new-top-req-icon {
      position: absolute;
      width: 40px;
      left: 24px;
      top: 15px;
      .icon-circle-base {
        display: inline-block;
        vertical-align: middle;
        text-align: center;
        border-radius: 50%;
        color: #fff;
        margin: 0;
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 22px;
      }
    }
    .wea-new-top-req-title-text {
      padding-left: 8px;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      line-height: 20px;
      height: 20px;
      color: #333;
      font-size: 14px;
    }
  }
</style>