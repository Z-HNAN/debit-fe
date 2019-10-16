<template>
  <div>
    <!-- 我是样例菜单 -->
    <el-menu default-active="1" class="el-menu-demo tab-page" mode="horizontal" @select="handleSelect"
      active-text-color="#409EFF">
      <el-menu-item index="1">当前信息</el-menu-item>
      <el-menu-item index="/user">个人中心</el-menu-item>
    </el-menu>

    <div class="app-header-userinfo">
      <el-dropdown trigger="hover" :hide-on-click="false">
        <span class="el-dropdown-link">
          {{ username }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/userSet">
            <el-dropdown-item>设置</el-dropdown-item>
          </router-link>
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
      username: ''
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

<style scoped>
a {
  text-decoration: none;
}

.router-link-active {
    text-decoration: none;
  }
</style>
