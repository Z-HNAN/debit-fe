<template>
  <div class="main">
    <el-row><h1>月消费统计</h1></el-row>
    <el-row>
      <el-date-picker
        v-model="month"
        type="monthrange"
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
        @change="getMonthPeriod">
      </el-date-picker>
    </el-row>
    <el-row>
      <div id="myChart" style="width: 100%;height: 500px;"></div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'monthStatistic',
  data () {
    return {
      month: [new Date().setMonth(new Date().getMonth() - 1), new Date()],
      lineData: [
        {value: 0},
        {value: 0},
        {value: 0}
      ]
    }
  },
  mounted () {
    this.drawLine(this.month[0], this.month[1])
  },
  methods: {
    // 获取月份时间戳
    getTimeStamp (month) {
      return Date.parse(month)
    },
    // 触发选择月份事件
    getMonthPeriod () {
      var startMonth = this.getTimeStamp(this.month[0])
      var endMonth = this.getTimeStamp(this.month[1])
      this.drawLine(startMonth, endMonth)
    },
    drawLine (startMonth, endMonth) {
      this.$ajax.get('/bills?startMonth=' + startMonth + '&endMonth=' + endMonth).then((response) => {
        // 对账单类型进行分类
        var bills = response.data
        for (var i = 0; i < bills.length; i++) {
          if (bills[i].isIncome) { // 收入汇总
            this.lineData[0].value += bills[i].amount
            this.lineData[2].value += bills[i].amount
          } else { // 支出汇总
            this.lineData[1].value += bills[i].amount
            this.lineData[2].value -= bills[i].amount
          }
        }
      
        // 更新饼状图
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        myChart.setOption({
          title: {
            text: '账户金额汇总'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            top: 80,
            bottom: 30
          },
          xAxis: {
            type: 'value',
            position: 'top',
            splitLine: {lineStyle: {type: 'dashed'}}
          },
          yAxis: {
            type: 'category',
            axisLine: {show: true},
            axisLabel: {show: false},
            axisTick: {show: false},
            splitLine: {show: true},
            data: ['支出', '收入', '结余']
          },
          series: [
            {
              name: '生活费',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  formatter: '{b}'
                }
              },
              data: this.lineData
            }
          ]
        })
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>

<style>
</style>
