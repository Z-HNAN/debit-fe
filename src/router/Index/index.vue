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
      moneyAmount: 5000
    }
  },
  components: {
    AccountSelect
  },
  mounted () {
    this.drawLine()
    // 默认显示第一个账户
    this.$ajax.get('/users').then(res => {
      this.$ajax.get('/users/' + res.data[0].id).then(res1 => {
        this.budget = res1.data.moneyAmount
      })
      this.$ajax.get('/bills?userId=' + res.data[0].id).then(res2 => {
        this.getMoneyAmount(res2.data)
      })
    })
  },
  methods: {
    drawLine () {
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
      myChart2.setOption({
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            data: [
              {value: 235, name: '交通出行'},
              {value: 274, name: '服饰美容'},
              {value: 310, name: '文体教育'},
              {value: 335, name: '餐饮美食'},
              {value: 800, name: '生活日用'},
              {value: 1000, name: '住房物业'}
            ]
          }
        ]
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
