<template>
  <div ref="echarts" style="height: 100%;"></div>
</template>

<script>
export default {
  props: {
    nodes: {
      type: Array,
      default() {
        return []
      }
    },
    links: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      styleMapping: {
        normal: {
          color:"#bff3c3",
          borderColor: "#5abd6b"
        },
        before: {
          color:"#a9e3ff",
          borderColor: "#49a8d4"
        },
        active: {
          color:"#ffe8cc",
          borderColor: "#f5b87b"
        },
        error: {
          color:"#a9e2ff",
          borderColor: "#dc4446"
        }
      },
      linkColorMapping: {
        normal: '#979797',
        before: '#dc4446'
      }
    }
  },
  mounted() {
    var option = {
      animationDurationUpdate: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: {
        type: 'graph',
        layout: 'none',
        symbolSize: [100, 100],
        // symbol: "diamond", 
        roam: true,
        label: {
          show: true,
          color: '#142F54',
          fontSize: 12
        },
        itemStyle: {
          normal: {
            ...this.styleMapping.normal,
            // color: "#F2F2F2",
            // borderColor: "#707070",
            borderWidth: 1,
            shadowColor: "rgba(225,225,225,0.4)",
            shadowBlur: 10,
            shadowOffsetX: 10,
            shadowOffsetY: 10
          }
        },
        lineStyle: {
          normal: {
            width: 2,
            shadowColor: "none",
            color: this.linkColorMapping.normal,
            curveness: 0.1
          }
        },
        focusNodeAdjacency: true,
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          fontSize: 12,
          color: '#142F54'
        },
        data: this.nodes.map(e => {
          let style = this.styleMapping[e.type]
          if (style) e.itemStyle = style
          return e
        }),
        links: this.links.map(e => {
          let color = this.linkColorMapping[e.type]
          if (color) {
            if (!e.lineStyle) e.lineStyle = {}
            e.lineStyle.color = color
          }
          return e
        }),
        lineStyle: {
          opacity: 0.9,
          width: 2,
          curveness: 0
        }
      }
    };

    var myChart = echarts.init(this.$refs.echarts)
    myChart.setOption(option);
    // myChart.on('click', {dataType: 'node'}, (node) => {
    //   this.$emit('onClick', this.dataObj[node.data.tid])
    // });

    this.myChart = myChart
  }
};
</script>
