<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="10">
        <h3 class="web-title">义务工作发展部</h3>
      </el-col>
      <el-col :span="14">
        <div class="nav">
          <el-button icon="el-icon-s-operation" size="small"></el-button>
          <h4 class="user-name">义工部</h4>
          <span class="user-avatar-box"><img class="user-avatar" src="../../static/img/avatar.jpg" alt=""></span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
</script>

<style scoped>
.el-row {
  border-bottom: 1px solid #eee;
}

.web-title{
}
.nav{
  height: 100%;
  margin-right: 100px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

}
.user-name{
  margin: 0 15px 0 10px;
}
.user-avatar-box{
  margin-top: 5px;
}
.user-avatar{
  /* position: absolute; */
  height: 50px;
  width: 50px;
  border-radius: 25px;
}
</style>
