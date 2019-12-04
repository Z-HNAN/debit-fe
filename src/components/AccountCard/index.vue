<template>
  <div>
    <div class="root">
      <div class="icon">
         <span v-if='isShare === false'  class="fa fa-user fa-5x fa-fw" />
         <span v-if='isShare === true' class="fa fa-4x fa-users fa-fw" />
      </div>
      <div class="label">
        <span>{{account.name}}</span>
      </div>
      <div class="action">
        <el-button type="danger" @click='handleDelete'>删除</el-button>
        <el-button style="margin-right: 10px;" type="primary" @click="dialogFormVisible = true">添加</el-button>
        <el-dialog title="账户关联" :visible.sync="dialogFormVisible" width="450px">
          <el-form :model="form">
            <el-form-item label="关联用户名称" :label-width="formLabelWidth">
              <el-input v-model="form.nickName" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleAdd">确 定</el-button>
          </div>
        </el-dialog>
        <el-tooltip placement="top">
          <div slot="content">账户余额:{{account.moneyAmount}}元</div>
          <el-button type="primary" @click='handleDetail'>查看</el-button>
        </el-tooltip>
        <el-dialog title="账户信息" width="450px" :visible.sync="ulVisible">
          <ul>
            <li>账户名称:&nbsp; {{account.name}}</li>
            <li>创建时间:&nbsp; {{createDate}}</li>
            <li>账本的id:&nbsp; {{account.id}}</li>
            <li>账户余额:&nbsp; {{account.moneyAmount}}元</li>
          </ul>
          <div slot="footer" class="dialog-footer">
            <el-button @click="ulVisible = false">取 消</el-button>
            <el-button type="primary" @click="ulVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isShare', 'account'],
  data () {
    return {
      form: {
        nickName: ''
      },
      dialogFormVisible: false,
      ulVisible: false,
      formLabelWidth: '120px',
      createDate: ''
    }
  },
  methods: {
    /**
     * 触发删除，参数是该账户的id
     */
    handleDelete () {
      this.$emit('delete', this.account.id)
    },
    /**
     * 触发详情，参数是该账户的id
     */
    handleDetail () {
      this.ulVisible = true
      this.$emit('detail', this.account.id)
      this.createDate = this.getDate()
    },

    // 为一个账户添加关联人员
    handleAdd () {
      this.$emit('add', this.account.id, this.form.nickName)
      // console.log(this.form.userId)
      this.dialogFormVisible = false
    },

    // 转换时间戳
    getDate () {
      let date = new Date(this.account.createDate)
      // console.log(date)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() + ' '
      var h = date.getHours() + ':'
      var m = date.getMinutes() + ':'
      var s = date.getSeconds()
      return Y + M + D + h + m + s
    }

  }

}
</script>

<style scoped>
.root {
  display: flex;
  height: 100px;
  box-shadow: 0 0 10px #cac6c6;
  border-radius: 5px;
}

.icon {
  flex: 0 0 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px 0 0 5px;
}

.label {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 18px;
  padding-left: 10px;

}

.action {
  flex: 0 0 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 10px;
}

ul li {
  list-style: none;
  border: 1px solid lightgrey;
  width: 300px;
  height: 30px;
  line-height: 30px;
  margin-bottom: -1px;
  padding-left: 10px;
  color: #222;
}

ul li:hover {
  color: lightblue;
  background-color: #222;
}

</style>
