<template>
  <div>
    <lhp-tabs :data="tabsData" labelKey="label2" nameKey="name2" v-model="activeIndex">
        <lhp-tabs-pane label="流程表单">
          流程表单
          <!-- <router-link v-for="item in $route.matched" :to="item.path">{{ item.name || 'aaaa' }}</router-link> -->
        </lhp-tabs-pane>
        <lhp-tabs-pane label="流程图">
          流程图
        </lhp-tabs-pane>
        <lhp-tabs-pane label="流程状态">
          流程状态
        </lhp-tabs-pane>
        <lhp-tabs-pane label="相关资源">
          相关资源
        </lhp-tabs-pane>
    </lhp-tabs>
  </div>
</template>

<script>

export default {
  components: {
  },
  provide() {
    return {
    }
  },
  data() {
    return {
      activeIndex: 1,
      tabsData: [
        {
          label2: '导航一',
          name2: 'tab1'
        }, {
          label2: '导航二',
          name2: 'tab2'
        }
      ]
    }
  },
  methods: {
    log(tab) {
      console.log(tab)
    }
  },
  created() {
    console.log(this.$route.matched)
  }
};
</script>

<style lang="scss" scoped>
  .map-btns {
    position: absolute;
    left: 10px;
    top: 10px;
  }
</style>
