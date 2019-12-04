<template>
  <div class="main">
    <h1 style="display: inline-block;margin-right: 10px;">XXX账户</h1>
    <el-select v-model="value" @change="selAccount" placeholder="请选择你的账户">
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
    <div class="chartPreview">
      <el-row>
        <el-col :span="8"><h3>记账天数</h3></el-col>
         <el-col :span="8"><h3>预算额度</h3></el-col>
          <el-col :span="8"><h3>账户余额</h3></el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="box3">{{online}}天
          </div>
        </el-col>
        <el-col :span="8">
          <div class="box3">{{used}}/{{budget}}&nbsp;元
          </div>
        </el-col>
        <el-col :span="8">
          <div class="box3">{{rest}}&nbsp;元
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :span="20">
        <div id="myChart1" :style="{width: '110%', height: '400px'}"></div>
      </el-col>
    </el-row>
  </div>

</template>
<script>
export default {
  name: 'IndexContainer',
  data () {
    return {
      online: null,
      used: 900,
      budget: 2500,
      rest: null,
      options: [],
      value: '',
      year: new Date(Date.parse(new Date().getFullYear())),
      income: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      expand: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      surplus: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  },
  mounted () {
    this.getAccount()
  },
  methods: {
    getAccount () { // 获取该用户所有的记账账本
      this.$ajax.get('/users')
        .then((response) => {
          this.options = response.data
          this.selAccount(this.options[0].id)
          console.log(response.data)
        }).catch((error) => {
          console.log(error)
        })
    },
    selAccount (userId) { // 用户选择账户
      this.$ajax.get('/users/{' + userId + '}')
        .then((response) => {
          this.value = response.data.name
          this.rest = response.data.moneyAmount // 账户余额
          this.online = this.getDay(response.data.createDate) // 记账时间
          console.log(response.data.createDate)
          this.drawLine(response.data.createDate, new Date().getTime())
        }).catch((error) => {
          console.error(error)
        })
    },
    getDay (startTime) { // 根据时间戳获取记账天数
      var endTime = new Date().getTime()
      var days = Math.floor((endTime - startTime) / 86400000)
      return days
    },
    // 月份时间戳
    GetTimeStamp (year) {
      var startDate = Date.parse(year) // 每年1月1日时间戳
      var MonthStart = [] // 存储月份时间戳

      for (var i = 0; i < 12; i++) {
        var MonStart = new Date(startDate).setMonth(new Date(startDate).getMonth() + i)
        MonthStart.push(MonStart)
      }
      return MonthStart
    },
    drawLine (startDate, endDate) { // echart图表
      // 月份时间戳
      var month = this.GetTimeStamp(this.year)
      
      this.$ajax.get('/bills?startDate=' + startDate + '&endDate=' + endDate).then((response) => {
        // 不同账本统计清零
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
                this.expand[j + 1] -= bill.amount
                this.surplus[j + 1] -= bill.amount
              }
              break
            }
          }
        }
        // 基于准备好的dom，初始化echarts实例
        let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
        // 绘制图表
        myChart1.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          legend: {
            data: ['消费金额', '剩余金额', '收入金额']
          },
          xAxis: [
            {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '消费金额',
              axisLabel: {
                formatter: '{value} 元'
              }
            },
            {
              type: 'value',
              name: '剩余金额',
              axisLabel: {
                formatter: '{value} 元'
              }
            }
          ],
          series: [
            {
              name: '消费金额',
              type: 'bar',
              data: this.expand
            },
            {
              name: '剩余金额',
              type: 'line',
              yAxisIndex: 1,
              data: this.surplus
            },
            {
              name: '收入金额',
              type: 'bar',
              data: this.income
            }
          ]
        })
      })
    }
  }
}
</script>
<style scoped>
*{
  font-family: "微软雅黑";
  font-weight: normal;
}
.chartPreview{
  text-align: center;
}
.box3 {
  height: 200px;
  width: 200px;
  background-color:coral;
  border-radius: 100%;
  line-height: 200px;
  font-size: 18px;
  margin: 0px auto;
}

.box3:hover {
  background-color: orangered;
}
.el-row {
  padding-left: 20px;
  margin-top: 10px;
}

#myChart1,#myChart2 {
  margin-top: 40px;
}

</style>
