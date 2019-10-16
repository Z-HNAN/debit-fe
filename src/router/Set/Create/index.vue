<template>
  <div class="main">
    <h1>创建一个账户</h1>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="账单名称">
        <el-input v-model="form.accountName"></el-input>
      </el-form-item>
      <el-form-item label="账户id">
        <el-input v-model="form.accountId"></el-input>
      </el-form-item>
      <el-form-item label="账户金额">
          <el-input v-model.number="form.moneyAmount"></el-input>
      </el-form-item>
      <el-form-item label="账户描述">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
	  <el-form-item class="myRadio" label="是否共享">
	    <el-radio-group v-model="form.isShare">
	      <el-radio label="是"></el-radio>
	      <el-radio label="否"></el-radio>
	    </el-radio-group>
	  </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          accountName: '',
          accountId: '',
          moneyAmount: '',
          isShare: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style>
  .el-form {
    width: 600px;
    border: 1px solid #eaeaea;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 30px 30px 20px 20px;
    margin: 20px auto;
  }

  .myRadio {
    text-align: left;
  }
</style>
