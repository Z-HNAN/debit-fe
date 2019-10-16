

<template>
  <div id="app">
    <el-container>

      <el-aside width="20%">
        <nav-menu />
      </el-aside>

      <el-container>
        <el-header>
          <head-menu />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
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
