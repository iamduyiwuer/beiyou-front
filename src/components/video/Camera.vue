<template>
  <div class="main-box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>视频监控</el-breadcrumb-item>
      <el-breadcrumb-item>摄像头</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20" v-for="(item1, i1) in videos" :key="i1">
        <h1>
          <el-button type="info" @click="show2 = !show2">{{item1.code}}</el-button>
        </h1>

        <el-col :span="8" v-for="(item2, i2) in item1.videos" :key="i2">
          <video-player class="video-player vjs-custom-skin"
                        ref="videoPlayer"
                        :playsinline="true"
                        :options="item1.videoSrcList[i2]"
          >
          </video-player>
        </el-col>
        <el-col :span="24">
          <el-divider></el-divider>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>

export default {
  data () {
    return {
      activeNames: ['1'],
      videos: [
        // { 'code': 'a士大夫', videos: ['http://vjs.zencdn.net/v/oceans.mp4', 'http://vjs.zencdn.net/v/oceans.mp4'] },
        // {
        //   'code': 'b',
        //   videos: ['http://vjs.zencdn.net/v/oceans.mp4', 'http://vjs.zencdn.net/v/oceans.mp4', 'http://vjs.zencdn.net/v/oceans.mp4']
        // },
        // { 'code': 'c', videos: ['http://vjs.zencdn.net/v/oceans.mp4', 'http://vjs.zencdn.net/v/oceans.mp4'] }
      ],
      playerOptions: {
        live: true,
        // playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: true, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: true, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: '', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
          src: 'http://vjs.zencdn.net/v/oceans.mp4' // url地址
          // src: 'rtsp://184.72.239.149/vod/mp4://BigBuckBunny_175k.mov' // url地址
        }],
        // poster: '../../static/images/test.jpg', // 你的封面地址
        // width: document.documentElement.clientWidth, // 播放器宽度
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,
          currentTimeDisplay: false, // 当前时间
          volumeControl: false, // 声音控制键
          playToggle: false, // 暂停和播放键
          progressControl: false, // 进度条
          fullscreenToggle: true // 全屏按钮
        }
      }
    }
  },
  created () {
    this.getVideos()
  },
  methods: {
    async getVideos () {
      const { data: res } = await this.$http.get('camera')
      if (res.meta.status !== 200) return this.$message.error('获取实时数据失败')
      this.videos = res.data
      for (var j = 0; j < this.videos.length; j++) {
        var videoSrcList = []
        for (var k = 0; k < this.videos[k].videos.length; k++) {
          videoSrcList[k] = {
            live: true,
            // playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
            autoplay: true, // 如果true,浏览器准备好时开始回放。
            muted: false, // 默认情况下将会消除任何音频。
            loop: true, // 导致视频一结束就重新开始。
            preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
            language: 'zh-CN',
            aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
            fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
            sources: [{
              type: '', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
              src: this.videos[j].videos[k] // url地址
              // src: 'rtsp://184.72.239.149/vod/mp4://BigBuckBunny_175k.mov' // url地址
            }],
            // poster: '../../static/images/test.jpg', // 你的封面地址
            // width: document.documentElement.clientWidth, // 播放器宽度
            notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
            controlBar: {
              timeDivider: false,
              durationDisplay: false,
              remainingTimeDisplay: false,
              currentTimeDisplay: false, // 当前时间
              volumeControl: false, // 声音控制键
              playToggle: false, // 暂停和播放键
              progressControl: false, // 进度条
              fullscreenToggle: true // 全屏按钮
            }
          }
        }
        this.videos[j].videoSrcList = videoSrcList
      }
    }
  }
}
</script>

<style scoped lang="less">
  .video-js .vjs-icon-placeholder {
    width: 100%;
    height: 100%;
    display: block;
  }

  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>
