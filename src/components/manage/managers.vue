<template>
  <div>
    <el-row>
      <el-col span="4" ><h3>用工联系人</h3></el-col>
      <el-col span="4" offset="14"><el-button class="add-btn" type="primary" @click="handleAddDepartment">新建用工联系人</el-button></el-col>
    </el-row>
    <!-- 展示模块 -->
    <el-table
      :data="showManagers"
      stripe
      style="width: 100%">
      <el-table-column
        prop="name"
        label="联系人姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="department"
        label="所在部门"
        width="150">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系电话"
        width="130">
      </el-table-column>
      <el-table-column
        prop="email"
        label="电子邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="办公地点"
        >
      </el-table-column>
      <el-table-column
        label="操作"
        >
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="small" circle @click="handleEdit(scope.$index, scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" circle @click="handleRemove(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 展示模块结束 -->
    
    <!-- 分页部分-->
    <el-row class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="managers.length"
        :page-size="perPage"
        @current-change="handleCurrentChange"
        >
      </el-pagination>
    </el-row>
    
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <span>确认删除{{currentManager.name}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="handleConfirmRemove">确 定</el-button>
      </span>
    </el-dialog>
    
    <el-dialog title="新增/编辑信息" :visible.sync="dialogFormVisible">
      <el-form :model="currentManager">
        <el-form-item label="联系人名称">
          <el-input v-model="currentManager.name"></el-input>
        </el-form-item>
        <el-form-item label="所负责部门">
          <el-select v-model="currentManager.department" placeholder="请选择">
            <el-option
              v-for="item in departments"
              :key="item.id"
              :label="item.name"
              :value="item.name">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="currentManager.phone"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="currentManager.email"></el-input>
        </el-form-item>
        <el-form-item label="办公地点">
          <el-input v-model="currentManager.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      departments: [], // 所有的部门信息
      managers: [], // 所有人联系人信息
      dialogVisible: false, // 删除确认框
      dialogFormVisible: false, // 修改确认框
      perPage: 8, // 每页的内容
      currentPage: 1, // 当前页面
      currentManager: { // 表单内容
        id: '',
        name: '',
        department: '',
        phone: '',
        email: '',
        address: ''
      }
    }
  },
  computed: {
    ...mapGetters(['getFullManagers', 'getFullDepartments']),
    showManagers () {
      let start = (this.currentPage - 1) * this.perPage
      let end = start + this.perPage >= this.managers.length ? this.managers.length : start + this.perPage
      return this.managers.slice(start, end)
    }
  },
  watch: {},
  methods: {
    ...mapActions(['getManagers', 'getDepartments']),
    handleAddDepartment () { // 新建一个部门
      this.initCurrentManager()
      this.dialogFormVisible = true
    },
    handleCurrentChange (currentPage) { // 得到当前页面 假分页
      this.currentPage = currentPage
    },
    getManagerByManagerId (row) { // 获取manager
      console.log(row.managerId)
      return this.managers.find(man => man.id === row.managerId)
    },
    handleEdit (index, row) { // 编辑按钮
      this.currentManager = row
      this.dialogFormVisible = true
    },
    handleRemove (index, row) { // 删除按钮
      this.currentManager = row
      this.dialogVisible = true
    },
    handleConfirmRemove () { // 确认删除
      this.$ajax.delete('/managers/' + this.currentManager.id).then(res => {
        if (res.data.message === 'success') {
          this.$notify({ title: '成功', message: '删除成功', type: 'success' })
          this.getManagers().then(res => {
            this.managers = this.getFullManagers()
            this.dialogVisible = false
          })
        } else {
          this.$notify({ title: res.status, message: '删除失败', type: 'error' })
        }
      })
    },
    submitEdit () { // 确认修改
      if (this.currentManager.id) {
        // 修改
        this.$ajax.put('/managers/' + this.currentManager.id, this.currentManager).then(res => {
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
      } else {
        // 新增
        this.$ajax.post('/managers', {
          data: this.currentManager
        }).then(res => {
          if (res.data.message === 'success') {
            this.$notify({ title: '成功', message: '新增成功', type: 'success' })
            this.getManagers().then(res => {
              this.managers = this.getFullManagers()
              this.dialogFormVisible = false
              this.initCurrentManager()
            })
          } else {
            this.$notify({ title: res.status, message: '新增失败', type: 'error' })
          }
        })
      }
    },
    initCurrentManager () {
      this.currentManager = { // 表单内容
        id: '',
        name: '',
        department: '',
        phone: '',
        email: '',
        address: ''
      }
    }
  },
  created () {
    this.getDepartments().then(res => { this.departments = this.getFullDepartments() })
    this.getManagers().then(res => { this.managers = this.getFullManagers() })
    console.log(this.managers)
  }
}
</script>

<style>
.pagination{
  float: right;
  margin-top: 20px;
  margin-right: 20px;
}

.add-btn{
  margin-top: 10px;
}
</style>
