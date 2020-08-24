<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view class="app-content" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
      cachedViews: ['Dbsy']
    }
  },
  // computed: {
  //   cachedViews() {
  //     // return this.$store.state.tagsView.cachedViews
  //   },
  //   key() {
  //     // return this.$route.path
  //   }
  // }
};
</script>

<style lang="scss" scoped>
.app-main {
  height: 100%;
  width: 100%;
  position: relative;
  padding: 10px;
}
.app-content{
  min-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: $appContentBgColor;
}
</style>