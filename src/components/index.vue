<template>
  <div>index</div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  methods: {
    ...mapActions(['getManagers', 'getDepartments'])
  },
  // 拉取数据
  created () {
    this.getManagers()
    this.getDepartments()
  }
}
</script>

<style>
</style>
