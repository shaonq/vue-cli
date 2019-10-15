<template>
  <u-house left="280px">
    <div class="layout-sidebar" slot="left">
      <ul class="layout-sidebar__ul">
        <li class="layout-sidebar__ulti">功能列表</li>
        <li><router-link :to="{path:'/common'}" exact>表单</router-link></li>
        <li><router-link :to="{path:'/common/notice'}">提示弹窗</router-link></li>
        <li><router-link :to="{path:'/common/dialog'}">Dialog</router-link></li>
        <li><router-link :to="{path:'/common/worksheet'}">worksheet</router-link></li>
        <li><router-link :to="{path:'/common/naotu'}">naotu</router-link></li>
      </ul>
    </div>
    <router-view></router-view>
  </u-house>
</template>
<script>
export default {
}
</script>
