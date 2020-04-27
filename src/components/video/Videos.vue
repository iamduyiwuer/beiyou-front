<template>
  <div class="main-box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>视频监控</el-breadcrumb-item>
      <el-breadcrumb-item>视频列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-container>
      <el-aside width="500px">
        <el-table
          :data="videos"
          max-height="550"
          border>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column prop="code" label="厂房"></el-table-column>
          <el-table-column prop="video" label="录像"></el-table-column>
          <el-table-column prop="url" label="选择播放">
            <template slot-scope="scope">
              <el-button v-bind:type="btColor" icon="el-icon-check" circle @click="paly(scope.row.url)"></el-button>
<!--              <el-button type="info" icon="el-icon-check" circle @click="paly(scope)"></el-button>-->
            </template>
          </el-table-column>

        </el-table>
      </el-aside>
      <el-container>
        <el-main width="700px" style="margin-left: 100px">
<!--          <video src="http://127.0.0.1:9001/static/test.mp4" style="height: 400px; margin-left:50px"></video>-->
<!--          <video src="http://127.0.0.1:9001/static/test.mp4"></video>-->
<!--          <video>-->
<!--            <source src="http://127.0.0.1:9001/static/test.mp4" type="video/mp4">-->
<!--          </video>-->
<!--          <video width="600" height="400" controls autoplay>-->
<!--          <video width="600" height="400" controls>-->
<!--            <source v-bind:src="videoUrl" type="video/mp4">-->
<!--          </video>-->

          <video ref='video' controls width="600" height="400" autoplay>
            您的浏览器不支持 video元素。

          </video>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      btColor: 'info',
      videos: [
        { video: 'test.mp4', code: '1#温室', url: 'static/test.mp4' },
        { video: 'test.mp4', code: '2#温室', url: 'static/test.mp4' },
        { video: 'demo.mp4', code: '3#温室', url: 'static/demo.mp4' },
        { video: 'demo.mp4', code: '4#温室', url: 'static/demo.mp4' },
        { video: 'demo.mp4', code: '5#温室', url: 'static/demo.mp4' },
        { video: 'demo.mp4', code: '6#温室', url: 'static/demo.mp4' },
        { video: 'demo.mp4', code: '7#温室', url: 'static/demo.mp4' },
        { video: 'demo.mp4', code: '8#温室', url: 'static/demo.mp4' },
        { video: 'demo.mp4', code: '9#温室', url: 'static/demo.mp4' },
        { video: 'demo.mp4', code: '10#温室', url: 'static/demo.mp4' }
      ]
    }
  },
  methods: {
    paly (videoSrc) {
      // this.videoUrl = videoSrc
      // this.$refs.video.src = 'http://47.105.199.236:9001/' + videoSrc
      this.$refs.video.src = 'http://10.0.0.131:9001/' + videoSrc
      // console.log(this.videoUrl)
    }
  }
}
</script>

<style scoped>

</style>
