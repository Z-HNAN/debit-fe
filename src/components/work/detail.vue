<template>
  <div>
    <el-row class="nav">
      <el-col :span="6" ><el-button @click="handleBackList" type="primary" icon="el-icon-back" round>返回岗位列表</el-button></el-col>
      <el-col :span="6" :offset="2"><h2>岗位详情</h2></el-col>
    </el-row>
    
    <el-row class="work-box" >
      <el-col class="work-basic" :span="7" :offset="1">
        <div class="work-info box-item">
          <span class="title">用工部门：</span>
          <span class="content" v-text="work.department"></span>
        </div>
        <div class="work-info box-item">
          <span class="title">用工联系人：</span>
          <el-popover trigger="hover" placement="top">
            <p>联系电话: {{work.manager.phone}}</p>
            <p>联系邮箱: {{work.manager.email}}</p>
            <el-link :underline="false" type="primary" slot="reference"><span class="content">{{work.manager.name}}</span></el-link>
          </el-popover>
        </div>
        <div class="work-info box-item date-item">
          <el-col :span="8"><span class="title">用工时间：</span></el-col>
          <el-col :span="24">
            <span class="content" v-for="(textDate, index) in work.textDateList" :key="index">{{textDate + ' ' + work.numList[index] + '人'}}</span>
          </el-col>
        </div>
      </el-col>
      <el-col class="work-tag work-info" :span="7" :offset="1">
        <div class="tag-box">
          <div class="tag-item">
            <span class="title">用工类型：</span>
            <span class="content">
              <el-tag class="apply-type-tag" size="small" 
                :type="showWorkTypeTagRule(work.workType).type"
                disable-transitions v-text="showWorkTypeTagRule(work.workType).data"
                ></el-tag>
            </span>
          </div>
          <div class="tag-item">
            <span class="title">用工时长：</span>
            <span class="content">
              <el-tag class="apply-type-tag" size="small" 
                :type="showLongWorkTagRule(work.isLongWork).type"
                disable-transitions v-text="showLongWorkTagRule(work.isLongWork).data"
                ></el-tag>
            </span>
          </div>
          <div class="tag-item">
            <span class="title">报名方式：</span>
            <span class="content">
              <el-tag class="apply-type-tag" size="small" 
                :type="showApplyTypeTagRule(work.applyPosition).type"
                disable-transitions v-text="showApplyTypeTagRule(work.applyPosition).data"
                ></el-tag>
            </span>
          </div>
          <div class="tag-item">
            <span class="title">岗位状态：</span>
            <span class="content">
              <el-tag class="apply-type-tag" size="small" 
                :type="showWorkStatusTagRule(work.status).type"
                disable-transitions v-text="showWorkStatusTagRule(work.status).data"
                ></el-tag>
            </span>
          </div>
        </div>
      </el-col>
      <el-col class="work-graph" :span="8">
        <div class="graph-box">
          <el-progress type="circle" :percentage="showFormatterProgress().percent"
           :color="showFormatterProgress().color" status="text" :width="180"
           >{{work.currentNum + '/' + work.totalNum}}</el-progress>
        </div>
        <!-- <el-button class="edit-btn" type="primary" icon="el-icon-edit">修改该岗位</el-button> -->
        <el-button class="delete-btn" type="danger" icon="el-icon-delete" @click="dialogVisible = true">删除该岗位</el-button>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row class="work-detail">
      <h3>岗位信息</h3>
      <el-button v-if="isEdit === false" icon="el-icon-edit" size="medium" circle @click="isEdit = true"></el-button>
      <el-button v-if="isEdit === true" type="success" icon="el-icon-check" size="medium" circle @click="handleUpdate"></el-button>
      <el-col :span="23" :offset="1">
        <div class="work-info detail-item">
          <el-col :span="4"><span class="title">招工标题：</span></el-col>
          <el-col v-if="isEdit === false" :span="20" :pull="1"><span class="content" v-text="work.title"></span></el-col>
          <el-col v-else :span="20" :pull="1"><el-input v-model="work.title" autosize ></el-input></el-col>
        </div>
         <div class="work-info detail-item">
          <el-col :span="4"><span class="title">报名地点：</span></el-col>
          <el-col v-if="isEdit === false" :span="20" :pull="1"><span class="content" v-text="work.applyPosition"></span></el-col>
          <el-col v-else :span="20" :pull="1">
            <el-input v-model="work.applyPosition" autosize  @change="handleApplyPositionChange">
              <el-popover
                placement="top-start"
                title="报名地点"
                width="200"
                trigger="hover"
                slot="append"
                content="除了填写'线上报名',其余所有内容均会判定为线下报名的方式">
                <el-button slot="reference" icon="el-icon-question"><el-button slot="append"></el-button></el-button>
              </el-popover>
            </el-input>
          </el-col>
        </div>
        <div class="work-info detail-item">
          <el-col :span="4"><span class="title">签到地点：</span></el-col>
          <el-col v-if="isEdit === false" :span="20" :pull="1"><span class="content" v-text="work.signPosition"></span></el-col>
          <el-col v-else :span="20" :pull="1"><el-input v-model="work.signPosition" autosize ></el-input></el-col>
        </div>
        <div class="work-info detail-item">
          <el-col :span="4"><span class="title">工作地点：</span></el-col>
          <el-col v-if="isEdit === false" :span="20" :pull="1"><span class="content" v-text="work.position"></span></el-col>
          <el-col v-else :span="20" :pull="1"><el-input v-model="work.position" autosize ></el-input></el-col>
        </div>
        <div class="work-info detail-item">
          <el-col :span="4"><span class="title">工作内容：</span></el-col>
          <el-col v-if="isEdit === false" :span="20" :pull="1"><span class="content" v-text="work.content"></span></el-col>
          <el-col v-else :span="20" :pull="1"><el-input v-model="work.content" autosize ></el-input></el-col>
        </div>
        <div class="work-info detail-item">
          <el-col :span="4"><span class="title">工作要求：</span></el-col>
          <el-col v-if="isEdit === false" :span="20" :pull="1"><span class="content" v-text="work.request"></span></el-col>
          <el-col v-else :span="20" :pull="1"><el-input v-model="work.request" autosize ></el-input></el-col>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row class="date-list-box">
      <h3>报名信息</h3><el-button type="primary" size="medium" icon="el-icon-document" plain @click="handleExport">导出报表</el-button>
      <el-collapse v-model="activeDateListIndex" @change="handleApplyStudent">
        <el-collapse-item v-for="(textDate, index) in work.textDateList" :key="index" :title="textDate + '  报名情况'" :name="index">
          <el-table
            :data="applyStudentList[index]"
            stripe
            style="width: 100%">
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="schoolId"
              label="学号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="college"
              label="学院"
              >
            </el-table-column>
            <el-table-column
              prop="phone"
              label="联系电话">
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </el-row>
    
    <el-row class="work-step">
      <el-steps :active="showWorkStep" align-center finish-status="success">
        <el-step title="发布" description="部门发布用工消息"></el-step>
        <el-step title="审核" description="工作人员审核校验信息/该审核未通过"></el-step>
        <el-step title="招工" description="正在进行义工的招募"></el-step>
        <el-step title="结束" description="招工结束"></el-step>
      </el-steps>
    </el-row>
    
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <span>确认删除这条招工信息吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="handleConfirmRemove">确 定</el-button>
      </span>
    </el-dialog>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeDateListIndex: ['0'],
      applyStudentList: [], // [[{},{}], [{},{}]],
      dialogVisible: false, // 删除框
      isEdit: false, // 修改岗位信息
      work: {
        manager: {}
      }
    }
  },
  computed: {
    showWorkStep () { // 招工进度条
      switch (this.work.status) { // 工作状态（待审核0/审核通过-招工中1/招工完成2/招工结束3/审核拒绝4）
        case 0: // 待审核
          return 1
        case 1: // 招工中
          return 2
        case 2: // 已完成
          return 3
        case 3: // 招工结束
          return 4
        case 4: // 已拒绝
          return 1
        default:
          return 1
      }
    }
  },
  methods: {
    handleBackList () { // 返回列表页
      this.$router.go(-1)
    },
    handleConfirmRemove () { // 确认删除
      this.$ajax.delete('/departments/' + this.work.id).then(res => {
        if (res.data.message === 'success') {
          this.$notify({ title: '成功', message: '删除成功', type: 'success' })
          this.handleBackList() // 转去列表页
        } else {
          this.$notify({ title: res.status, message: '删除失败', type: 'error' })
        }
      })
    },
    handleApplyStudent () { // 异步加载 报名学生数据 二维数组中放数据
      console.log('come')
      if (this.applyStudentList.length !== 0) return // 已经是获取过数据了
      console.log('get')
      let workId = this.$route.params.work_id
      this.$ajax.get('works/' + workId + '/apply_students').then(res => {
        this.applyStudentList = res.data // 应该为此工作关联的学生信息
      })
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
      switch (tagValue) { // 工作状态（待审核0/审核通过-招工中1/招工完成2/招工结束3/审核拒绝4）
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
    showFormatterProgress () { // 展示进度条
      let percent = parseInt((this.work.currentNum / this.work.totalNum) * 100)
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
      if (Number.isNaN(percent)) { return {} } // 避免渲染不到数据报错
      return {
        percent,
        color
      }
    },
    handleUpdate () { // 岗位更新
      this.isEdit = false
      // 发送请求 更新数据
      this.$ajax.put('works/' + this.work.id, this.work).then(res => {
        if (res.data.message === 'success') {
          this.$notify({ title: '成功', message: '修改成功', type: 'success' })
          this.getManagers().then(res => {
            this.managers = this.getFullManagers()
            this.dialogFormVisible = false
            this.initCurrentManager()
          })
        } else {
          this.$notify({ title: res.status, message: '修改失败', type: 'error' })
        }
      })
    },
    handleApplyPositionChange (value) { // 报名地点发生
      value = value.trim()
      if (value === '线上报名') {
        this.work.applyPosition = '线上报名'
      } else {
        this.work.applyPosition = value
      }
    },
    handleExport () { // 到处报表
      
    }
  },
  beforeCreate () {
    let workId = this.$route.params.work_id
    this.$ajax.get('works/' + workId).then(res => {
      this.work = res.data
    })
  }
}
</script>
<style scoped>
.nav .el-button{
  margin: 15px 0;
}
.work-box{
  /* margin-top: 30px; */
}
.box-item{
  margin: 15px 0;
}
.work-info .title{
  font-size: 18px;
}
.work-info{
  font-size: 18px;
  color: #606266;
}
.work-info .title{
  line-height: 40px;
  color: #303133;
}
.work-info .content{
  height: 30px;
  font-size: 16px;
}
.box-item.date-item .content{
  display: inline-block;
}
.tag-box{
  margin-top: 40px;
}
.tag-item{
  margin: 15px;
}
.work-graph .graph-box{
}
.work-graph .delete-btn{
  margin-left: 24px;
  margin-top: 20px;
}
.work-detail{
  margin: 20px 0;
}
.work-detail h3{
  display: inline-block;
  margin-right: 20px;
}
.work-detail .detail-item{
  margin: 14px 0;
}
.detail-item .content{
  line-height: 40px;
}
.date-list-box h3{
  display: inline-block;
  margin-right: 20px;
}
.work-step{
  margin-top: 20px;
}
</style>
