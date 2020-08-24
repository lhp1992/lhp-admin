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
    }
  },
  created() {
  }
};
</script>