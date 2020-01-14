<template>
  <div class="main-box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>视频监控</el-breadcrumb-item>
      <el-breadcrumb-item>视频列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20" v-for="(item1, i1) in vodeos" :key="i1">
        <h1><el-button type="info" @click="show2 = !show2">{{item1.code}}</el-button></h1>

        <el-col :span="8" v-for="(item2, i2) in item1.videos" :key="i2">
          <video-player class="video-player vjs-custom-skin"
                        ref="videoPlayer"
                        :playsinline="true"
                        :options="playerOptions"
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
}
</script>

<style scoped>

</style>
