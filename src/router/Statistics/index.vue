<template>
  <div class="main">
    <el-row class="row1">
      <router-link :to="{ name: 'Statistic.Day' }"><el-button type="primary">按日统计</el-button></router-link>
      <router-link :to="{ name: 'Statistic.Month' }"><el-button type="primary">按月统计</el-button></router-link>
      <router-link :to="{ name: 'Statistic.Year' }"><el-button type="primary">按年统计</el-button></router-link>
    </el-row>

    <el-row >
     <router-view/>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Statistic'
}
</script>

<style>
</style>
