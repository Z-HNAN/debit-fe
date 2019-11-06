<template>
  <div>
    <!-- 我是样例菜单 -->
    <el-menu default-active="/user" class="el-menu-demo tab-page" mode="horizontal" router>
      <el-menu-item index="/user">个人中心</el-menu-item>
    </el-menu>

    <div class="app-header-userinfo">
      <el-dropdown trigger="hover" :hide-on-click="false">
        <span class="el-dropdown-link">
          {{ username }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexContainer',
  data () {
    return {
      username: '游客'
    }
  }, 
  methods: {
    logout: function () {
      this.$confirm('确认退出?', '提示', {})
        .then(() => {
          sessionStorage.removeItem('user')
          this.$router.push('/login')
        })
        .catch(() => { })
    }

  },
  mounted: function () {
    let user = sessionStorage.getItem('user')
    if (user) {
      this.username = user
    }
  }
}
</script>

<style>
.app-header-userinfo {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 25px;
  display: flex;
  flex-flow: row nowrap;
  height: 80px;
  justify-content: flex-start;
  align-items: center;
}
</style>
