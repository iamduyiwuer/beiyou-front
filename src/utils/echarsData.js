export default {
  FormatEcharsData: function (res) {
    var xCoordinate = []
    var series = []
    var legend = []
    for (var v = 0; v < res.data.length; v++) {
      var tmpLegend = res.data[v].columns.slice(1)
      for (var n = 0; n < tmpLegend.length; n++) {
        legend.push(tmpLegend[n] + '[name=' + res.data[v].tags.name + ']')
      }

      // 初始化series数组，设置name type和data
      var tmpSeries = []
      for (var m = 0; m < tmpLegend.length; m++) {
        tmpSeries.push({
          name: tmpLegend[m] + '[name=' + res.data[v].tags.name + ']',
          type: 'line',
          data: []
        })
      }

      // 处理后端返回的数据 values数据格式如： [1578621480000, 50, 50, 23, 5, 23, 4]
      var values = res.data[v].values
      for (var i = 0; i < values.length; i++) {
        // 把时间戳取出 放到X轴坐标数组中
        // x_coordinate.push(values[i][0])
        if (v === 0) {
          xCoordinate.push(this.formatDate(values[i][0])) // TODO: yici
        }

        // 索引为0是时间戳，不要时间戳，从索引为1的位置开始取值
        for (var k = 0; k < tmpLegend.length; k++) {
          if (typeof (values[i][k + 1]) === 'undefined' || values[i][k + 1] === null || values[i][k + 1] === 0) {
            tmpSeries[k].data.push(values[i][k + 1])
            // tmpSeries[k].data.push(Math.ceil(Math.random() * 10))
          } else {
            tmpSeries[k].data.push(values[i][k + 1].toFixed(2))
            // tmpSeries[k].data.push(Math.ceil(Math.random() * 10))
          }
        }
      }
      for (var p = 0; p < tmpLegend.length; p++) {
        series.push(tmpSeries[p])
      }
    }
    return { 'xCoordinate': xCoordinate, 'series': series, 'legend': legend }
  },
  FormatEcharsContainerCpuData: function (res) {
    var xCoordinate = []
    var series = []
    var legend = []
    for (var v = 0; v < res.data.length; v++) {
      var tmpLegend = res.data[v].columns.slice(1)
      for (var n = 0; n < tmpLegend.length; n++) {
        legend.push(tmpLegend[n] + '[=' + res.data[v].tags.docker_container_cpu + ']')
      }

      // 初始化series数组，设置name type和data
      var tmpSeries = []
      for (var m = 0; m < tmpLegend.length; m++) {
        tmpSeries.push({
          name: tmpLegend[m] + '[docker_container_cpu=' + res.data[v].tags.docker_container_cpu + ']',
          type: 'line',
          data: []
        })
      }

      // 处理后端返回的数据 values数据格式如： [1578621480000, 50, 50, 23, 5, 23, 4]
      var values = res.data[v].values
      for (var i = 0; i < values.length; i++) {
        // 把时间戳取出 放到X轴坐标数组中
        // x_coordinate.push(values[i][0])
        if (v === 0) {
          xCoordinate.push(this.formatDate(values[i][0])) // TODO: yici
        }

        // 索引为0是时间戳，不要时间戳，从索引为1的位置开始取值
        for (var k = 0; k < tmpLegend.length; k++) {
          if (typeof (values[i][k + 1]) === 'undefined' || values[i][k + 1] === null || values[i][k + 1] === 0) {
            tmpSeries[k].data.push(values[i][k + 1])
            // tmpSeries[k].data.push(Math.ceil(Math.random() * 10))
          } else {
            tmpSeries[k].data.push(values[i][k + 1].toFixed(2))
            // tmpSeries[k].data.push(Math.ceil(Math.random() * 10))
          }
        }
      }
      for (var p = 0; p < tmpLegend.length; p++) {
        series.push(tmpSeries[p])
      }
    }
    return { 'xCoordinate': xCoordinate, 'series': series, 'legend': legend }
  },
  formatDate (timestampInt) {
    var date = new Date(timestampInt)
    var YY = date.getFullYear() + '-'
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
    var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    // var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    return YY + MM + DD + ' ' + hh + mm
  }
}
