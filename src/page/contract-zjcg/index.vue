<template>
  <keep-alive>
    <template v-if="top.tabsIndex == 0">
      <form-bar></form-bar>
    </template>
    <template v-else-if="top.tabsIndex == 1">
      <flow-chart-bar></flow-chart-bar>
    </template>
    <template v-else-if="top.tabsIndex == 2">
      
    </template>
    <template v-else-if="top.tabsIndex == 3">
      
    </template>
  </keep-alive>
</template>

<script>
import FormBar from './components/FormBar'
import FlowChartBar from './components/FlowChartBar'

export default {
  components: {
    'form-bar': FormBar,
    'flow-chart-bar': FlowChartBar
  },
  inject: ['top'],
  data() {
    return {
    }
  },
  created() {
  }
};
</script>

<style lang="scss">
</style>