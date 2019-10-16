<template>
 <div class="main">
   <el-row class="row1" style="width: 80%">
     <router-link :to="{ name: 'Find.Day' }"><el-button type="primary">日账单</el-button></router-link>
     <router-link :to="{ name: 'Find.Month' }"><el-button type="primary">月账单</el-button></router-link>
     <router-link :to="{ name: 'Find.Year' }"><el-button type="primary">年账单</el-button></router-link>
   </el-row>

   <el-row >
    <router-view/>
   </el-row>

   <el-row class="row2"style="width: 80%;">
     <div class="block">
         <el-pagination
           @size-change="handleSizeChange"
           @current-change="handleCurrentChange"
           :page-sizes="[8, 16, 24, 32]"
           :page-size="8"
           layout="total, sizes, prev, pager, next, jumper"
           :total="80">
         </el-pagination>
       </div>
   </el-row>
 </div>
</template>

<script>
  export default {
    name:'allRecord',
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
          },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    }
</script>

<style>
</style>
