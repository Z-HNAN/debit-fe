<template>
  <div>
    <div class="root">
      <div class="icon">
         <span v-if='isShare === false'  class="fa fa-user fa-5x fa-fw" />
         <span v-if='isShare === true' class="fa fa-4x fa-users fa-fw" />
      </div>
      <div class="label">
        <span>{{account.name}}</span>
      </div>
      <div class="action">
        <el-button type="danger" @click='handleDelete'>删除</el-button>
        <el-button type="primary" @click='handleDetail'>查看</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isShare', 'account'],
  methods: {
    /**
     * 触发删除，参数是该账户的id
     */
    handleDelete () {
      this.$emit('delete', this.account.id)
    },
    /**
     * 触发详情，参数是该账户的id
     */
    handleDetail () {
      this.$emit('detail', this.account.id)
    }
  }
}
</script>

<style scoped>
.root {
  display: flex;
  height: 100px;
  box-shadow: 0 0 10px #cac6c6;
  border-radius: 5px;
}

.icon {
  flex: 0 0 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px 0 0 5px;
}

.label {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 18px;
  padding-left: 10px;

}
.action {
  flex: 0 0 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 10px;
}

</style>
