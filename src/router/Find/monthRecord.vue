<template>
   <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 80%">
      <el-table-column
        label="月份"
        prop="month">
      </el-table-column>
      <el-table-column
        label="金额"
        prop="sum">
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
            @click="handleDelete(scope.$index, scope.row)"><i class="fa fa-trash-o"></i>&nbsp;删除</el-button>
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
export default {
  name: 'monthRecord',
  data () {
    return {
      tableData: [{
        month: '2016-05',
        sum: 2000
      }, {
        month: '2016-06',
        sum: 2000
      }, {
        month: '2016-07',
        sum: 2000
      }, {
        month: '2016-08',
        sum: 2000
      },
      {
        month: '2016-05',
        sum: 2000
      },
      {
        month: '2016-05',
        sum: 2000
      },
      {
        month: '2016-05',
        sum: 2000
      },
      {
        month: '2016-05',
        sum: 2000
      }],
      search: ''
    }
  },
  methods: {
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style>
</style>
