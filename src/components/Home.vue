<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img class="logo" src="../assets/logo.png" alt="">
        <span>管理</span>
      </div>
      <div @click="drawer = true">
        <el-badge :value="12" class="alert">
          <i class="el-icon-message-solid"></i>
          <!--        <el-button size="small">告警</el-button>-->
        </el-badge>
        <el-button type="info" @click="logout">退出</el-button>

      </div>
    </el-header>
    <!-- 主题区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true" :default-active="activePath">
          <el-menu-item :index="'/'+'index'" @click="saveNavState('/index')">
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-s-home"></i>
              <!-- 文本 -->
              <span>首页</span>
            </template>
          </el-menu-item>
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <!-- 一级菜单的模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.auth_name}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ subItem.auth_name }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main id="main-box">
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-drawer
      title="告警详情（更多内容点击左侧告警菜单）"
      :visible.sync="drawer"
      size="46%">
      <div style="margin: 10px 10px">
        <el-table :data="alarmList" border>
          <el-table-column property="time" label="日期" width="150" :formatter="formatDate"></el-table-column>
          <el-table-column property="code" label="温室" width="150"></el-table-column>
          <el-table-column property="co2" label="二氧化碳" width="100" :formatter="formatAlarmCo2"></el-table-column>
          <el-table-column property="o2" label="氧气" width="50" :formatter="formatAlarmO2"></el-table-column>
          <el-table-column property="temperature" label="温度" width="50" :formatter="formatAlarmTemperature"></el-table-column>
          <el-table-column property="air_humidity" label="空气湿度" width="100" :formatter="formatAlarmAirHumidity"></el-table-column>
          <el-table-column property="ground_humidity" label="土壤湿度" :formatter="formatAlarmGroundHumidity"></el-table-column>
        </el-table>
      </div>
    </el-drawer>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      menuList: [],
      iconsObj: {
        '125': 'iconfont icon-user', // 用户管理
        '103': 'iconfont icon-lock_fill', // 权限管理
        '127': 'iconfont icon-tijikongjian', // 数据中心
        '102': 'iconfont icon-danju', // 订单管理
        '145': 'iconfont icon-baobiao', // 报表
        '130': 'el-icon-video-camera', // 监控视频
        '140': 'el-icon-monitor' // 监控视频
      },
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: '',
      drawer: false,
      // alarmList: [{ 'time': '2020-02-24T00:33:00.8735129+08:00', 'code': 'asdf', 'co2': false, 'o2': true, 'temperature': true, 'air_humidity': true, 'ground_humidity': true, 'illumination': false }],
      alarmList: [],
      gridData: [{
        date: '2016-05-02',
        code: '王小虎1',
        co2: '-',
        o2: '是',
        temperature: '是',
        air_humidity: '-',
        ground_humidity: '是'
      }, {
        date: '2016-05-04',
        code: '王小虎1',
        co2: '是',
        o2: '-',
        temperature: '是',
        air_humidity: '-',
        ground_humidity: '-'
      }, {
        date: '2016-05-01',
        code: '王小虎1',
        co2: '是',
        o2: '-',
        temperature: '是',
        air_humidity: '是',
        ground_humidity: '是'
      }, {
        date: '2016-05-01',
        code: '王小虎1',
        co2: '是',
        o2: '-',
        temperature: '是',
        air_humidity: '是',
        ground_humidity: '是'
      }, {
        date: '2016-05-01',
        code: '王小虎1',
        co2: '是',
        o2: '-',
        temperature: '是',
        air_humidity: '是',
        ground_humidity: '是'
      }, {
        date: '2016-05-01',
        code: '王小虎1',
        co2: '是',
        o2: '-',
        temperature: '是',
        air_humidity: '是',
        ground_humidity: '是'
      }, {
        date: '2016-05-01',
        code: '王小虎1',
        co2: '是',
        o2: '-',
        temperature: '是',
        air_humidity: '是',
        ground_humidity: '是'
      }, {
        date: '2016-05-01',
        code: '王小虎1',
        co2: '是',
        o2: '-',
        temperature: '是',
        air_humidity: '是',
        ground_humidity: '是'
      }, {
        date: '2016-05-01',
        code: '王小虎1',
        co2: '是',
        o2: '-',
        temperature: '是',
        air_humidity: '是',
        ground_humidity: '是'
      }, {
        date: '2016-05-01',
        code: '王小虎1',
        co2: '是',
        o2: '-',
        temperature: '是',
        air_humidity: '是',
        ground_humidity: '是'
      }, {
        date: '2016-05-01',
        code: '王小虎1',
        co2: '是',
        o2: '-',
        temperature: '是',
        air_humidity: '是',
        ground_humidity: '是'
      }, {
        date: '2016-05-01',
        code: '王小虎2341',
        co2: '是',
        o2: '-',
        temperature: '是',
        air_humidity: '是',
        ground_humidity: '是'
      }],
      timer: '',
      intervalTimer: 9000
    }
  },
  created () {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
    this.startTimer()
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
    },
    // 菜单折叠和展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 保存连接的激活状态
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    // 开启定时器
    startTimer () {
      this.getAlarm() // 首先立即请求一次数据，再创建定时器
      this.timer = setInterval(this.getAlarm, this.intervalTimer)
    },
    async getAlarm () {
      const { data: res } = await this.$http.get('alarm')
      if (res.meta.status !== 200) return this.$message.error('获取报警列表列表失败')
      this.alarmList = res.data.alarms
      // this.total = res.data.total
    },
    formatAlarmCo2 (row) {
      return row.co2 ? '是' : '-'
    },
    formatAlarmO2 (row) {
      return row.o2 ? '是' : '-'
    },
    formatAlarmTemperature (row) {
      return row.temperature ? '是' : '-'
    },
    formatAlarmAirHumidity (row) {
      return row.air_humidity ? '是' : '-'
    },
    formatAlarmGroundHumidity (row) {
      return row.ground_humidity ? '是' : '-'
    },
    formatDate (row) {
      console.log(999)
      console.log(row.code)
      var dateee = new Date(row.time).toJSON()
      var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      return date
    }
  }
}
</script>

<style lang="less" scoped>
  .home-container {
    height: 100%;
  }

  .el-header {
    background-color: #373D41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;

    > div {
      display: flex;
      align-items: center;

      span {
        margin-left: 15px;
      }
    }
  }

  .logo {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    margin-left: 20px;
  }

  .el-aside {
    background-color: #333744;

    .el-menu {
      border-right: none;
    }
  }

  .el-main {
    background-color: #EAEDF1;
    padding: 0;
  }

  .iconfont {
    margin-right: 10px;
  }

  .toggle-button {
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }

  .alert {
    margin-right: 50px;
  }
  /deep/ :focus{
    outline:0;
  }

</style>
