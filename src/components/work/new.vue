<template>
  <div>
   <h3>岗位发布</h3>
   <el-tabs v-model="inputType" @tab-click="handleTabClick">
    <el-tab-pane label="手动录入" name="manual">
      <el-form ref="form" :model="form" label-width="80px">
        <el-divider content-position="left">岗位相关信息</el-divider>
        <el-form-item label="招工标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="用工部门">
          <el-tabs v-model="departmentType">
            <el-tab-pane label="从部门库中选择" name="trustDepartment">
              <el-select v-model="form.departmentId" placeholder="请选择">
                <el-option
                  v-for="item in departments"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                  <span style="float: left">{{ item.name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
                </el-option>
              </el-select>
            </el-tab-pane>
            <el-tab-pane label="临时用工部门" name="tempDepartment">
              <el-input v-model="form.department" placeholder="部门名称"></el-input>
            </el-tab-pane>
          </el-tabs>
        </el-form-item>
        
        <el-form-item label="长期用工">
          <el-switch v-model="form.isLongWork"></el-switch>
        </el-form-item>
        <el-form-item label="工作时间招工人数">
          <el-tabs  v-model="dateType">
            <el-tab-pane label="固定时间" name="time">
              <el-row v-for="(dateRange, index) in form.dateRangeList" :key="index">
                <el-col :span="12">
                  <el-date-picker
                    v-model="form.dateRangeList[index]"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="MM月dd日 HH:mm"
                    @change="handleTransformText(index, $event)">
                  </el-date-picker>
                </el-col>
                <el-col :span="4">
                   <el-input-number v-model="form.numList[index]" :min="1"  label="招工人数"></el-input-number>
                </el-col>
                <el-col :span="4" :offset="2"><el-button @click.prevent="removeDate(index)">删除</el-button></el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="非固定时间" name="text">
              <el-row v-for="(textDate, index) in form.textDateList" :key="index">
                <el-col :span="13"><el-input v-model="form.textDateList[index]"></el-input></el-col>
                 <el-col :span="4" :offset="1">
                   <el-input-number v-model="form.numList[index]" :min="1"  label="招工人数"></el-input-number>
                </el-col>
                <el-col :span="4" :offset="2"><el-button @click.prevent="removeDate(index)">删除</el-button></el-col>
              </el-row>
            </el-tab-pane>
            <el-button @click="addDate">新增时间</el-button>
          </el-tabs>
          
        </el-form-item>
        
        <el-form-item label="工作地点">
          <el-input v-model="form.position"></el-input>
        </el-form-item>
        <el-form-item label="工作类型">
          <el-radio-group v-model="form.workType">
            <el-radio label="0">助研型</el-radio>
            <el-radio label="1">助管型</el-radio>
            <el-radio label="2">助教型</el-radio>
            <el-radio label="3">助工型</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="工作内容">
          <el-input v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item label="工作要求">
          <el-input v-model="form.request"></el-input>
        </el-form-item>
        <el-form-item label="报名方式">
           <el-radio-group v-model="applyType">
            <el-radio label="online">线上报名</el-radio>
            <el-radio label="offline">线下报名</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="报名地点" v-if="applyType === 'offline'">
          <el-input v-model="form.applyPosition" placeholder="报名地点"></el-input>
        </el-form-item>
        <el-form-item label="签到地点">
          <el-input v-model="form.signPosition"></el-input>
        </el-form-item>
        <el-divider content-position="left">负责人相关信息</el-divider>
        <el-form-item label="负责人">
          <el-tabs v-model="managerType">
            <el-tab-pane label="从通讯录中选择" name="trustManager">
              <el-select v-model="form.managerId" placeholder="请选择">
                <el-option
                  v-for="item in managers"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                  <span style="float: left">{{ item.name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
                </el-option>
              </el-select>
            </el-tab-pane>
            <el-tab-pane label="临时联系人" name="tempManager">
              <el-col :span="4">
                <el-input v-model="form.manager.name" placeholder="姓名"></el-input>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-input v-model="form.manager.phone" placeholder="联系电话"></el-input>
              </el-col>
               <el-col :span="10" :offset="1">
                <el-input v-model="form.manager.email" placeholder="邮箱"></el-input>
              </el-col>
            </el-tab-pane>
          </el-tabs>
        </el-form-item>
       
        <el-form-item>
          <el-button type="primary" @click="confirePreview">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      
      <!-- 弹出框-->
      <el-dialog title="确认信息" :visible.sync="confireDialogVisible">
        <new-preview  v-if="confireDialogVisible" :form="form"></new-preview>
        <span slot="footer" class="dialog-footer">
          <el-button @click="confireDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
      </el-dialog>
            
    </el-tab-pane>
    <el-tab-pane label="Word导入" name="auto">
      Word导入， 我们正在疯狂殴打程序猿制作中
    </el-tab-pane>
  </el-tabs>
    
  </div>
</template>

<script>
import newPreview from './new/preview.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      inputType: 'manual', // 录入模式
      confireDialogVisible: false, // 弹出框
      dateType: 'time', // 时间类型 time/text
      managerType: 'trustManager', // 用工联系人类型
      departmentType: 'trustDepartment', // 用工部门类型
      applyType: 'online', // 报名类型 线上线下（online/offline）
      managers: [], // 用工老师信息
      departments: [], // 用工部门信息
      form: { // 录入信息
        status: 0, // 创建为0
        title: '', // 用工标题
        department: '', // 用工部门
        departmentId: '', // 用工部门id
        isLongWork: false, // 是否是长期用工
        dateRangeList: [[]], // 时间跨度
        textDateList: [''], // 文本时间
        position: '', // 工作地点
        numList: [1], // 招工总人数
        workType: '', // 工作类型
        content: '', // 工作内容
        request: '', // 工作要求
        applyPosition: '', // 报名地点 
        signPosition: '', // 签到地点
        managerId: '', // 管理人员id
        manager: { // 管理人员
          name: '', // 管理人员姓名
          phone: '', // 管理人员联系方式 
          email: '' // 管理人员邮箱 
        }
      }
    }
  },
  computed: {
    ...mapGetters(['getPublicManagers', 'getPublicDepartments'])
  },
  methods: {
    ...mapActions(['getManagers', 'getDepartments']),
    handleTabClick (tab, event) { // tab切换事件
      console.log(tab, event)
    },
    addDate () { // 增加一个日期
      this.form.textDateList.push('')
      this.form.dateRangeList.push([])
      this.form.numList.push(1)
    },
    removeDate (index) { // 移除一个日期
      this.form.textDateList.splice(index, 1)
      this.form.dateRangeList.splice(index, 1)
      this.form.numList.splice(index, 1)
    },
    handleTransformText (index, $event) { // 日期框转换成文字模式
      // console.log(index)
      // console.log(this.form.dateRangeList[index][0]) // 开始日期
      // console.log(this.form.dateRangeList[index][1]) // 结束日期
      this.form.textDateList[index] = this.form.dateRangeList[index][0] + ' 到 ' + this.form.dateRangeList[index][1]
    },
    confirePreview () { // 确认预览框
      /* 联系人相关 */
      if (this.managerType === 'trustManager') {
        // 固定联系人
        const currentManager = this.managers.find(man => man.id === this.form.managerId)
        this.form.showManagerName = currentManager.name 
        this.form.showManagerPhone = currentManager.phone 
      } else {
        // 临时联系人
        this.form.showManagerName = this.form.manager.name
        this.form.showManagerPhone = this.form.manager.phone
      }
      /* 报名方式相关 */
      if (this.applyType === 'online') {
        // 线上报名
        this.form.applyPosition = '线上报名'
      } else {
        // 线下报名
      }
      /* 关联用工部门 */
      if (this.form.departmentId !== -1) {
        this.form.department = this.departments.find(dept => dept.id === this.form.departmentId).name
      }
      /* 用工长期短期 */
      if (this.form.isLongWork === true) {
        // 长期用工
        this.form.isLongWork = 1
      } else {
        // 短期用工
        this.form.isLongWork = 0
      }
      // 打开预览框 
      this.confireDialogVisible = true
    },
    resetForm () {
      /* 数据初始化 */
      this.form.title = '' // 用工标题
      this.form.department = '' // 用工部门
      this.form.departmentId = '' // 用工部门id
      this.form.isLongWork = false // 是否是长期用工
      this.form.dateRangeList = [[]] // 时间跨度
      this.form.textDateList = [''] // 文本时间
      this.form.position = '' // 工作地点
      this.form.workType = '' // 工作类型
      this.form.numList = [1] // 招工总人数
      this.form.content = '' // 工作内容
      this.form.request = '' // 工作要求
      this.form.applyPosition = '' // 报名地点
      this.form.signPosition = '' // 签到地点
      this.form.managerId = '' // 管理人员id
      this.form.manager.name = '' // 管理人员姓名
      this.form.manager.phone = '' // 管理人员姓名
      this.form.manager.email = '' // 管理人员姓名
    },
    confirm (event) { // 确认事件
      console.log(event)
      // 关联显示数据
      if (this.managerType === 'tempManager') { this.form.managerId = -1 }
      if (this.departmentType === 'tempDepartment') { this.form.departmentId = -1 }
      this.$ajax.post('/works', {
        type: {
          managerType: this.managerType === 'trustManager' ? 1 : 0, // 用工联系人类型 trustManager/tempManager
          departmentType: this.departmentType === 'trustDepartment' ? 1 : 0, // 用工部门类型 trustDepartment/tempManager
          applyType: this.applyType === 'online' ? 1 : 0 // 报名方式 online/offline
        },
        data: this.form
      }).then(res => {
        console.log(res)
        if (res.data.message === 'success') { // 添加成功
          this.resetForm()
          this.confireDialogVisible = false
          this.$notify({
            title: '成功',
            message: '发布信息成功，等待审核信息中',
            type: 'success'
          })
        } else {
          this.$notify({
            title: res.status,
            message: '系统发生内部错误，请稍后尝试或联系管理员',
            type: 'error'
          })
        }
      })
    }
    
  },
  components: {
    newPreview
  },
  created () {
    this.getManagers().then(res => { this.managers = this.getPublicManagers() })
    this.getDepartments().then(res => { this.departments = this.getPublicDepartments() })
  }
}
</script>

<style>
</style>
