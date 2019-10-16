<template>
  <div class="main">
    <h1>记一笔帐</h1>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="记账类型">
        <el-input v-model="form.accountType"></el-input>
      </el-form-item>
      <el-form-item label="记账类型" class="myRadio">
          <el-col :span="12">
            <el-select v-model="form.type" placeholder="记账类型">
              <el-option label="生活日用"></el-option>
              <el-option label="娱乐消费"></el-option>
              <el-option label="网上购物"></el-option>
              <el-option label="教育缴费"></el-option>
              <el-option label="工资收入"></el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-input type="text" v-model="form.type" placeholder="自定义类型"></el-input>
          </el-col>
      </el-form-item>
      <el-form-item label="记账时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker placeholder="选择时间" v-model="form.time" style="width: 100%;"></el-time-picker>
            </el-col>
      </el-form-item>
      <el-form-item label="金额大小">
          <el-input v-model.number="form.money"></el-input>
      </el-form-item>
      <el-form-item label="消费描述">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
	  <el-form-item class="myRadio" label="消费类型">
	    <el-radio-group v-model="form.source">
	      <el-radio label="支出"></el-radio>
	      <el-radio label="收入"></el-radio>
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
          accountType: '',
          money: '',
          source: '',
          desc: '',
          type:'',
          date:'',
          time:''
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
    width: 700px;
    border: 1px solid #eaeaea;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 30px 30px 20px 20px;
    margin: 20px auto;
  }

  .myRadio {
    text-align: left;
  }
</style>
