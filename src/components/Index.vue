<template>
  <div id="heatmap">
    <img src="../assets/index.png" id="img-bg" style="background-size: auto 100%">
    <!--      <el-image src="../assets/index.png" style="width: 1000px; height: 500px">asdf</el-image>-->

<!--    <span><span class="n1">35℃</span></span>-->
<!--    <span class="n2">45℃</span>-->
<!--    <span class="n3">45℃</span>-->
<!--    <span class="n4">45℃</span>-->
<!--    <span class="n5">45℃</span>-->
<!--    <span class="n6">45℃</span>-->
<!--    <span class="n7">45℃</span>-->
<!--    <span class="n8">45℃</span>-->
<!--    <span class="n9">45℃</span>-->
<!--    <span class="n10">45℃</span>-->
<!--    <span class="n11">45℃</span>-->
<!--    <span class="n12">45℃</span>-->
<!--    <span class="n13">45℃</span>-->

<!--    <span class="n14">45℃</span>-->
<!--    <span class="n15">45℃</span>-->
<!--    <span class="n16">45℃</span>-->
<!--    <span class="n17">45℃</span>-->
<!--    <span class="n18">45℃</span>-->
<!--    <span class="n19">45℃</span>-->
<!--    <span class="n20">45℃</span>-->
<!--    <span class="n21">45℃</span>-->

    <span :class="'n'+(i+1)" v-for="(t,i) in ts" :key="i">
      {{t}}℃
    </span>
  </div>
</template>
<script>

export default {
  data () {
    return {
      ts: [],
      timer: '',
      intervalTimer: 5000
    }
  },
  mounted () {
    this.startTimer()
  },
  methods: {
    // 开启定时器
    startTimer () {
      this.getRealtimeData() // 首先立即请求一次数据，再创建定时器
      this.timer = setInterval(this.getRealtimeData, this.intervalTimer)
    },
    async getRealtimeData () {
      const { data: res } = await this.$http.get('data/realtimeTemperature')
      if (res.meta.status !== 200) return this.$message.error('获取实时数据失败')
      this.ts = res.data
    }
  }
}
</script>
<style>
  #heatmap {
    /*width: 1336px;*/
    /*height: 645px;*/
    position: relative;
  }

  #img-bg {
    width: 1336px;
    height: 661px;
    /*width:100%;*/
    /*height:100%;*/
    float: right;
    padding-bottom: 0;
    /*background-color:green;*/
    /*position:relative;*/
  }

  .n1 {
    position: absolute;
    left: 650px;
    top: 68px;
    color: #FFF;
    transform: rotate(15deg);
  }

  .n2 {
    position: absolute;
    left: 640px;
    top: 85px;
    color: #FFF;
    transform: rotate(15deg);
  }

  .n3 {
    position: absolute;
    left: 620px;
    top: 100px;
    color: #FFF;
    transform: rotate(15deg);
  }

  .n4 {
    position: absolute;
    left: 580px;
    top: 118px;
    color: #FFF;
    transform: rotate(15deg);
  }

  .n5 {
    position: absolute;
    left: 560px;
    top: 133px;
    color: #FFF;
    transform: rotate(15deg);
  }

  .n6 {
    position: absolute;
    left: 540px;
    top: 150px;
    color: #FFF;
    transform: rotate(15deg);
  }

  .n7 {
    position: absolute;
    left: 500px;
    top: 163px;
    color: #FFF;
    transform: rotate(15deg);
  }

  .n8 {
    position: absolute;
    left: 470px;
    top: 181px;
    color: #FFF;
    transform: rotate(15deg);
  }

  .n9 {
    position: absolute;
    left: 440px;
    top: 204px;
    color: #FFF;
    transform: rotate(15deg);
  }

  .n10 {
    position: absolute;
    left: 430px;
    top: 238px;
    color: #FFF;
    transform: rotate(15deg);
  }

  .n11 {
    position: absolute;
    left: 390px;
    top: 262px;
    color: #FFF;
    transform: rotate(15deg);
  }

  .n12 {
    position: absolute;
    left: 350px;
    top: 290px;
    color: #FFF;
    transform: rotate(15deg);
  }

  .n13 {
    position: absolute;
    left: 300px;
    top: 310px;
    color: #FFF;
    transform: rotate(15deg);
  }

  .n14 {
    position: absolute;
    left: 1100px;
    top: 285px;
    color: #FFF;
    transform: rotate(15deg);
  }

  .n15 {
    position: absolute;
    left: 1100px;
    top: 314px;
    color: #FFF;
    transform: rotate(15deg);
  }

  .n16 {
    position: absolute;
    left: 1100px;
    top: 349px;
    color: #FFF;
    transform: rotate(15deg);
  }

  .n17 {
    position: absolute;
    left: 1100px;
    top: 395px;
    color: #FFF;
    transform: rotate(12deg);
  }

  .n18 {
    position: absolute;
    left: 1100px;
    top: 433px;
    color: #FFF;
    transform: rotate(12deg);
  }

  .n19 {
    position: absolute;
    left: 1080px;
    top: 473px;
    color: #FFF;
    transform: rotate(12deg);
  }

  .n20 {
    position: absolute;
    left: 1065px;
    top: 515px;
    color: #FFF;
    transform: rotate(14deg);
  }

  .n21 {
    position: absolute;
    left: 1050px;
    top: 560px;
    color: #FFF;
    transform: rotate(15deg);
  }
</style>
