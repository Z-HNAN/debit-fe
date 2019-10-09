<template>
  <div>
    <h3>岗位列表</h3>
    <el-row>
      <el-form :inline="true" :model="query" class="demo-form-inline">
        <el-form-item label="审批人">
          <el-input v-model="query.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="发布日期">
          <el-date-picker
            v-model="query.spaceDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="长期招工">
          <el-switch v-model="query.isLongWork"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-table
        ref="filterTable"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="createDate"
          label="创建日期"
          sortable
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="manager.name"
          label="联系人"
          width="100"
          >
        </el-table-column>
        <el-table-column
          prop="title"
          label="招工标题"
          >
        </el-table-column>
        <el-table-column
          prop=""
          label="招工进度"
          width="100"
          >
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>已报名人数: {{scope.row.currentNum}}</p>
              <p>需求人数: {{scope.row.totalNum}}</p>
              <div slot="reference" class="name-wrapper">
                <el-progress type="circle" :percentage="showFormatterProgress(scope.row).percent"
                 :color="showFormatterProgress(scope.row).color" :width="45"></el-progress>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="标签"
          >
          <template slot-scope="scope">
            <el-tag class="work-type-tag" size="small" 
              :type="showWorkTypeTagRule(scope.row.workType).type"
              disable-transitions v-text="showWorkTypeTagRule(scope.row.workType).data"></el-tag>
            <el-tag class="long-work-tag" size="small" 
              :type="showLongWorkTagRule(scope.row.isLongWork).type"
              disable-transitions v-text="showLongWorkTagRule(scope.row.isLongWork).data"></el-tag>
            <el-tag class="apply-type-tag" size="small" 
              :type="showApplyTypeTagRule(scope.row.applyPosition).type"
              disable-transitions v-text="showApplyTypeTagRule(scope.row.applyPosition).data"></el-tag>
            <el-tag class="apply-type-tag" size="small" 
              :type="showWorkStatusTagRule(scope.row.status).type"
              disable-transitions v-text="showWorkStatusTagRule(scope.row.status).data"></el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalPage"
        :page-size="perPage"
        @current-change="handleCurrentChange"
        >
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      query: {
        user: '', // 审批人
        spaceDate: '' // 间隔时间
      },
      tableData: [], // 表格数据
      totalPage: 0, // 总页数
      perPage: 8 // 每页条数
    }
  },
  computed: {},
  methods: {
    handleQuery () { // 处理查询
    
    },
    formatter (row, column) {
      return row.address
    },
    showWorkTypeTagRule (tagValue) { // tag转换规则 workType
      switch (tagValue) {
        case 0:
          return {data: '助研', type: ''}
        case 1:
          return {data: '助管', type: 'success'}
        case 2:
          return {data: '助教', type: 'warning'}
        case 3:
          return {data: '助工', type: 'danger'}
        default:
          return {data: '', type: 'info'}
      }
    },
    showLongWorkTagRule (tagValue) { // tag转换规则 longWork
      switch (tagValue) {
        case 0:
          return {data: '短期', type: ''}
        case 1:
          return {data: '长期', type: 'success'}
        default:
          return {data: '', type: 'info'}
      }
    },
    showApplyTypeTagRule (tagValue) { // tag转换规则 applyType
      switch (tagValue) {
        case '线上报名': // 1 线上报名
          return {data: '线上', type: 'success'}
        default: // 0 线下报名
          return {data: '线下', type: 'warning'}
      }
    },
    showWorkStatusTagRule (tagValue) { // tag转换规则 status
      switch (tagValue) {
        case 0:
          return {data: '待审核', type: 'info'}
        case 1:
          return {data: '招工中', type: ''}
        case 2:
          return {data: '已完成', type: 'success'}
        case 3:
          return {data: '已结束', type: 'warning'}
        case 4:
          return {data: '审核拒绝', type: 'danger'}
        default:
          return {data: '', type: 'info'}
      }
    },
    showFormatterProgress (row) {
      let percent = parseInt((row.currentNum / row.totalNum) * 100)
      let color = '#f56c6c'
      if (percent <= 25) {
        color = '#f56c6c'
      } else if (percent <= 50) {
        color = '#409eff'
      } else if (percent <= 75) {
        color = '#aa96d5'
      } else {
        color = '#67c23a'
      }
      return {
        percent,
        color
      }
    },
    handleEdit (index, row) { // 查看详情
      this.$router.push({ name: 'work.detail', params: { work_id: row.id } }) // 编程式路由
    },
    /* 分页相关 */
    handleCurrentChange (currentPage) {
      // console.log(currentPage)
      /* 获取分页数据 */
      this.$ajax.get('/works?page=' + currentPage + '&per_page=' + this.perPage + '').then(res => {
        this.tableData = res.data
      })
    }
  },
  created () {
    /* 获取数量 */
    this.$ajax.get('/works/count').then(res => {
      // Math.ceil(res.data.count / this.perPage) 页数，组件已经完成
      this.totalPage = res.data.count
    })
    /* 默认获取数据 */
    this.$ajax.get('/works?page=1&per_page=8').then(res => {
      this.tableData = res.data
    })
  }
}
</script>

<style>
.pagination{
  float: right;
  margin-top: 20px;
  margin-right: 20px;
}
</style>
