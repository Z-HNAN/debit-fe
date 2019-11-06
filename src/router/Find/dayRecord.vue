<template>
   <el-table
      :data="billData.slice((currentPage-1) * 8, currentPage * 8)
      .filter(data => !search || data.date.toLowerCase().includes(search.toLowerCase()))"
      style="width: 80%">
      <el-table-column
        label="日期"
        prop="date">
      </el-table-column>
      <el-table-column
        label="备注"
        prop="remark">
      </el-table-column>
      <el-table-column
        label="金额"
        prop="amount">
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
  props: ['billData', 'currentPage'],
  data () {
    return {
      search: ''
    }
  },
  methods: {
    // 删除消费记录
    handleDelete (index, row) {
      // 获取消费记录id
      let id = row.id
      this.$emit('delete', index, id)
    }
  }
}
</script>

<style>
  .el-table {
    margin: 5px auto;
    padding-left: 20px;
  }
  .el-button{
    margin-right: 30px;
  }

</style>
