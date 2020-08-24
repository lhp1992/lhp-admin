<template>
  <div class="masonry-item-bar clearfix" :style="'border-top-color: '+ color">
    <div class="masonry-item-header">
      <template v-if="isIndex">
        <span class="masonry-item-letter" :style="'color: '+ color">{{ value.letter }}</span>
      </template>

      <template v-else>
        <span class="masonry-item-icon" :style="'color: '+ color"><i class="el-icon-delete-solid"></i></span>
        <span class="masonry-item-title">{{ value.typeName }}({{ value.wfbeans.length }})</span>
      </template>
    </div>
    <div class="center-item" v-for="item in value.wfbeans" :key="item.id">
      <div class="font-item">
        <slot :data="item">{{ item.name }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default() {
        return {}
      }
    },
    isIndex: Boolean,
    color: String
  }
};
</script>

<style lang="scss" scoped>
  .masonry-item-bar {
    height: 100%;
    background-color: #f5f5f5;
    border: 1px solid #f5f5f5;
    border-top: 4px solid red;
    transition: all .3s;
    &.active,
    &:hover {
      background-color: #fff;
      @include box-shadow;
      // box-shadow: 0 1px 6px hsla(0,0%,39%,.2);
    }
    &.masonry-item-vertical .center-item {
      width: 310px;
      float: left;
    }
  }
  .masonry-item-header {
    padding: 15px 0px 15px;
    text-align: center;
    &>span {
      display: inline-block;
      vertical-align: top;
    }
  }
  .masonry-item-icon {
    font-size: 26px;
    margin-right: 10px;
  }
  .masonry-item-title {
    height: 36px;
    line-height: 36px;
    font-size: 16px;
  }
  .masonry-item-letter {
    font-size: 26px;
  }
  .center-item {
    height: 30px;
    line-height: 30px;
    padding-left: 0;
    position: relative;
    margin-bottom: 5px;
    &:hover {
      background: #f5f5f5;
    }
  }
  .font-item {
    width: 100%;
    float: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 20px;
  }
</style>
