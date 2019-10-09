<template>
  <el-row class="tac">
    <el-col :span="24">
      <!-- <h5>默认颜色</h5> -->
      <el-menu
        class="el-menu-vertical-demo"
        router="router"
        @open="handleOpen"
        @close="handleClose"
      >
      
        <el-menu-item index="/index">
          <i class="el-icon-s-home"></i>
          <span slot="title">总览</span>
        </el-menu-item>
        
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span>义务工作</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/work/new">岗位发布</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/work/list">岗位查看</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/work/report">导出报表</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">
              拓展功能
            </template>
            <el-menu-item index="1-4-1">拓展1</el-menu-item>
            <el-menu-item index="1-4-1">拓展2</el-menu-item>
          </el-submenu>
        </el-submenu>
        
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-tools"></i>
            <span>信息管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/manage/departments">用工部门</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/manage/managers">用工联系人</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/manage/employee">管理员设置</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/manage/setting">应用设置</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="3">
          <i class="el-icon-message-solid"></i>
          <span slot="title">安全预警</span>
        </el-menu-item>
        
        <el-menu-item index="4">
          <i class="el-icon-s-custom"></i>
          <span slot="title">义工库</span>
        </el-menu-item>
        
        <el-menu-item index="5">
          <i class="el-icon-menu"></i>
          <span slot="title">拓展功能</span>
        </el-menu-item>
        
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
