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
      <el-col :span="12">
        <div id="myChart1" :style="{width: '110%', height: '400px'}"></div>
      </el-col>
      <el-col :span="12">
        <div id="myChart2" :style="{width: '100%', height: '400px'}"></div>
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
      billTypes: [],
      value: ''
    }
  },
  created () {
    this.getAccount()
  },
  mounted () {
    this.drawLine(this.value.id)
  },
  methods: {
    getAccount () { // 获取该用户所有的记账账本
      this.$ajax.get('/users')
        .then((response) => {
          this.options = response.data
          console.log(response.data)
        }).catch((error) => {
          console.log(error)
        })
    },
    selAccount (selUserId) { // 用户选择账户
      this.$ajax.get('/users/{' + selUserId + '}')
        .then((response) => {
          this.value = response.data
          this.rest = this.value.moneyAmount // 账户余额
          this.online = this.getDay(this.value.createDate) // 记账时间
        }).catch((error) => {
          console.log(error)
        })
    },
    getBillType (accountId) { // 获取用户所有的记账类型
      this.$ajax.get('/billTypes?account=' + accountId)
        .then((response) => {
          this.billTypes = response.data
        }).catch((error) => {
          console.log(error)
        })
    },
    // getBill () { // 获取指定账户下的所有账单
    //   this.$ajax.get('/bills')
    //     .then((response) =>  {
    //       this.bills =  response.data
    //     }).catch((error) => {
    //       console.log(error);
    //     })
    // },
    drawLine (accountId) { // echart图表
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
      this.$ajax.get('/billTypes?account=' + accountId).then((response) => {
        myChart2.setOption({
          series: [
            {
              name: '支出比重',
              type: 'pie',
              radius: '50%',
              data: response.data.name
              // [
            
              // {value: 274, name: '服饰美容'},
              // {value: 310, name: '文体教育'},
              // {value: 335, name: '餐饮美食'},
              // {value: 800, name: '生活日用'},
              // {value: 1000, name: '住房物业'}
              // ]
            }
          ]
        })
      })
    },
    getDay (startTime) { // 根据时间戳获取记账天数
      var endTime = new Date().getTime()
      var days = Math.floor((endTime - startTime) / 86400000)
      return days
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
