<template>
  <div class="page-home">
    <div class="page-home__side">
      <div>
        <h5>list</h5>
        <router-link :to="{path:'/common'}">表单</router-link>
        <router-link :to="{path:'/common/notice'}">提示弹窗</router-link>
        <router-link :to="{path:'/common/dialog'}">Dialog</router-link>
      </div>
    </div>
    <div class="page-home__body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  data() {
    return {

    }
  },
  mounted() {

  }
}
</script>
<style lang="scss">
.page-home {
  position: relative;
  height: calc(100vh - 100px);
  &__side,
  &__body {
    height: 100%;
  }
  &__side {
    position: absolute;
    width: 200px;
    & > div {
      height: 100%;
      overflow-y: hidden;
      padding: 20px;
      box-sizing: border-box;
      &:hover {
        overflow-y: auto;
      }
    }
    h3,
    a {
      font-size: 14px;
      line-height: 40px;
      height: 40px;
      margin: 0;
      padding: 0;
      text-decoration: none;
      display: block;
      position: relative;
      transition: 0.15s ease-out;
    }
    h3 {
      font-size: 16px;
      font-weight: 700;
    }
    h5 {
      font-size: 12px;
      color: #999;
      line-height: 26px;
      margin-top: 15px;
    }
  }
  &__body {
    margin-left: 200px;
  }
}
</style>
