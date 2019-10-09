<template>
  <div id="app">
    <el-container>
      <el-header><head-menu></head-menu></el-header>
      <el-container>
        <el-aside width="20%"><nav-menu></nav-menu></el-aside>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {}
</script>

<style>
.my-header{
  background: yellowgreen;
  width: 100%;
  height: 100%;
}

.my-container{
  background: deeppink;
  width: 100%;
  height: 400px;
}
</style>
