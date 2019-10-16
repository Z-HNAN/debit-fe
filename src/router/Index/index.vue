<template>
  <div class="main">
    <h1 style="display: inline-block;margin-right: 10px;">XXX账户</h1>
    <template>
      <el-select v-model="value" placeholder="请选择你的账户">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </template>
    <el-row>
      <el-col :span="8"><h3>在线天数</h3></el-col>
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
export default {
  name: 'IndexContainer',
  data () {
    return {
      online: 100,
      used: 900,
      budget: 2500,
      rest: 3000,
      options: [{
        value: '选项1',
        label: '账号一'
      }, {
        value: '选项2',
        label: '账户二'
      }, {
        value: '选项3',
        label: '账户三'
      }, {
        value: '选项4',
        label: '账户四'
      }, {
        value: '选项5',
        label: '账户五'
      }],
      value: ''
    }
  },
  mounted () {
    this.drawLine()
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
          feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
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
    }
  }
}
</script>
<style scoped>
*{
  font-family: "微软雅黑";
  font-weight: normal;
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
