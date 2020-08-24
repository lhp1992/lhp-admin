<template>
  <lhp-title-content-page icon="el-icon-s-claim" title="新建流程" style="height: 100%;">
    <template slot="header-right" v-if="currentComponent !== 'flow-add-common'">
      <span class="flow-add-right">
        <a :class="{ 'el-icon-sort-down': true, 'active': isIndex }" @click="isIndex = !isIndex"></a>
        <a :class="{ 'el-icon-menu': true, 'active': mode === 'vertical' }" @click="mode = mode === 'vertical' ? 'horizontal' : 'vertical'"></a>
      </span>
    </template>

    <lhp-tabs class="flow-add-tabs" border :data="list" v-model="currentIndex">
      <component v-bind:is="currentComponent" :mode="mode" :isIndex="isIndex" style="padding-top: 10px;"></component>
    </lhp-tabs>

  </lhp-title-content-page>
</template>

<script>
export default {
  components: {
    'flow-add-all': () => import('@/page/flow-add-all'),
    'flow-add-watch': () => import('@/page/flow-add-watch'),
    'flow-add-common': () => import('@/page/flow-add-common')
  },
  // filters: {
  //   filterName(list) {
  //     return list.map(item => item.name)
  //   }  
  // },
  data() {
    return {
      mode: 'horizontal', 
      isIndex: false,
      currentIndex: 0,
      list: [
        {
          label: '全部流程',
          name: 'flow-add-all'
        }, {
          label: '我的收藏',
          name: 'flow-add-watch'
        }, {
          label: '常用流程',
          name: 'flow-add-common'
        }
      ]
    }
  },
  computed: {
    currentComponent() {
      return this.list[this.currentIndex].name
    }
  }
  // methods: {
  //   onChange(tab, index) {
  //     this.currentComponent = this.list[index].component
  //   }
  // }
};
</script>
<style lang="scss">
  .flow-add-tabs .tabs-header{
    margin: 0 12px;
  }
</style>
<style lang="scss" scoped>
  .flow-add-right a {
    font-size: 18px;
    &.active {
      color: $hoverTextColor;
    }
  }
</style>
