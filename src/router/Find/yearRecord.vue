<template>
   <el-table
      :data="tableData1.slice((currentPage-1) * 8, currentPage * 8)
      .filter(data => !search || data.year.toLowerCase().includes(search.toLowerCase()))"
      style="width:80%">
      <el-table-column
        label="年份"
        prop="year">
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
            placeholder="请输入年份"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"><i class="fa fa-trash-o"></i>&nbsp;删除</el-button>
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
export default {
  name: 'yearRecord',
  props: ['billData', 'currentPage'],
  data () {
    return {
      tableData1: [],
      search: ''
    }
  },
  methods: {
    handleDelete (index) {
      this.tableData1.splice(index, 1)
    },
    // 将消费记录按照年份划分
    getYear () {
      let year = this.billData.reduce((prev, item) => {
        let splitDate = item.date.split('-')
        let date = splitDate[0]
        if (date in prev) {
          prev[date].push(item) // 按照相同年分组
        } else {
          prev[date] = [item]
        }
        return prev
      }, {})
      // console.log(yearMonth)
      for (var k in year) {
        let incomeSum = 0
        let paySum = 0
        let obj = {} // 存放month paySum incomeSum
        year[k].forEach(item => {
          if (item.isIncome === true) {
            incomeSum += item.amount
          } else {
            paySum += item.amount
          }
        })
        // console.log(incomeSum, paySum)
        obj.year = k
        obj.incomeSum = incomeSum
        obj.paySum = paySum
        // console.log(obj)
        this.tableData1.push(obj)
      }
    }
  },
  mounted () {
    this.getYear()
  }
}
</script>

<style>
</style>
