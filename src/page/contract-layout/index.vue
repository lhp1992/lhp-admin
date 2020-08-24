<template>
  <div class="contract-layout">
    <headerbar/>
    <div class="contract-layout-content">
      <appmain/>
    </div>
  </div>
</template>

<script>
import Headerbar from './components/Headerbar'
import AppMain from './components/AppMain'
import $top from './top/index.js'

export default {
  components: {
    'headerbar': Headerbar,
    'appmain': AppMain
  },
  provide() {
    return {
      top: this.top
    }
  },
  data() {
    return {
      top: $top
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
</style>