<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu
        class="el-menu-vertical-demo"
        router="router"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="/index">
          <i class="el-icon-s-home"></i>
          <span slot="title">总览</span>
        </el-menu-item>

        <el-menu-item index="/find">
          <i class="el-icon-search"></i>
          <span slot="title">个人账单</span>
        </el-menu-item>

        <el-menu-item index="/share">
          <i class="el-icon-s-custom"></i>
          <span slot="title">账户显示</span>
        </el-menu-item>

        <el-menu-item index="/statistics">
          <i class="el-icon-s-data"></i>
          <span slot="title">账户统计</span>
        </el-menu-item>

        <el-submenu index="set">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>账户设置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/set/create">创建账户</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/set/add">记一笔账</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>
  .tac {
    height: 100vh;
  }
</style>
