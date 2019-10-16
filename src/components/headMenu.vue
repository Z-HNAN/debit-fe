<template>
  <div>
    <div style="width: 60px; cursor: pointer;" @click.prevent="toggleSideBar">
      <i v-show="!isCollapse" class="el-icon-d-arrow-left"></i>
      <i v-show="isCollapse" class="el-icon-d-arrow-right"></i>
    </div>
    <!-- 我是样例菜单 -->
    <el-menu default-active="1" class="el-menu-demo tab-page" mode="horizontal" @select="handleSelect"
      active-text-color="#409EFF">
      <el-menu-item index="1">我的消息</el-menu-item>
      <el-submenu index="2">
        <template slot="title">个人中心</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项2</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3">我的回复</el-menu-item>
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
    data() {
      return {
        username: '',
        isCollapse: false
      }
    },
    methods: {
      toggleSideBar() {
        this.isCollapse = !this.isCollapse
      },
      logout: function () {
        this.$confirm('确认退出?', '提示', {})
          .then(() => {
            sessionStorage.removeItem('user');
            this.$router.push('/login');
          })
          .catch(() => { });
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
    },
    mounted: function () {
      let user = sessionStorage.getItem('user');
      if (user) {
        this.username = user;
      }
    },
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
