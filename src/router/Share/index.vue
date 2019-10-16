<template>
  <div class="main">
    <el-row >
      <el-col :span="12">
        <div class="grid-content divLeft ">
           <h1>个人账户</h1>
           <el-row v-for="item in person">
             <el-col :span="5">
               <div class="myIcon">
                 <span class="fa fa-user fa-5x fa-fw"></span>
               </div>
             </el-col>
             <el-col :span="9">{{item}}</el-col>
             <el-col :span="10">
               <el-button type="danger" @click="isDelete">删除</el-button>
               <el-button type="primary">查看</el-button>
             </el-col>
           </el-row>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content ">
          <h1>共享账户</h1>
          <el-row v-for="item in shares">
            <el-col :span="5">
              <div class="myIcon myIcon2">
                <span class="fa fa-4x fa-users fa-fw"></span>
              </div>
            </el-col>
            <el-col :span="9">{{item}}</el-col>
            <el-col :span="10">
              <el-button type="danger">删除</el-button>
              <el-button type="primary">查看</el-button>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        person:['我的账户1','我的账户2','我的账户3'],
        shares:['家庭共享账户','寝室共享账户','公司共享账户']
      }
    },
    methods: {
      isDelete: function(){
        this.$confirm('确认删除?', '提示', {})
          .then(() => {
            sessionStorage.setItem('user', this.ruleForm.username);
            this.$router.push({path: '/'});
          })
          .catch(() => { });
      }
    }
  }
</script>

<style scoped>
  .main .grid-content .el-row{
    width: 100%;
    height: 100px;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    line-height: 100px;
    font-size: 18px;
  }
  .divLeft {
    margin-right: 20px;
  }

  h1{
    margin-bottom: 30px;
  }

  .myIcon {
    width: 100%;
    height: 100px;
    background-color: rgba(0,0,0,0.1);
  }

  .myIcon2 {
    padding-top: 12px;
    height: 88px;
  }

  .el-row{
    margin-bottom: 30px;
  }

</style>
