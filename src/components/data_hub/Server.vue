<template>
  <div class="main-box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据中心</el-breadcrumb-item>
      <el-breadcrumb-item>服务器</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>

      <div>
        <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="item" divided v-for="item in hosts" :key="item">{{item}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

            <systemCpu ref="SystemCpu"></systemCpu>
            <systemMem ref="SystemMem"></systemMem>

    </el-card>

  </div>
</template>

<script>
import SystemCpu from '../server/SystemCpu'
import SystemMem from '../server/SystemMem'

export default {
  data () {
    return {
      hosts: [],
      activeHost: ''
    }
  },
  components: {
    systemCpu: SystemCpu,
    systemMem: SystemMem
  },
  created () {
    this.getHosts()
  },
  methods: {
    async getHosts () {
      const { data: res } = await this.$http.get('monitor/hosts')
      if (res.meta.status !== 200) return this.$message.error('获取服务器列表失败')
      this.hosts = res.data.host
      if (this.hosts.lenght >= 1) {
        this.activeHost = this.hosts[0]
      }
    },
    handleCommand (host) {
      this.activeHost = host
      this.$refs.SystemCpu.getSystemCpu(host)
      this.$refs.SystemMem.getSystemMem(host)
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
</style>
