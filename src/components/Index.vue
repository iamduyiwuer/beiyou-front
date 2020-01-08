<template>
  <div>
    <div id="haha"></div>
<!--    <div id="heatmap" style=" width:700px; height: 400px;">-->
    <div id="heatmap">
<!--      <img src="../assets/index.png" id="bg" style="width:100%; height: 100%">-->
      <img src="../assets/index.png" id="bg">
<!--      <svg width="100%" height="100%" version="1.1"-->
<!--           xmlns="http://www.w3.org/2000/svg">-->

<!--        &lt;!&ndash; circle是圆形标签 &ndash;&gt;-->
<!--        <circle cx="70" cy="50" r="40" stroke="black"-->
<!--                stroke-width="2" fill="red"/>-->
<!--        &lt;!&ndash; rect是长方形标签 &ndash;&gt;-->
<!--        <rect x='120' width="100" height="100"-->
<!--              style="fill:rgb(0,0,255);stroke-width:1;-->
<!--stroke:rgb(0,0,0)"/>-->
<!--      </svg>-->
      <span class="test3">绝对定位</span>
    </div>
  </div>
</template>
<script>
import Heatmap from 'heatmap.js'

export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    this.pic()
  },
  methods: {
    pic () {
      // 创建一个heatmap实例对象
      // 这里直接指定热点图渲染的div了.heatmap支持自定义的样式方案,网页外包接活具体可看官网api
      var heatmapInstance = Heatmap.create({
        container: document.getElementById('heatmap')
      })
      // 构建一些随机数据点,网页切图价格这里替换成你的业务数据
      var points = [
        { x: 700, y: 70, value: 33 },
        { x: 700, y: 90, value: 33 }
      ]
      // var max = 0
      // var width = 600
      // var height = 400
      // var len = 50
      // while (len--) {
      //   var val = Math.floor(Math.random() * 100)
      //   max = Math.max(max, val)
      //   var point = {
      //     x: Math.floor(Math.random() * width),
      //     y: Math.floor(Math.random() * height),
      //     value: val
      //   }
      //   points.push(point)
      // }
      console.log(points)
      var data = {
        max: 2,
        data: points
      }
      // 因为data是一组数据,web切图报价所以直接setData
      heatmapInstance.setData(data)
    }
  }
}
</script>
<style>
  #heatmap {
    width: 1300px;
    height: 600px;
  }
  /*#bg {*/
  /*  width:100%;*/
  /*  height: 100%;*/
  /*  background-size:cover;*/
  /*}*/
  #bg {
    /*width:1300px;*/
    width:1300px;
    height:620px;
    /*height:420px;*/
    float:right;
    padding-bottom: 0;
    background-color:green;
    position:relative;
  }
  .test3 {
    position:absolute;
    left:500px;
    top:50px;
    color:#FFF;
  }

</style>
