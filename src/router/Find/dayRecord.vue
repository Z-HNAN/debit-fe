<template>
   <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 80%">
      <el-table-column
        label="日期"
        prop="date">
      </el-table-column>
      <el-table-column
        label="用于"
        prop="use">
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
            placeholder="请输入年-月-日"/>
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
  name: 'dayRecord',
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        sum: 100,
        use: '搓了一顿'
      }, {
        date: '2016-05-04',
        sum: 100,
        use: '买了本书'
      }, {
        date: '2016-05-01',
        sum: 100,
        use: '淘宝购物'
      }, {
        date: '2016-05-03',
        sum: 100,
        use: '充一卡通'
      },
      {
        date: '2016-05-03',
        sum: 100,
        use: '买点小零食'
      },
      {
        date: '2016-05-03',
        sum: 100,
        use: '游乐场一游'
      },
      {
        date: '2016-05-03',
        sum: 100,
        use: '买了???'
      },
      {
        date: '2016-05-03',
        sum: 100,
        use: '买吃的，买喝的'
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
  .el-table {
    margin: 20px auto;
    padding-left: 20px;
  }
  .el-button{
    margin-right: 30px;
  }

</style>
