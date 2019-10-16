<template>
  <div class="main">
    <el-row>
      <el-col :span="12" class="list">
        <div>
          <h1>个人账户</h1>
          <el-row v-for="item in person" :key="item.id">
            <AccountCard :isShare='false' :account='item' @delete='handleDelete' @detail='handelDetail'/>
          </el-row>
        </div>
      </el-col>
      <el-col :span="12" class="list">
        <h1>共享账户</h1>
        <el-row v-for="item in shares" :key="item.id">
          <AccountCard :isShare='true' :account='item' @delete='handleDelete' @detail='handelDetail'/>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import AccountCard from '@/components/AccountCard/index.vue'

export default {
  data () {
    return {
      person: [{name: '我的账户1', id: '1'}, {name: '我的账户2', id: '2'}, {name: '我的账户3', id: '3'}],
      shares: [{name: '家庭共享账户', id: '4'}, {name: '寝室共享账户', id: '5'}, {name: '公司共享账户', id: '6'}]
    }
  },
  methods: {
    /**
     * 组件触发删除
     */
    handleDelete (accountId) {
      this.$confirm(`确认删除? ${accountId}`, '提示', {})
        .then(() => {
          console.log(`删除了账户 ${accountId}`)
        })
        .catch(() => { })
    },
    /**
     * 组件触发查看详情
     */
    handelDetail (accountId) {
      console.log(`查看了账户 ${accountId}`)
    }
  },
  mounted () {
    this.$ajax.get(`users`, {
      params: {
        accountId: 1
      }
    }).then(res => {
      this.person = res.data.filter(account => account.isShare === false)
      this.shares = res.data.filter(account => account.isShare === true)
    })
  },
  components: {
    AccountCard
  }
}
</script>
<style scoped>
.list {
  padding: 0 20px;
}
</style>
