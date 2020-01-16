<template>
  <div id="testh" :style="{width: '200px', height: '300px'}"></div>
</template>

<script>
// 引入基本模板
import echarts from 'echarts'
// 引入柱状图组件
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
export default {
  data () {
    return {
      x_coordinate: [],
      series: [],
      legend: []
    }
  },
  created () {
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('testh'))
      // 绘制图表
      myChart.clear()
      myChart.setOption({
        title: {
          text: 'Step Line'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          type: 'scroll',
          // y:bottom,
          bottom: 10,
          data: (function () {
            var list = []
            for (var i = 1; i <= 10; i++) {
              list.push(i + 2000 + '')
            }
            return list
          })()
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '7%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '2001',
            type: 'line',
            step: 'start',
            data: [101, 101, 101, 101, 101, 101, 101]
          },
          {
            name: '2002',
            type: 'line',
            step: 'middle',
            data: [112, 112, 112, 112, 112, 112, 112]
          },
          {
            name: '2003',
            type: 'line',
            step: 'end',
            data: [123, 123, 123, 123, 123, 123, 123]
          },
          {
            name: '2004',
            type: 'line',
            step: 'start',
            data: [134, 134, 134, 134, 134, 134, 134]
          },
          {
            name: '2005',
            type: 'line',
            step: 'start',
            data: [145, 145, 145, 145, 145, 145, 145]
          },
          {
            name: '2006',
            type: 'line',
            step: 'start',
            data: [156, 156, 156, 156, 156, 156, 156]
          },
          {
            name: '2007',
            type: 'line',
            step: 'start',
            data: [167, 167, 167, 167, 167, 167, 167]
          }

        ]
      })
    }
  }
}
</script>

<style scoped>

</style>
