<template>
  <div class="main-box">
    <el-row :gutter="20">
      <el-col :span="8"><div id="air_temperature" :style="{width: '300px', height: '300px'}"></div></el-col>
      <el-col :span="8"><div id="air_humidity" :style="{width: '300px', height: '300px'}"></div></el-col>
      <el-col :span="8"><div id="ground_temperature" :style="{width: '300px', height: '300px'}"></div></el-col>
      <el-col :span="8"><div id="ground_humidity" :style="{width: '300px', height: '300px'}"></div></el-col>
      <el-col :span="8"><div id="co2" :style="{width: '300px', height: '300px'}"></div></el-col>
      <el-col :span="8"><div id="o2" :style="{width: '300px', height: '300px'}"></div></el-col>
      <el-col :span="8"><div id="light" :style="{width: '300px', height: '300px'}"></div></el-col>
    </el-row>
<!--    <div id="air_temperature" :style="{width: '300px', height: '300px'}"></div>-->
<!--    <div id="air_humidity" :style="{width: '300px', height: '300px'}"></div>-->
<!--    <div id="ground_temperature" :style="{width: '300px', height: '300px'}"></div>-->
<!--    <div id="ground_humidity" :style="{width: '300px', height: '300px'}"></div>-->
<!--    <div id="co2" :style="{width: '300px', height: '300px'}"></div>-->
<!--    <div id="o2" :style="{width: '300px', height: '300px'}"></div>-->
<!--    <div id="light" :style="{width: '300px', height: '300px'}"></div>-->
  </div>

</template>
<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入仪表盘组件
require('echarts/lib/chart/gauge')

require('echarts/lib/component/tooltip')
require('echarts/lib/component/toolbox')
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    this.airTemperature()
    this.airHumidity()
    this.groundTemperature()
    this.groundHumidity()
    this.co2()
    this.o2()
    this.light()
  },
  methods: {
    airTemperature () {
      // 基于准备好的dom，初始化echarts实例
      let airTemperature = echarts.init(document.getElementById('air_temperature'))
      // 绘制图表
      airTemperature.setOption({
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: '空气温度',
            type: 'gauge',
            min: -20,
            max: 60,
            detail: { formatter: '{value}' },
            data: [{ value: 28, name: '空气温度  ℃' }]
          }
        ]
      })
    },
    airHumidity () {
      // 基于准备好的dom，初始化echarts实例
      let airTemperature = echarts.init(document.getElementById('air_humidity'))
      // 绘制图表
      airTemperature.setOption({
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: '空气湿度',
            type: 'gauge',
            // radius: '80%', // 参数:number, string。 仪表盘半径,默认 75% ，可以是相对于容器高宽中较小的一项的一半的百分比，也可以是绝对的数值。
            // center: ['50%', '55%'],
            detail: { formatter: '{value}%' },
            data: [{ value: 50, name: '空气湿度' }]
          }
        ]
      })
    },
    groundTemperature () {
      // 基于准备好的dom，初始化echarts实例
      let airTemperature = echarts.init(document.getElementById('ground_temperature'))
      // 绘制图表
      airTemperature.setOption({
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: '土壤温度',
            type: 'gauge',
            min: -20,
            max: 60,
            detail: { formatter: '{value}' },
            data: [{ value: 50, name: '土壤温度  ℃' }]
          }
        ]
      })
    },
    groundHumidity () {
      // 基于准备好的dom，初始化echarts实例
      let airTemperature = echarts.init(document.getElementById('ground_humidity'))
      // 绘制图表
      airTemperature.setOption({
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: '土壤湿度',
            type: 'gauge',
            detail: { formatter: '{value}%' },
            data: [{ value: 50, name: '土壤湿度' }]
          }
        ]
      })
    },
    co2 () {
      // 基于准备好的dom，初始化echarts实例
      let airTemperature = echarts.init(document.getElementById('co2'))
      // 绘制图表
      airTemperature.setOption({
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: '二氧化碳浓度',
            type: 'gauge',
            detail: { formatter: '{value}' },
            data: [{ value: 50, name: 'CO2' }]
          }
        ]
      })
    },
    o2 () {
      // 基于准备好的dom，初始化echarts实例
      let airTemperature = echarts.init(document.getElementById('o2'))
      // 绘制图表
      airTemperature.setOption({
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: '氧气浓度',
            type: 'gauge',
            detail: { formatter: '{value}' },
            data: [{ value: 50, name: 'O2' }]
          }
        ]
      })
    },
    light () {
      // 基于准备好的dom，初始化echarts实例
      let airTemperature = echarts.init(document.getElementById('light'))
      // 绘制图表
      airTemperature.setOption({
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: '光照度',
            type: 'gauge',
            detail: { formatter: '{value}' },
            data: [{ value: 50, name: '光照度' }]
          }
        ]
      })
    }
  }
}
</script>
<style>

</style>
