<template>
  <div>
    <h3>用工部门</h3>
    <!-- 功能模块开始 -->
    <el-row>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="部门名称">
          <el-input v-model="form.name" placeholder="招工单位名称"></el-input>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-input v-model="form.parentDepart" placeholder="上一级部门名称"></el-input>
        </el-form-item>
        <el-form-item label="负责人信息">
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
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAddDepartment">新建部门</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <!-- 功能模块结束 -->
    <!-- 展示模块 -->
    <el-table
      :data="showDepartments"
      stripe
      style="width: 100%">
      <el-table-column
        prop="name"
        label="部门名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="parentDepart"
        label="所属部门"
        width="180">
      </el-table-column>
      <el-table-column
        prop="manager.name"
        label="负责人"
        width="180"
        >
      </el-table-column>
      <el-table-column
        prop="manager.address"
        label="办公场所"
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
        :total="departments.length"
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
      <span>确认删除{{currentDepartment.name}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="handleConfirmRemove">确 定</el-button>
      </span>
    </el-dialog>
    
    <el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
      <el-form :model="currentDepartment">
        <el-form-item label="部门名称">
          <el-input v-model="currentDepartment.name"></el-input>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-input v-model="currentDepartment.parentDepart" placeholder="上一级部门名称"></el-input>
        </el-form-item>
        <el-form-item label="负责人信息">
          <el-select v-model="currentDepartment.managerId" placeholder="请选择">
            <el-option
              v-for="item in managers"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpdate">确 定</el-button>
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
      currentDepartment: {}, // 当前的department
      form: { // 表单内容
        name: '',
        parentDepart: '',
        managerId: ''
      }
    }
  },
  computed: {
    ...mapGetters(['getFullManagers', 'getDepartmentsAndManagers']),
    showDepartments () {
      let start = (this.currentPage - 1) * this.perPage
      let end = start + this.perPage >= this.departments.length ? this.departments.length : start + this.perPage
      return this.departments.slice(start, end)
    }
  },
  methods: {
    ...mapActions(['getManagers', 'getDepartments']),
    handleAddDepartment () { // 新建一个部门
      this.$ajax.post('/departments', {
        data: this.form
      }).then(res => {
        if (res.data.message === 'success') {
          this.$notify({ title: '成功', message: '新增成功', type: 'success' })
          this.getDepartments().then(res => {
            this.departments = this.getDepartmentsAndManagers()
          })
        } else {
          this.$notify({ title: res.status, message: '新增失败', type: 'error' })
        }
      })
    },
    getManagerByManagerId (row) { // 获取manager
      console.log(row.managerId)
      return this.managers.find(man => man.id === row.managerId)
    },
    handleCurrentChange (currentPage) { // 得到当前页面 假分页
      this.currentPage = currentPage
    },
    handleEdit (index, row) { // 编辑按钮
      this.currentDepartment = row
      this.dialogFormVisible = true
    },
    handleRemove (index, row) { // 删除按钮
      this.currentDepartment = row
      this.dialogVisible = true
    },
    handleConfirmRemove () { // 确认删除
      this.$ajax.delete('/departments/' + this.currentDepartment.id).then(res => {
        if (res.data.message === 'success') {
          this.$notify({ title: '成功', message: '删除成功', type: 'success' })
          this.getDepartments().then(res => {
            this.departments = this.getDepartmentsAndManagers()
            this.dialogVisible = false
          })
        } else {
          this.$notify({ title: res.status, message: '删除失败', type: 'error' })
        }
      })
    },
    submitUpdate () { // 确认更新
      this.$ajax.put('/departments/' + this.currentDepartment.id, {
        data: this.currentDepartment
      }).then(res => {
        if (res.data.message === 'success') {
          this.$notify({ title: '成功', message: '修改成功', type: 'success' })
          this.getDepartments().then(res => {
            this.departments = this.getDepartmentsAndManagers()
            this.dialogFormVisible = false
          })
        } else {
          this.$notify({ title: res.status, message: '修改失败', type: 'error' })
        }
      })
    }
  },
  async created () {
    await this.getDepartments().then(res => { this.departments = this.getDepartmentsAndManagers() })
    await this.getManagers().then(res => { this.managers = this.getFullManagers() })
    console.log(this.departments)
    /* 测试数据 */
    this.departments.push({
      id: 1,
      name: '宿舍楼',
      parentDepart: '后勤保障',
      manager: {
        name: '张大妈',
        address: '11号楼'
      }
    })
    this.departments.push({
      id: 2,
      name: '宿舍楼',
      parentDepart: '后勤保障',
      manager: {
        name: '王大爷',
        address: '10号楼'
      }
    })
    /* =================测试数据=============== */
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
