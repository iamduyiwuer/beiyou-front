<template>
  <div class="main-box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据中心</el-breadcrumb-item>
      <el-breadcrumb-item>服务器</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 下拉选择框 -->
    <el-card>
      <div style="margin-bottom: 20px">
        <span style="margin-left: 10px">服务器列表: </span>
        <el-select suffix-icon="el-icon-date" v-model="activeHost" placeholder="请选择" @change="getEcharsData(activeHost, selectTimeValue)">
          <el-option
            v-for="(item, i) in hosts"
            :key="i"
            :label="item"
            :value="item">
          </el-option>
        </el-select>

        <!-- 开始时间 -->
        <div class="select-time">
          <i class="el-icon-time" style="margin-left: 10px"></i>
          Past
          <el-select class="dashboard-time"
                     v-model="selectTimeValue"
                     placeholder="请选择"
                     @change="selectTimeChange(selectTimeValue)">
            <el-option
              v-for="(item, i) in selectTime"
              :key="i"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>

        <!-- 刷新间隔 -->
        <div class="select-refresh">
          <i class="el-icon-refresh" style="margin-left: 10px"></i>
          <i class="el-icon-video-pause" style="margin-left: 10px"></i>
          <el-select class="dashboard-time"
                     v-model="selectRefreshValue"
                     placeholder="请选择"
                     @change="selectRefreshChange(selectRefreshValue)">
            <el-option
              v-for="(item, i) in selectRefresh"
              :key="i"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>

      </div>

      <!-- echarts折线图 -->
      <el-row>

        <el-col :span="8">
          <el-card class="card-item" :body-style="{ padding: '0px'}">
            <systemCpu ref="SystemCpu"></systemCpu>
            <div style="padding: 14px; text-align: center">
              <span>cpu处理器</span>
            </div>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card class="card-item" :body-style="{ padding: '0px' }">
            <systemMem ref="SystemMem"></systemMem>
            <div style="padding: 14px; text-align: center">
              <span>内存</span>
            </div>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card class="card-item" :body-style="{ padding: '0px' }">
            <systemLoad ref="SystemLoad"></systemLoad>
            <div style="padding: 14px; text-align: center">
              <span>系统负载</span>
            </div>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card class="card-item" :body-style="{ padding: '0px' }">
            <containerNum ref="ContainerNum"></containerNum>
            <div style="padding: 14px; text-align: center">
              <span>容器数量</span>
            </div>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card class="card-item" :body-style="{ padding: '0px' }">
            <systemDisk ref="SystemDisk"></systemDisk>
            <div style="padding: 14px; text-align: center">
              <span>硬盘容量</span>
            </div>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card class="card-item" :body-style="{ padding: '0px' }">
            <systemDiskio ref="SystemDiskio"></systemDiskio>
            <div style="padding: 14px; text-align: center">
              <span>硬盘读写速率</span>
            </div>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card class="card-item" :body-style="{ padding: '0px' }">
            <containerCpu ref="ContainerCpu"></containerCpu>
            <div style="padding: 14px; text-align: center">
              <span>容器cpu</span>
            </div>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card class="card-item" :body-style="{ padding: '0px' }">
            <containerMem ref="ContainerMem"></containerMem>
            <div style="padding: 14px; text-align: center">
              <span>容器内存</span>
            </div>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card class="card-item" :body-style="{ padding: '0px' }">
            <containerNetwork ref="ContainerNetwork"></containerNetwork>
            <div style="padding: 14px; text-align: center">
              <span>容器网络</span>
            </div>
          </el-card>
        </el-col>

      </el-row>

    </el-card>
  </div>
</template>

<script>
import SystemCpu from '../server/SystemCpu'
import SystemMem from '../server/SystemMem'
import SystemDisk from '../server/SystemDisk'
import SystemDiskio from '../server/SystemDiskio'
import SystemLoad from '../server/SystemLoad'
import ContainerCpu from '../server/ContainerCpu'
import ContainerMem from '../server/ContainerMem'
import ContainerNetwork from '../server/ContainerNetwork'
import ContainerNum from '../server/ContainerNum'

export default {
  data () {
    return {
      currentDate: new Date(),
      hosts: [],
      activeHost: '',
      selectRefresh: [ 'Paused', '5s', '10s', '15s', '30s', '60s' ],
      selectRefreshValue: '60',
      selectTime: ['5m', '15m', '1h', '6h', '12h', '24h', '2d', '7d', '30d'],
      selectTimeValue: '1h'
    }
  },
  components: {
    systemCpu: SystemCpu,
    systemMem: SystemMem,
    systemDisk: SystemDisk,
    systemDiskio: SystemDiskio,
    systemLoad: SystemLoad,
    containerCpu: ContainerCpu,
    containerMem: ContainerMem,
    containerNetwork: ContainerNetwork,
    containerNum: ContainerNum
  },
  created () {
    this.getHosts()
  },
  methods: {
    async getHosts () {
      const { data: res } = await this.$http.get('monitor/hosts')
      if (res.meta.status !== 200) return this.$message.error('获取服务器列表失败')
      this.hosts = res.data.host
      if (this.hosts.length > 0) {
        this.activeHost = this.hosts[1]
        this.getEcharsData(this.activeHost, this.selectTimeValue)
      }
    },
    getEcharsData (host, dashboardTime) {
      this.activeHost = host
      this.$refs.SystemCpu.getSystemCpu(host, dashboardTime)
      this.$refs.SystemMem.getSystemMem(host, dashboardTime)
      this.$refs.SystemDisk.getSystemDisk(host, dashboardTime)
      this.$refs.SystemDiskio.getSystemDiskio(host, dashboardTime)
      this.$refs.SystemLoad.getSystemLoad(host, dashboardTime)
      this.$refs.ContainerCpu.getContainerCpu(host, dashboardTime)
      this.$refs.ContainerMem.getContainerMem(host, dashboardTime)
      this.$refs.ContainerNetwork.getContainerNetwork(host, dashboardTime)
      this.$refs.ContainerNum.getContainerNum(host, dashboardTime)
    },
    selectTimeChange (timeStr) {
      this.getEcharsData(this.activeHost, this.selectTimeValue)
    },
    selectRefreshChange (refreshTimeStr) {
      console.log(refreshTimeStr)
    }
  }
}
</script>

<style lang="less">
  .dashboard-time {
    width: 100px;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .card-item {
    width: 100%;
    height: 100%;
    display: block;
  }
  .select-time {
    border: 1px solid #ccc !important;
    padding: 0px;
    border-radius: 4px !important;
    width: 200px;
    float: right;
    .el-input__inner {
      border: 0px;
      -webkit-appearance: none;
      background-color: #FFF;
      background-image: none;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      outline: 0;
      padding: 0 20px;
      -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 100%;
    }
  }
  .select-refresh {
    border: 1px solid #ccc !important;
    padding: 0px;
    border-radius: 4px !important;
    width: 200px;
    float: right;
    margin-right: 20px;
    .el-input__inner {
      border: 0px;
      -webkit-appearance: none;
      background-color: #FFF;
      background-image: none;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      outline: 0;
      padding: 0 20px;
      -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 100%;
    }
  }

</style>
