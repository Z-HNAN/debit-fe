<template>
  <div>Page1
    <h1>users</h1>
    <ul>
      <li v-for="user in users" :key="user.id">{{user.name}}</li>
    </ul>
    <hr />
    <h1>billTypes</h1>
    <button @click="fetchBillTypes">点击获取数据</button>
    <ul>
      <li v-for="billType in billTypes" :key="billType.id">{{billType.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      /* Created获取 users */
      users: [],
      /* 点击获取 */
      billTypes: []
    }
  },
  methods: {
    fetchBillTypes () {
      this.$ajax.get('http://94.191.90.221:8000/eolinker_os/Mock/simple?projectID=1&uri=billTypes')
        .then(res => {
          this.billTypes = res.data
        })
    }
  },
  created () {
    this.$ajax.get('http://94.191.90.221:8000/eolinker_os/Mock/simple?projectID=1&uri=users')
      .then(res => {
        this.users = res.data
      })
  }
}
</script>

<style>
</style>
