<template>
  <div>
    <el-row>
      <el-col :span="22" :offset="2">{{form.title}}</el-col>
      <el-col :span="22" :offset="2">工作时间: </el-col>
      <el-col :span="18" :offset="6" v-for="(textDate, index) in form.textDateList" :key="index">{{textDate}}<span class="num">{{form.numList[index]}}人</span></el-col>
      <el-col :span="22" :offset="2">工作地点: {{form.position}}</el-col>
      <el-col :span="22" :offset="2">招工总数: {{totalNum}}</el-col>
      <el-col :span="22" :offset="2">工作内容: {{form.content}}</el-col>
      <el-col :span="22" :offset="2">工作要求: {{form.request}}</el-col>
      <el-col :span="22" :offset="2">报名地点: {{form.applyPosition}}</el-col>
      <el-col :span="22" :offset="2">签到地点: {{form.signPosition}}</el-col>
      <el-col :span="22" :offset="2">负责人: {{form.showManagerName}}</el-col>
      <el-col :span="22" :offset="2">联系电话: {{form.showManagerPhone}}</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ['form'],
  computed: {
    totalNum () {
      return this.form.numList.reduce((x, y) => x + y)
    }
  }
}
</script>

<style scoped>
.el-col{
  margin-bottom: 15px;
}
.num{
  margin-left: 15px;
}
</style>
