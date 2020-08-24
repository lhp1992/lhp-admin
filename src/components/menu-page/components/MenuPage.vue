<template>
  <div class="menu-page-box" ref="box">
    <div class="anchor-list" v-if="!unAnchor && isIndex">
      <button v-for="item in anchorList" @click="to(item)" :disabled="ifDisabled(item)" :class="{ 'active': activeLetter === 'item' }">{{ item }}</button>
    </div>

    <div class="masonry-box" ref="masonry">
      <el-col 
        v-for="(item, i) in value" 
        :key="i" 
        :sm="mode === 'horizontal' ? 8 : undefined" 
        :lg="mode === 'horizontal' ? 6 : undefined" 
        ref="masonryItem"
      >
        <menu-page-item 
          :class="'masonry-item-' + mode + (activeIndex === i ? ' active' : '')" 
          :value="item" 
          :isIndex="isIndex" 
          :color="colors[i % colorsLength]"
        >
          <!-- <template slot="title" slot-scope="{ data, color }">
            <slot name="title"></slot>
          </template> -->

          <template slot-scope="{ data }">
            <slot :data="data"></slot>
          </template>
        </menu-page-item>
      </el-col>
    </div>

  </div>
</template>

<script>
import MenuPageItem from './MenuPageItem'
export default {
  props: {
    mode: {
      type: String,
      default: 'horizontal'
    },
    value: {
      type: Array,
      default() {
        return []
      }
    },
    isIndex: Boolean,
    anchorList: {
      type: [Array, String],
      default() {
        return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      }
    },
    unAnchor: Boolean
  },
  components: {
    'menu-page-item': MenuPageItem
  },
  data() {
    return {
      activeLetter: undefined,
      activeIndex: undefined,
      colors: ['#55d2d4', '#37b2ff', '#ffc62e', '#b37bfa', '#ff9537', '#ff5e56']
    }
  },
  computed: {
    colorsLength() {
      return this.colors.length
    }
  },
  methods: {
    ifDisabled(letter) {
      return !this.value.some(item => item.letter == letter)
    },
    to(letter) {
      let index = this.value.findIndex(item => item.letter == letter)
      if (index === -1) return
      let offsetTop = this.$refs.masonryItem[index].$el.offsetTop
      this.$refs.box.scrollTop = offsetTop
      this.activeIndex = index
      this.activeLetter = letter
    }
  },
  mounted() {
    if (this.mode === 'horizontal') {
      var elem = this.$refs.masonry;
      this.msnry = new Masonry( elem, {
        // options
        // itemSelector: '.el-col',
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .anchor-list button{
    border-radius: 1px;
    margin-right: 2px;
    padding: 0;
    width: 30px;
    height: 30px;
    border: none;
    background: #f5f5f5;
    font-size: 16px;
    margin-bottom: 15px;
    cursor: pointer;
    &[disabled] {
      cursor: not-allowed;
    }
    &:focus, 
    &:not([disabled]):hover,
    &.active {
      outline: 0;
      color: #fff;
      background-color: #108ee9;
      border-color: #108ee9;
    }
    &:not([disabled]):active {
      outline: 0;
      transition: none;
    }
  }

  .menu-page-box {
    height: 100%; 
    overflow-y: auto; 
    overflow-x: hidden;
    position: relative;
    padding: 0 10px;
  }
  .masonry-box {
    margin-left: -5px;
    margin-right: -5px;
  }
  .el-col {
    padding: 0 5px 10px;
  }
</style>
