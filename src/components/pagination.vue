<template>
  <ul class="ant-pagination">
    <li class="ant-pagination-group">
      <div title="上一页" class="ant-pagination-item ant-pagination-text ant-pagination-group-item" @click="go(pageNumber - 1)">上一页</div
      ><div title="下一页" class="ant-pagination-item ant-pagination-text ant-pagination-group-item" @click="go(pageNumber + 1)">下一页</div>
    </li>
    <li class="ant-pagination-options"><div class="ant-pagination-options-quick-jumper">当前第 <strong>{{ pageNumber }}</strong> 页</div></li>
    <li class="ant-pagination-group">
      <input class="ant-pagination-group-item" type="number" min="1" v-model="iptValue"><div title="跳转" class="ant-pagination-item ant-pagination-text ant-pagination-group-item" @click="go(iptValue)">跳转</div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }, 
    immediate: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      pageNumber: 1,
      iptValue: 1
    };
  },
  created() {
    this.pageNumber = this.value || 1
    this.immediate && this.go(this.pageNumber)
  },
  watch: {
    value(val) {
      this.pageNumber = val
    },
    pageNumber(val) {
      this.$emit('input', val)
      this.iptValue = val
    }
  },
  methods: {
    reset() {
      this.pageNumber = 1
      this.go(this.pageNumber)
    },
    go(_number) {
      let number = parseInt(_number)
      if (number < 1) return
      this.$emit('onQuery', number, () => {
        this.pageNumber = number
      })
    }
  }
};
</script>

<style lang="scss" scoped>
  .ant-pagination {
    text-align: center;
    color: rgba(0,0,0,.65);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    font-feature-settings: "tnum";
    & li{
      display: inline-block;
      vertical-align: middle;
    }
    &-item {
      position: relative;
      min-width: 32px;
      text-align: center;
      list-style: none;
      background-color: #fff;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      outline: 0;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      display: inline-block;
      height: 32px;
      margin-right: 8px;
      line-height: 30px;
      vertical-align: middle;
      &:last-child {
        margin-right: 0px;
      }
      &:focus, &:hover {
        border-color: #1890ff;
        transition: all .3s;
        color: #1890ff;
      }
    }
    &-text {
      padding: 0 12px;
    }
    &-group{
      &>input {
        position: relative;
        display: inline-block;
        width: 100%;
        height: 32px;
        padding: 4px 11px;
        color: rgba(0,0,0,.65);
        font-size: 14px;
        line-height: 1.5;
        background-color: #fff;
        background-image: none;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        transition: all .3s;
        width: 70px;
        vertical-align: middle;
      }
      &-item {
        margin-right: -1px;
        &:not(:first-child):not(:last-child) {
          border-radius: 0;
        }
        &:last-child {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
        &:first-child {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
        &:focus, &:hover {
          z-index: 1;
        }
      }
    }
    &-options {
      display: inline-block;
      margin: 0 16px;
      vertical-align: middle;
      &-quick-jumper {
        display: inline-block;
        height: 32px;
        line-height: 32px;
        vertical-align: top;
      }
    }
  }
</style>
