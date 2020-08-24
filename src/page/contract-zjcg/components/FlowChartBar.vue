<template>
  <div style="height: 100%; display: flex; align-items: center; justify-content: center;">
    <chart-tree-flow style="width: 1000px;height: 500px" :nodes="nodes" :links="links"></chart-tree-flow>
  </div>
</template>


<script>
import ChartTreeFlow from '@/components/chart-tree-flow'
export default {
  components: {
    'chart-tree-flow': ChartTreeFlow
  },
  data() {
    return {
      nodes: [
        {
          name: '申请人',
          user: '张晨程',
          type: 'before',
          x: 0,
          y: 0,
        }, {
          name: '部门负责人',
          user: '邓登举',
          symbol: "diamond",
          type: 'before',
          x: 100,
          y: 0,
        }, {
          name: '采购经理',
          user: '邓登举',
          symbol: "diamond",
          type: 'before',
          x: 200,
          y: 0,
        }, {
          name: '主管领导',
          user: '邓登举',
          symbol: "diamond",
          type: 'before',
          x: 300,
          y: 0,
        }, {
          name: '财务经理',
          user: '塘文苑',
          symbol: "diamond",
          type: 'active',
          x: 300,
          y: 100
        }, {
          name: '归档',
          user: '归档',
          x: 200,
          y: 100
        }
      ],
      links: [
        {
          source: "申请人",
          target: "部门负责人", 
          type: "before"
        }, {
          source: "部门负责人",
          target: "申请人", 
          lineStyle: {
            curveness: -0.5
          }
        }, {
          source: "部门负责人",
          target: "采购经理", 
          type: "before"
        }, {
          source: "采购经理",
          target: "主管领导", 
          type: "before"
        }, {
          source: "主管领导",
          target: "财务经理", 
          type: "before"
        }, {
          source: "财务经理",
          target: "归档"
        }
      ]
      // nodes: [{"tid":1,"name":"节点1","x":0,"y":0},{"tid":2,"name":"节点2","x":0,"y":1,"itemStyle":{"normal":{"color":"#EE6F0B"}}},{"tid":5,"name":"节点5","x":0,"y":2},{"tid":6,"name":"节点6","x":-1,"y":2},{"tid":3,"name":"节点3","x":-1,"y":1},{"tid":4,"name":"节点4","x":1,"y":1},{"tid":7,"name":"节点7","x":1,"y":2}],
      // links: [{"source":"节点1","target":"节点2","lineStyle":{"curveness":0.2},"label":{"show":true,"formatter":"情况一时 -> 节点2"}},{"source":"节点2","target":"节点1","lineStyle":{"curveness":0.2}},{"source":"节点2","target":"节点5"},{"source":"节点2","target":"节点6"},{"source":"节点1","target":"节点3","label":{"show":true,"formatter":"情况一时 -> 节点3"}},{"source":"节点3","target":"节点5"},{"source":"节点1","target":"节点4","label":{"show":true,"formatter":"情况一时 -> 节点4"}},{"source":"节点4","target":"节点5"},{"source":"节点4","target":"节点7"},{"source":"节点1","target":"节点7"}]
    }
  },
  created() {
  }
};
</script>