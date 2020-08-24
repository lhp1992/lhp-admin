<template>
  <lhp-contract title="咨询服务合同">
    <lhp-tabs-pane label="流程表单">
      <form-bar></form-bar>
    </lhp-tabs-pane>
    <lhp-tabs-pane label="流程图">
      <flow-chart-bar/>
    </lhp-tabs-pane>
    <lhp-tabs-pane label="流程状态">
      
    </lhp-tabs-pane>
    <lhp-tabs-pane label="相关资源">
      
    </lhp-tabs-pane>
  </lhp-contract>
</template>

<script>
import FormBar from './components/FormBar'
import FlowChartBar from './components/FlowChartBar'

export default {
  components: {
    'form-bar': FormBar,
    'flow-chart-bar': FlowChartBar
  },
  // inject: ['top'],
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