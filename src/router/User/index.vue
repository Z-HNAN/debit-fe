<template>
  <div class="loginContainer">
      <el-form :model="ruleForm" :rules="rules"
       status-icon
       ref="ruleForm"
       label-position="left"
       label-width="0px"
       class="demo-ruleForm loginPage">
          <h3 class="title">用户信息设置</h3>
          <el-form-item prop="username">
              <el-input type="text"
                  v-model="ruleForm.username"
                  auto-complete="off"
                  placeholder="请输入你要修改的用户名"
                  prefix-icon="el-icon-s-custom"
              ></el-input>
          </el-form-item>
          <el-form-item prop="password">
              <el-input type="password"
                  v-model="ruleForm.password"
                  auto-complete="off"
                  placeholder="请输入你要修改的密码"
                  show-password
                  prefix-icon="el-icon-key"
              ></el-input>
          </el-form-item>
          <el-form-item prop="nickname">
              <el-input type="text"
                  v-model="ruleForm.nickname"
                  auto-complete="off"
                  placeholder="请输入你要修改的昵称"
                  show-password
                  prefix-icon="el-icon-user-solid"
              ></el-input>
          </el-form-item>
          <el-form-item style="width:100%;">
              <el-button type="primary"  style="width:100%;" @click.native="handleSubmit" :loading="logining">修改</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      logining: false,
      ruleForm: {
        username: '',
        password: '',
        nickname: ''
      },
      rules: {
        username: [{required: true, message: '请输入要修改用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入要修改的密码', trigger: 'blur'}]
      }
    }
  },
  methods: {
    handleSubmit (event) {
      this.$confirm('确认修改?', '提示', {})
        .then(() => {
          sessionStorage.setItem('user', this.ruleForm.username)
          this.$router.push({path: '/'})
        })
        .catch(() => { })
    }
  }
} 
</script>

<style scoped>
.loginContainer {
  width: 100%;
}
.loginPage {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 20px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
}
</style>
