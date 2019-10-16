<template>
   <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width:80%">
      <el-table-column
        label="年份"
        prop="year">
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
    name:'yearRecord',
     data() {
          return {
            tableData: [{
              year: '2016',
              sum: 20000
            }, {
              year: '2016',
              sum: 20000
            }, {
              year: '2016',
              sum: 20000
            }, {
              year: '2016',
              sum: 20000
            },
            {
              year: '2016',
              sum: 20000
            },
            {
              year: '2016',
              sum: 20000
            },
            {
              year: '2016',
              sum: 20000
            },
            {
              year: '2016',
              sum: 20000
            }],
            search: ''
          }
        },
        methods: {
          handleDelete(index, row) {
            console.log(index, row);
          }
        }
  }
</script>

<style>
</style>
