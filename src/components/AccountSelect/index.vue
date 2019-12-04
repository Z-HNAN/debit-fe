<template>
  <div>
    <h3 v-show="show" style="display: inline-block;margin-right: 10px;">{{value || defaultValue}}</h3>
    <el-select v-model="value" placeholder="请选择你的账户" @change="getAccount">
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.name"
        :value="item.name">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: [],
      value: '',
      defaultValue: '',
      show: true
    }
  },
  methods: {
    getAccount (selectedVal) {
      // 获取选中账目
      let account = this.options.find(item => {
        return item.name === selectedVal
      })
      // 获取选中账目id
      let id = account.id
      // console.log(id)
      this.$emit('getAccount', id)
    }
  },
  mounted () {
    this.show = window.location.hash.substr(2) !== 'set/add'
  },
  beforeCreate () {
    this.$ajax.get('/users')
      .then(res => {
        this.options = res.data
        this.defaultValue = this.options[0].name
      })
  }
}

</script>

<style>
</style>
