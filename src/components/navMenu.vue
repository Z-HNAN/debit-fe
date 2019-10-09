<template>
  <el-row class="tac">
    <el-col :span="24">
      <!-- <h5>默认颜色</h5> -->
      <el-menu
        class="el-menu-vertical-demo"
        router="router"
        @open="handleOpen"
        @close="handleClose"
      >

        <el-menu-item index="/index">
          <i class="el-icon-s-home"></i>
          <span slot="title">总览1</span>
        </el-menu-item>
        <el-menu-item index="/index">
          <i class="el-icon-s-home"></i>
          <span slot="title">总览2</span>
        </el-menu-item>

        <el-submenu index="modal1">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span>modal1</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/modal1/page1">page1</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/modal1/page2">page2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="modal2">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span>modal2</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/modal2/page1">page1</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/modal2/page2">page2</el-menu-item>
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
    border: 1px solid red;
    height: 100vh;
  }
</style>
