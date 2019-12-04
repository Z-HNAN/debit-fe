<template>
  <div class="main">
    <el-row><h2>日消费统计</h2></el-row>
    <el-row>
      <el-date-picker
        v-model="date"
        type="date"
        placeholder="选择日期"
        value-format="timestamp"
        @change="getDate"
        >
      </el-date-picker>
    </el-row>
    <el-row>
      <el-col :span="14">
         <h1>收/支条目明细</h1>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="tag"
              label="支/收"
              width="100"
              :filters="[{ text: '支出', value: '支出' }, { text: '收入', value: '收入' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.tag === '收入' ? 'primary' : 'danger'"
                  disable-transitions>{{scope.row.tag}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="title"
              label="名称"
              width="100">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
            </el-table-column>
            <el-table-column
              prop="amount"
              label="金额"
              width="100">
            </el-table-column>
          </el-table>
      </el-col>
      <el-col :span="10" style="padding-left: 20px;padding-top: 10px;">
        <h1>账目占比</h1>
        <div id="myPieChart" style="width: 100%;height: 340px;"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'dayStatistic',
  data () {
    return {
      date: Date.parse(new Date()),
      tableData: []
    }
  },
  mounted () {
    this.drawLine(this.date, (this.date + 100 * 60 * 60 * 24))
  },
  methods: {
    // 表格标签过滤器
    filterTag (value, row) {
      return row.tag === value
    },
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    // 更新日期
    getDate () {
      this.drawLine(this.date, (this.date + 100 * 60 * 60 * 24))
    },
    drawLine (startDate, endDate) {
      this.$ajax.get('/bills?startDate=' + startDate + '&endDate=' + endDate).then((response) => {
        this.tableData = []
        for (var i = 0; i < response.data.length; i++) {
          var data = {
            'title': response.data[i].name,
            'remark': response.data[i].remark,
            'tag': response.data[i].isIncome ? '支出' : '收入',
            'amount': response.data[i].amount
          }
          this.tableData.push(data)
        }

        // 绘制饼图
        let myPieChart = this.$echarts.init(document.getElementById('myPieChart'))
        // 绘制图表
        myPieChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          series: [
            {
              name: '账目信息',
              type: 'pie',
              radius: [30, 110],
              center: ['50%', '50%'],
              roseType: 'area',
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

<style >
</style>
