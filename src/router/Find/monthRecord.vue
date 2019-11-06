<template>
   <el-table
      :data="tableData.slice((currentPage-1) * 8, currentPage * 8)
      .filter(data => !search || data.month.toLowerCase().includes(search.toLowerCase()))"
      style="width: 80%">
      <el-table-column
        label="月份"
        prop="month">
      </el-table-column>
      <el-table-column
        label="花销金额"
        prop="paySum">
      </el-table-column>
      <el-table-column
        label="收入金额"
        prop="incomeSum">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="请输入年份-月份"/>
        </template>
        <template slot-scope="scope">
          <el-button size="small"  style="margin-right:10px ;"><i class="fa fa-pie-chart"></i>&nbsp;统计</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index)"><i class="fa fa-trash-o"></i>&nbsp;删除</el-button>
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
export default {
  name: 'monthRecord',
  props: ['billData', 'currentPage'],
  data () {
    return {
      tableData: [],
      tableData1: [],
      search: ''
    }
  },
  methods: {
    handleDelete (index) {
      this.tableData.splice(index, 1)
    },
    // 将日期按相同年-月划分
    getYearMonth () {
      let yearMonth = this.billData.reduce((prev, item) => {
        let splitDate = item.date.split('-')
        let date = splitDate[0] + '-' + splitDate[1]
        if (date in prev) {
          prev[date].push(item) // 按照相同年月分组
        } else {
          prev[date] = [item]
        }
        return prev
      }, {})
      // console.log(yearMonth)
      for (var k in yearMonth) {
        let incomeSum = 0
        let paySum = 0
        let obj = {} // 存放month paySum incomeSum
        yearMonth[k].forEach(item => {
          if (item.isIncome === true) {
            incomeSum += item.amount
          } else {
            paySum += item.amount
          }
        })
        // console.log(incomeSum, paySum)
        obj.month = k
        obj.incomeSum = incomeSum
        obj.paySum = paySum
        // console.log(obj)
        this.tableData.push(obj)
      }
      // this.tableData = this.tableData1.slice(0, 8)
    }
    // 切换页面
    // handleCurrentChange () {
    // let start
    // let end
    // if (this.val) {
    // start = (this.val - 1) * 8
    // end = this.val * 8
    // this.tableData1.slice(start, end)
    // } else {
    // this.tableData1.slice(0, 8)
    // }
    // }
  },
  mounted () {
    this.getYearMonth()
  }
  // updated () {
  // this.getYearMonth()
  // }
}
</script>

<style>
</style>
