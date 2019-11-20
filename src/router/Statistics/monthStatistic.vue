<template>
  <div class="main">
    <el-row><h1>月消费统计</h1></el-row>
    <el-row>
      <el-date-picker
        v-model="month"
        type="month"
        placeholder="选择月">
        @click="getMonth"
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
      month: '',
      cellSize: [80, 80],
      pieRadius: 30
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    getMonth () {
      this.drawLine()
    },
    // 获取日期
    getVirtulData () {
      var date = this.$echarts.number.parseDate('2017-02-01')
      var end = this.$echarts.number.parseDate('2017-03-01')
      var dayTime = 3600 * 24 * 1000
      var data = []
      for (var time = date; time < end; time += dayTime) {
        data.push([
          this.$echarts.format.formatTime('yyyy-MM-dd', time),
          Math.floor(Math.random() * 10000)
        ])
      }
      return data
    },
    // 获取饼状图
    getPieSeries (scatterData, chart) {
      return this.$echarts.util.map(scatterData, (item, index) => {
        return {
          id: index + 'pie',
          type: 'pie',
          // center: chart.convertToPixel('calendar', item),
          label: {
            normal: {
              formatter: '{c}',
              position: 'inside'
            }
          },
          radius: this.pieRadius,
          data: [
            {name: '工作', value: Math.round(Math.random() * 24)},
            {name: '娱乐', value: Math.round(Math.random() * 24)},
            {name: '睡觉', value: Math.round(Math.random() * 24)}
          ]
        }
      })
    },
    getPieSeriesUpdate (scatterData, chart) {
      return this.$echarts.util.map(scatterData, (item, index) => {
        var center = chart.convertToPixel('calendar', item)
        return {
          id: index + 'pie',
          center: center
        }
      })
    },
    drawLine () {
      // 更新饼状图
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      let scatterData = this.getVirtulData()
      let getPieSeries = this.getPieSeries(scatterData, myChart)
      let option = {
        legend: {
          data: ['工作', '娱乐', '睡觉'],
          bottom: 20
        },
        calendar: {
          top: 'middle',
          left: 'center',
          orient: 'vertical',
          cellSize: this.cellSize,
          yearLabel: {
            show: false,
            textStyle: {
              fontSize: 30
            }
          },
          dayLabel: {
            margin: 20,
            firstDay: 1,
            nameMap: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
          },
          monthLabel: {
            show: false
          },
          range: ['2017-02']
        },
        series: [{
          id: 'label',
          type: 'scatter',
          coordinateSystem: 'calendar',
          symbolSize: 1,
          label: {
            normal: {
              show: true,
              formatter: function (params) {
                return this.$echarts.format.formatTime('dd', params.value[0]);
              },
              offset: [-this.cellSize[0] / 2 + 10, -this.cellSize[1] / 2 + 10],
              textStyle: {
                color: '#000',
                fontSize: 14
              }
            }
            },
            data: scatterData
        }]
      }
      //myChart.setOption(option)
      // console.log(myChart)

      if (!app.inNode) {
        var pieInitialized
        setTimeout(function () {
          pieInitialized = true;
          myChart.setOption({
            series: getPieSeries
          })
        }, 10)

        app.onresize = function () {
          if (pieInitialized) {
            myChart.setOption({
              series: getPieSeriesUpdate(scatterData, myChart)
            })
          }
        }
      }
    }
  }
}
</script>

<style>
</style>
