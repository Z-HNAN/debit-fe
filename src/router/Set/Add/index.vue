<template>
  <div class="main">
    <h1>记一笔帐</h1>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="添入账本">
          <AccountSelect @getAccount="selectAccount"/>
      </el-form-item>
      <el-form-item label="账目名称">
          <el-input v-model="form.name" placeholder="请输添加账目名称"></el-input>
      </el-form-item>
      <el-form-item label="记账类型" class="myRadio">
          <el-col :span="12">
            <el-select v-model="form.type" placeholder="记账类型">
              <el-option
                v-for="item in billTypes"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-tooltip class="item" effect="dark" content="账户类型太少？创建一个？" placement="right">
              <el-button @click="dialogFormVisible = true">添加记账类型</el-button>
            </el-tooltip>
          </el-col>
      </el-form-item>
      <el-dialog title="添加账户类型" :visible.sync="dialogFormVisible" width="500px">
        <el-form :model="form2" style="width: 400px;">
          <el-form-item label="用户id">
            <el-input v-model.number="form2.accountId" autocomplete="off" placeholder="请输入用户id"></el-input>
          </el-form-item>
          <el-form-item label="账户类型">
            <el-input v-model="form2.name" autocomplete="off" placeholder="请输入记账类型名称"></el-input>
          </el-form-item>
          <el-form-item class="myRadio" label="是否收入">
            <el-radio-group v-model="form2.isIncome">
              <el-radio label="false">支出</el-radio>
              <el-radio label="true">收入</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addBillType">确 定</el-button>
        </div>
      </el-dialog>
      <el-form-item label="金额大小">
          <el-input v-model.number="form.amount"></el-input>
      </el-form-item>
      <el-form-item label="消费备注">
        <el-input type="textarea" v-model="form.remark"></el-input>
      </el-form-item>
      <el-form-item class="myRadio" label="消费类型">
        <el-radio-group v-model="form.isIncome">
          <el-radio label="false">支出</el-radio>
          <el-radio label="true">收入</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import AccountSelect from '@/components/AccountSelect/index.vue'
import getLoginInfo from '@/utils/getLoginInfo.js'
export default {
  data () {
    return {
      billTypes: [],
      form: {
        userId: '',
        amount: '',
        type: '',
        isIncome: '',
        date: '',
        name: '',
        remark: '',
        accountId: ''
      },
      form2: {
        accountId: '',
        name: '',
        isIncome: ''
      },
      dialogFormVisible: false,
      formWidth: '120px'
    }
  },
  components: {
    AccountSelect
  },
  methods: {
    selectAccount (id) {
      this.form.userId = id
    },
    onSubmit () {
      // 获取用户id
      this.form.accountId = getLoginInfo().id
      // 添加创建账目时间
      this.form.date = new Date().getTime()
      // console.log(this.form)
      this.$ajax.post('/bills', this.form)
        .then(res => {
          // console.log(res.data)
          this.$alert('创建成功！！！', '提示', {
            confirmButtonText: 'ok'
          })
          // 清空表单中输入的数据
          this.form.amount = ''
          this.form.type = ''
          this.form.isIncome = ''
          this.form.name = ''
          this.form.remark = ''
        })
        .catch(err => {
          console.log(err)
        })
    },
    addBillType () {
      this.dialogFormVisible = false
      // console.log(this.form2)
      this.$ajax.post('/billTypes', this.form2)
        .then(res => {
          // console.log(res.data)
          this.$alert('创建成功！！！', '提示', {
            confirmButtonText: 'ok'
          })
          this.form2.accountId = ''
          this.form2.name = ''
          this.form2.isIncome = ''
        })
        .catch(err => {
          console.log(err)
        })
        .then(() => {
          // 添加账户类型后再次请求billTypes刷新数据
          this.$ajax.get('/billTypes')
            .then(res => {
              this.billTypes = res.data
              // console.log(res.data)
            })
            .catch(err => {
              console.log(err)
            })
        })
    }
  },
  mounted () {
    this.$ajax.get('/billTypes')
      .then(res => {
        this.billTypes = res.data
        // console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    this.form.accountId = getLoginInfo().id
  }
}
</script>

<style scoped>
  .el-form {
    width: 700px;
    border: 1px solid #eaeaea;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 30px 30px 20px 20px;
    margin: 20px auto;
  }

  .myRadio {
    text-align: left;
  }
</style>
