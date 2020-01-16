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
        <span>服务器列表: </span>
        <el-select v-model="activeHost" placeholder="请选择" @change="handleCommand(activeHost)">
          <template slot="prepend">Http://</template>
          <el-option
            v-for="(item, i) in hosts"
            :key="i"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
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
      activeHost: ''
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
        this.handleCommand(this.activeHost)
      }
    },
    handleCommand (host) {
      this.activeHost = host
      this.$refs.SystemCpu.getSystemCpu(host)
      this.$refs.SystemMem.getSystemMem(host)
      this.$refs.SystemDisk.getSystemDisk(host)
      this.$refs.SystemDiskio.getSystemDiskio(host)
      this.$refs.SystemLoad.getSystemLoad(host)
      this.$refs.ContainerCpu.getContainerCpu(host)
      this.$refs.ContainerMem.getContainerMem(host)
      this.$refs.ContainerNetwork.getContainerNetwork(host)
      this.$refs.ContainerNum.getContainerNum(host)
    }
  }
}
</script>

<style scoped lang="less">
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .card-item {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
