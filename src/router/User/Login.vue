<template>
    <div class="loginContainer">
        <el-form :model="ruleForm" :rules="rules"
         status-icon
         ref="ruleForm"
         label-position="left"
         label-width="0px"
         class="demo-ruleForm loginPage">
            <h3 class="title">系统登陆</h3>
            <el-form-item prop="username">
                <el-input type="text"
                    v-model="ruleForm.username"
                    auto-complete="off"
                    placeholder="用户名"
                    prefix-icon="el-icon-s-custom"
                ></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password"
                    v-model="ruleForm.password"
                    auto-complete="off"
                    placeholder="密码"
                    show-password
                    prefix-icon="el-icon-key"
                ></el-input>
            </el-form-item>
            <el-checkbox v-model="checked" class="rememberme">记住密码</el-checkbox>
            <el-link @click="register">立即注册</el-link>
            <el-form-item style="width:100%;">
                <el-button type="primary" plain style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
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
        password: ''
      },
      rules: {
        username: [{required: true, message: '请输入你用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入你的密码', trigger: 'blur'}]
      },
      checked: false
    }
  },
  methods: {
    handleSubmit (event) {
      this.$ajax.post('/login', this.ruleForm)
        .then(res => {
          console.log(res)
          this.logining = false
          // 将用户名保存在浏览器内存中
          sessionStorage.setItem('user', this.ruleForm.username)
          /**
           * 将用户名信息在浏览器内存中,以JSON串形式
           */
          sessionStorage.setItem('loginInfo', JSON.stringify(res.data || {}))
          this.$router.push({path: '/'})
        }).catch(err => {
          console.log(err)
        })
    },
    register () {
      this.$router.push({path: '/register'})
    }
  }
}
</script>

<style scoped>
.loginContainer {
    width: 100%;
    height: 100%;
}
.loginPage {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 180px auto;
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
.el-link {
  margin-left: 200px;
}
</style>
