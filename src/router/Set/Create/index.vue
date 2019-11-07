<template>
  <div class="main">
    <h1>创建一个账户</h1>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="账单名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="账户金额">
          <el-input v-model.number="form.moneyAmount"></el-input>
      </el-form-item>
      <el-form-item class="myRadio" label="是否共享">
        <el-radio-group v-model="form.isShare">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
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
import getLoginInfo from '@/utils/getLoginInfo.js'
export default {
  data () {
    return {
      form: {
        name: '',
        accountId: '',
        moneyAmount: '',
        isShare: ''
      }
    }
  },
  methods: {
    onSubmit () {
      // 获取当前创建账单的创建时间
      const createDate = new Date().getTime()
      this.form.createDate = createDate
      // 获取用户id
      this.form.accountId = getLoginInfo().id
      // console.log(createDate)
      // console.log(this.form)
      this.$ajax.post('/users', this.form)
        .then(res => {
          // console.log(res.data)
          this.$alert('创建成功！！！', '提示', {
            confirmButtonText: 'ok'
          })
          // 清空表单中输入的数据
          this.form.name = ''
          this.form.accountId = ''
          this.form.moneyAmount = ''
          this.form.isShare = ''
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
  .el-form {
    width: 600px;
    border: 1px solid #eaeaea;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 30px 30px 20px 20px;
    margin: 20px auto;
  }

  .myRadio {
    text-align: left;
  }
</style>
