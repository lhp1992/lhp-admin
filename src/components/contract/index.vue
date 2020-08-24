<template>
  <div class="contract-layout">
    <headerbar :title="title"/>
    <div class="contract-layout-content">
      <div class="contract-wrapper">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Headerbar from './components/Headerbar'
import getTop from './top/index.js'

export default {
  props: {
    title: String,
    tabsActiveIndex: {
      type: Number,
      default: 0
    }
  },
  components: {
    'headerbar': Headerbar
  },
  provide() {
    return {
      top: this.top,
      tabsParent: this.tabsParent
    }
  },
  data() {
    let $top = getTop()
    return {
      top: $top,
      tabsParent: {
        setPage(name, label) {
          if (this.activeName === undefined) this.activeName = name
          this.tabs.push({
            name,
            label
          })
        },
        tabs: [],
        activeName: this.tabsActiveName,
        activeIndex: this.tabsActiveIndex
      }
    }
  },
  watch: {
    'tabsParent.activeIndex'(index) {
      this.tabsParent.activeName = this.tabsParent.tabs[index].name
    }
  },
  created() {
    this.top.onLoad(this.$route.query.id)
  }
};
</script>

<style lang="scss" scoped>
  .contract-layout {
    height: 100%;
    @include flex(1);
  }
  .contract-layout-content {
    background-color: $bgColorGrayLight;
    overflow-y: auto;
    position: relative;
  }
  .contract-wrapper {
    width: 1240px;
    height: 100%;
    padding: 20px;
    margin: 0 auto;
  }
</style>