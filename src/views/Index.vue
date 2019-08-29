<template>
  <div class="app">
    <div class="app-head">
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <el-menu-item style="margin-right:200px;font-size:22px;">资料整理</el-menu-item>
        <el-menu-item style="font-size:16px;" index="1">常用</el-menu-item>
        <el-menu-item index="3" style="font-size:16px;">研发中</el-menu-item>
        <el-menu-item style="font-size:16px;" index="4">记事本</el-menu-item>
        <el-submenu index="2">
          <template slot="title"><span style="font-size:16px;">其他</span></template>
          <el-submenu index="2-4">
            <el-menu-item index="2-1">鸣谢</el-menu-item>
            <template slot="title">代码碎片</template>
            <el-menu-item index="2-4-1">碎片1</el-menu-item>
          </el-submenu>
          <el-menu-item index="2-1">关于</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="app-page">
      <router-view></router-view>
    </div>
  </div>
</template>
<style>
</style>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>