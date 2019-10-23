<template>
  <div class="main">
    <AccountSelect @getAccount="selectAccount"/>
    <div class="chartPreview">
      <el-row>
        <el-col :span="8"><h3>在线天数</h3></el-col>
         <el-col :span="8"><h3>使用金额</h3></el-col>
          <el-col :span="8"><h3>预算金额</h3></el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="box3">{{online}}天
          </div>
        </el-col>
        <el-col :span="8">
          <div class="box3">{{used}}/{{moneyAmount}}&nbsp;元
          </div>
        </el-col>
        <el-col :span="8">
          <div class="box3">{{budget}}&nbsp;元
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :span="12">
        <div id="myChart1" :style="{width: '100%', height: '400px'}"></div>
      </el-col>
      <el-col :span="12">
        <div id="myChart2" :style="{width: '100%', height: '400px'}"></div>
      </el-col>
    </el-row>
  </div>

</template>
<script>
import AccountSelect from '@/components/AccountSelect/index.vue'
export default {
  name: 'IndexContainer',
  data () {
    return {
      online: 100,
      used: 900,
      budget: 3000,
      moneyAmount: 5000,
      rest: null,
      options: [],
      value: ''
    }
  },
  components: {
    AccountSelect
  },
  mounted () {
    // 默认显示第一个账户
    this.$ajax.get('/users').then(res => {
      this.$ajax.get('/users/' + res.data[0].id).then(res1 => {
        this.budget = res1.data.moneyAmount
      })
      this.$ajax.get('/bills?userId=' + res.data[0].id).then(res2 => {
        this.getMoneyAmount(res2.data)
      })
    })
    this.drawLine()
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
        }).catch((error) => {
          console.log(error)
        })
      this.drawLine(userId)
    },
    getDay (startTime) { // 根据时间戳获取记账天数
      var endTime = new Date().getTime()
      var days = Math.floor((endTime - startTime) / 86400000)
      return days
    },
    drawLine (userId) { // echart图表
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
        toolbox: {
          // feature: {
          //   dataView: {show: true, readOnly: false},
          //   magicType: {show: true, type: ['line', 'bar']},
          //   restore: {show: true},
          //   saveAsImage: {show: true}
          // }
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
            data: [500, 600, 700, 800, 800, 1000, 888, 788, 900, 777, 666, 555]
          },
          {
            name: '剩余金额',
            type: 'bar',
            data: [1000, 2000, 3000, 2500, 3000, 3100, 4000, 3500, 5000, 2800, 3000, 3800]
          },
          {
            name: '收入金额',
            type: 'line',
            yAxisIndex: 1,
            data: [2000, 3000, 4000, 3000, 3500, 4500, 5000, 4000, 6000, 3444, 4444, 5000]
          }
        ]
      })

      let myChart2 = this.$echarts.init(document.getElementById('myChart2'))

      // 异步加载数据
      this.$ajax.get('/users/type/{' + userId + '}').then((response) => {
        // 绘制图表
        myChart2.setOption({
          title: {
            text: '账目总览',
            left: 'center',
            top: 20,
            textStyle: {
              color: '#aaa'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: (function () { // 饼图数据
              let data = []
              for (let i = 0; i < response.data.length; i++) {
                data.push({
                  'value': response.data[i].amount,
                  'name': response.data[i].name
                })
              }
              return data
            })()
              .sort(function (a, b) { return a.value - b.value }),
            roseType: 'radius',
            label: {
              normal: {
                textStyle: {
                  color: 'rgba(0, 0, 0, 0.8)'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'rgba(0, 0, 0, 0.5)'
                },
                smooth: 0,
                length: 10,
                length2: 20
              }
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200
            }
          }]
        })
      })
    },
    selectAccount (id) {
      // 获取选中账本moneyAmount
      this.$ajax.get('/users/' + id)
        .then(res => {
          // console.log(res.data)
          this.budget = res.data.moneyAmount
        })
        .catch(err => {
          console.log(err)
        })
      // 获取指定账本下的所有账目明细
      this.$ajax.get('/bills?userId=' + id)
        .then(res => {
          this.getMoneyAmount(res.data)
        })
    },
    getMoneyAmount (bills) {
      // 计算所有收入账目总额
      let income = bills.filter(item => {
        return item.isIncome === true
      })
      let allIncome = 0
      for (let i = 0; i < income.length; i++) {
        allIncome += income[i].amount
      }
      // 计算所有支出账目总额
      let pay = bills.filter(item => {
        return item.isIncome === false
      })
      let allPay = 0
      for (let i = 0; i < pay.length; i++) {
        allPay += pay[i].amount
      }
      // 计算账本总金额 = 所有收入 - 所有支出
      this.moneyAmount = allIncome - allPay
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
