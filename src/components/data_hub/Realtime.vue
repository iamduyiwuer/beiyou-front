<template>
  <div class="main-box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据中心</el-breadcrumb-item>
      <el-breadcrumb-item>实时数据</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table
        :data="realtimeData"
        border
        :default-sort = "{prop: 'time', order: 'ascending'}"
        :row-class-name="tableRowClassName">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="code" label="厂房"></el-table-column>
        <el-table-column prop="time" sortable label="更新时间" :formatter="formatDate"></el-table-column>
        <el-table-column prop="co2" sortable label="二氧化碳"> </el-table-column>
        <el-table-column prop="o2" sortable label="氧气"> </el-table-column>
        <el-table-column prop="air_temperature" sortable label="空气温度"> </el-table-column>
        <el-table-column prop="air_humidity" sortable label="空气湿度"> </el-table-column>
        <el-table-column prop="ground_humidity" sortable label="土壤湿度"> </el-table-column>
        <el-table-column prop="illumination" sortable label="光照度"> </el-table-column>
      </el-table>
    </el-card>

  </div>

</template>
<script>
export default {
  data () {
    return {
      realtimeData: []
    }
  },
  created () {
    this.getRealtimeData()
  },
  methods: {
    tableRowClassName ({ row, rowIndex }) {
      if (row['co2'] > 0.01) {
        return 'warning-row'
      }
      // if (row['co2'] < 0.01 || row['illumination'] < 2 || row['ground_humidity'] < 3) {
      //   return 'warning-row'
      // }
      return ''
    },
    async getRealtimeData () {
      const { data: res } = await this.$http.get('data/realtime')
      if (res.meta.status !== 200) return this.$message.error('获取实时数据失败')
      this.realtimeData = res.data
    },
    formatDate (timestampInt) {
      var date = new Date(timestampInt['time'])
      var YY = date.getFullYear() + '-'
      var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
      var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      return YY + MM + DD + ' ' + hh + mm + ss
    }
  }
}
</script>
<style lang="less" scoped>
  .el-table .warning-row {
    background: #E6A23C;
  }

  /*.el-table .success-row {*/
  /*  background: #f0f9eb;*/
  /*}*/
</style>
