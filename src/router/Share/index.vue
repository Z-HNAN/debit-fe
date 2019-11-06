<template>
  <div class="main">
    <el-row>
      <el-col :span="12" class="list">
        <div>
          <h1>个人账户</h1>
          <el-row v-for="item in filterPerson" :key="item.id">
            <AccountCard :isShare='false' :account='item'
            @delete='handleDelete'
            @detail='handelDetail'
            @add='handleAdd'/>
          </el-row>
        </div>
      </el-col>
      <el-col :span="12" class="list">
        <h1>共享账户</h1>
        <el-row v-for="item in filterShares" :key="item.id">
          <AccountCard :isShare='true'
           :account='item'
           @delete='handleDelete'
           @detail='handelDetail'
           @add='handleAdd'/>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import AccountCard from '@/components/AccountCard/index.vue'
import getLoginInfo from '@/utils/getLoginInfo.js'

export default {
  data () {
    return {
      person: [],
      shares: [],
      accounts: []
    }
  },
  methods: {
    /**
     * 组件触发删除
     */
    handleDelete (accountId) {
      this.$confirm(`确认删除? ${accountId}`, '提示', {})
        .then(() => {
          // console.log(`删除了账户 ${accountId}`)
          this.$ajax.delete('/users/' + accountId)
            .then(res => {
              // console.log(res)
              // 在accounts中删除该数据
              for (let i = 0; i < this.accounts.length; i++) {
                if (this.accounts[i].id === accountId) {
                  this.accounts.splice(i, 1)
                }
              }
            })
            .catch((err) => {
              console.log(err)
            })
        })
    },
    /**
     * 组件触发查看详情 查看
     */
    handelDetail (accountId) {
      console.log(`查看了账户 ${accountId}`)
      // this.$ajax.get('/users/'+accountId)
      // .then(res => {
      //   this.accountInfo.push(res.data)
      // })
      // .catch(err => {
      //   console.log(err)
      // })
    },

    // 为指定账本添加关联用户
    // id：账本id accountId:关联用户id
    handleAdd (id, accountId) {
      // console.log(userId)
      this.$ajax.post('/users/' + id + '/link', accountId)
        .then(res => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  computed: {
    // 获取非共享账户
    filterPerson () {
      return this.accounts.filter(account => !account.isShare)
    },
    // 获取共享账户
    filterShares () {
      return this.accounts.filter(account => account.isShare)
    }
  },
  mounted () {
    this.$ajax.get('/users').then(res => {
      this.accounts = res.data
    })

    const loginInfo = getLoginInfo()
    console.log('当前登录用户信息')
    console.log(loginInfo)
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
