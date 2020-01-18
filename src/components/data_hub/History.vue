<template>
  <div class="main-box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据中心</el-breadcrumb-item>
      <el-breadcrumb-item>历史数据</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <div class="block" style="margin: 0px 0px 10px 20px">
        <span class="demonstration">默认</span>
        <el-date-picker
          clearable
          v-model="dashboardTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间" value-format="timestamp" @change="tst">
        </el-date-picker>
      </div>
      <div id="myChartq" :style="{width: '100%', height: '500px'}"></div>
    </el-card>
  </div>
</template>
<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
export default {
  data () {
    return {
      dashboardTime: [],
      x_coordinate: [],
      series: [],
      legend: []
    }
  },
  mounted () {
    // this.getHistroy()
    // this.drawLine()
  },
  methods: {
    tst () {
      console.log(11)
      console.log(this.dashboardTime[0])
      console.log(this.dashboardTime[1])
      this.getHistory()
    },
    async getHistory () {
      this.x_coordinate = []
      this.series = []
      this.legend = []

      const { data: res } = await this.$http.post('data/history', {
        'fields': ['co2', 'o2', 'air_temperature', 'air_humidity', 'ground_humidity', 'illumination'],
        'start_time': this.dashboardTime[0],
        'end_time': this.dashboardTime[1],
        'period': '1m',
        'group_func': 'MAX'
      })
      if (res.meta.status !== 200) return this.$message.error('获取历史数据失败')

      // 获取legend字段： 折线的名称
      // this.legend = res.data.Results[0].Series[0].columns.slice(1)
      var tmpLegend = res.data.Results[0].Series[0].columns.slice(1)
      for (var n = 0; n < tmpLegend.length; n++) {
        this.legend.push(this.getLegend(tmpLegend[n]))
      }

      // 初始化series数组，设置name type和data
      for (var m = 0; m < this.legend.length; m++) {
        this.series.push({
          name: this.legend[m],
          type: 'line',
          data: []
        })
      }

      // 处理后端返回的数据 values数据格式如： [1578621480000, 50, 50, 23, 5, 23, 4]
      var values = res.data.Results[0].Series[0].values
      for (var i = 0; i < values.length; i++) {
        // 把时间戳取出 放到X轴坐标数组中
        // this.x_coordinate.push(values[i][0])
        this.x_coordinate.push(this.formatDate(values[i][0]))

        // 索引为0是时间戳，不要时间戳，从索引为1的位置开始取值
        for (var k = 0; k < this.legend.length; k++) {
          this.series[k].data.push(values[i][k + 1])
        }
      }

      // 画折线图
      this.drawLine()
    },
    getLegend (key) {
      switch (key) {
        case 'co2':
          return '二氧化碳'
        case 'o2':
          return '氧气'
        case 'air_temperature':
          return '空气温度'
        case 'air_humidity':
          return '空气湿度'
        case 'ground_humidity':
          return '土壤湿度'
        case 'illumination':
          return '光照度'
      }
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChartq'))
      // 绘制图表
      myChart.clear()
      myChart.setOption({
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.legend
          // data: ['co2', 'o2', 'air_temperature', 'air_humidity', 'ground_humidity', 'illumination']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.x_coordinate,
          // axisLabel: {
          //   interval: 10,
          //   rotate: 40
          // }
          axisLine: { // ---坐标轴 轴线
            show: true, // ---是否显示

            // ------------------- 箭头 -------------------------
            symbol: ['none', 'arrow'], // ---是否显示轴线箭头
            symbolSize: [8, 8], // ---箭头大小
            symbolOffset: [0, 7], // ---箭头位置

            // ------------------- 线 -------------------------
            lineStyle: {
              // color: '#fff',
              width: 1,
              type: 'solid'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: { // ---坐标轴 轴线
            show: true, // ---是否显示

            // ------------------- 箭头 -------------------------
            symbol: ['none', 'arrow'], // ---是否显示轴线箭头
            symbolSize: [8, 8], // ---箭头大小
            symbolOffset: [0, 7], // ---箭头位置

            // ------------------- 线 -------------------------
            lineStyle: {
              // color: '#fff',
              width: 1,
              type: 'solid'
            }
          }
        },
        series: this.series
      })
    },
    formatDate (timestampInt) {
      var date = new Date(timestampInt)
      var YY = date.getFullYear() + '-'
      var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
      var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
      // var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      return YY + MM + DD + ' ' + hh + mm
    }

  }
}
</script>
<style lang="less" scoped>

</style>
