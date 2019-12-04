<template>
  <div class="main">
    <el-row><h1>年消费统计</h1></el-row>
    <el-row>
      <el-date-picker
        v-model="year"
        type="year"
        placeholder="选择时间段"
        @change="getPeriod">
      </el-date-picker>
      <div id="myChart" style="width: 100%;height: 480px;"></div>
    </el-row>
    <el-row>
      <div id="myChart" style="width: 100%;height: 500px;"></div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'yearStatistic',
  data () {
    return {
      year: new Date(Date.parse(new Date().getFullYear())),
      month: ['month', '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      income: ['收入', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      expand: ['支出', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      surplus: ['结余', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    // 月份时间戳
    GetTimeStamp () {
      var startDate = Date.parse(this.year) // 每年1月1日时间戳
      var MonthStart = [] // 存储月份时间戳

      for (var i = 0; i < 12; i++) {
        var MonStart = new Date(startDate).setMonth(new Date(startDate).getMonth() + i)
        MonthStart.push(MonStart)
      }
      return MonthStart
    },
    // 选择年份
    getPeriod () {
      // 开始年份时间戳
      var startDate = Date.parse(this.year)
      // 结束年份时间戳
      var endDate = new Date(startDate).setFullYear(new Date(startDate).getFullYear() + 1)
      // 更新数据
      this.drawLine(startDate, endDate)
    },
    drawLine (startDate, endDate) {
      // 月份时间戳
      var month = this.GetTimeStamp()
      
      this.$ajax.get('/bills?startDate=' + startDate + '&endDate=' + endDate).then((response) => {
        // 年统计清零
        for (var k = 1; k < 13; k++) {
          this.income[k] = 0
          this.expand[k] = 0
          this.surplus[k] = 0
        }
        // 处理每一条账单
        for (var i = 0; i < response.data.length; i++) {
          var bill = response.data[i]
          // 计算每月收入、支出和结余
          for (var j = 0; j < 11; j++) {
            if (month[j] <= bill.date && bill.date < month[j + 1]) {
              if (bill.isIncome) { // 判断是否为收入
                this.income[j + 1] += bill.amount
                this.surplus[j + 1] += bill.amount
              } else {
                this.expand[j + 1] += bill.amount
                this.surplus[j + 1] -= bill.amount
              }
              break
            }
          }
        }
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        let option = {
          legend: {},
          tooltip: {
            trigger: 'axis',
            showContent: true
          },
          dataset: {
            source: [
              this.month,
              this.income,
              this.expand,
              this.surplus
            ]
          },
          xAxis: {type: 'category'},
          yAxis: {gridIndex: 0},
          grid: {top: '55%'},
          series: [
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {
              type: 'pie',
              id: 'pie',
              radius: '30%',
              center: ['50%', '25%'],
              label: {
                formatter: '{b}: {@2019} ({d}%)'
              },
              encode: {
                itemName: 'month',
                value: '2019',
                tooltip: '2019'
              }
            }
          ]
        }
        myChart.on('updateAxisPointer', function (event) {
          var xAxisInfo = event.axesInfo[0]
          if (xAxisInfo) {
            var dimension = xAxisInfo.value + 1
            myChart.setOption({
              series: {
                id: 'pie',
                label: {
                  formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                },
                encode: {
                  value: dimension,
                  tooltip: dimension
                }
              }
            })
          }
        })
        myChart.setOption(option)
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>

<style>
</style>
