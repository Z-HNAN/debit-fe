<template>
 <div class="main">
   <AccountSelect @getAccount="findRecord" style="margin-bottom: 20px;"/>
   <el-row class="row1" style="width: 80%">
     <router-link :to="{ name: 'Find.Day' }"><el-button type="primary">日账单</el-button></router-link>
     <router-link :to="{ name: 'Find.Month' }"><el-button type="primary">月账单</el-button></router-link>
     <router-link :to="{ name: 'Find.Year' }"><el-button type="primary">年账单</el-button></router-link>
   </el-row>

   <el-row >
    <router-view v-bind:billData="billData"
    v-bind:currentPage="currentPage"
    @delete="handleDelete"/>
   </el-row>

   <el-row class="row2" style="width: 80%;">
     <div class="block">
       <el-pagination
         @current-change="handleCurrentChange"
         :current-page.sync="currentPage"
         :page-size="8"
         layout="prev, pager, next, jumper"
         :total="64">
       </el-pagination>
     </div>
   </el-row>
 </div>
</template>

<script>
import AccountSelect from '@/components/AccountSelect/index.vue'
export default {
  data () {
    return {
      options: [],
      billData: [],
      tableData: [],
      totalValue: 100,
      currentPage: 1
    }
  },
  components: {
    AccountSelect
  },
  name: 'allRecord',
  methods: {
    // 改变当前页
    handleCurrentChange (val) {
      // let start
      // let end
      // start = (val - 1) * 8
      // end = val * 8
      // 改变日账单
      // this.tableData = this.billData.slice(start, end)
    },
    // 删除指定消费记录
    handleDelete (index, id) {
      // console.log(index, id)
      this.$ajax.delete('/bills/' + id)
        .then(res => {
          console.log(res.data)
          this.billData.splice(index, 1)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 转换时间戳
    getDate (time) {
      let date = new Date(time)
      // console.log(date)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() + ' '
      return Y + M + D
    },
    // 根据id查找选择账户消费记录
    findRecord (id) {
      this.$ajax.get('/bills?userId=' + id).then(res => {
        this.billData = res.data
        for (let i = 0; i < this.billData.length; i++) {
          this.billData[i].date = this.getDate(this.billData[i].date)
        }
        // this.tableData = this.billData.slice(0, 8)
        // console.log(this.billData)
      })
    }
  },
  mounted () {
    // 获取消费记录 默认显示用户第一个账户
    this.$ajax.get('/users').then(res => {
      this.$ajax.get('/bills?userId=' + res.data[0].id)
        .then(res1 => {
          this.billData = res1.data
          for (let i = 0; i < this.billData.length; i++) {
            this.billData[i].date = this.getDate(this.billData[i].date)
          }
          // this.tableData = this.billData.slice(0, 8)
          // console.log(this.billData)
        })
        .catch(err => {
          console.log(err)
        })
    })
  }
}
</script>

<style scoped>
</style>
