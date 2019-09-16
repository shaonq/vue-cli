<template>
<div class="app">
  <div class="app-head">

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

}
</script>
<style>
.app-head {
  height: 60px;
  background: #398dee;
  background: linear-gradient(to right, #398dee, #01579B);
}
.router-link-exact-active{
  color: red;
}
</style>