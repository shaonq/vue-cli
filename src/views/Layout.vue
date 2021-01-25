<template >
  <div class="layout-doc" id="root">
    <header>
      <div class="layout-hd">
        <div class="layout-warp">
          <div class="u-flex u-flex--start">
            <a href="https://shaonq.github.io/">
              <img src="~@/assets/logo.png" width="256" draggable="false" />
            </a>
            <div class="u-flex__item"></div>
            <div>
              <router-link class="layout-hd__link" :to="{path:'/docs'}">相关文档</router-link>
              <router-link class="layout-hd__link" :to="{path:'/developer'}">实验室</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="layout-hd__fill"></div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>
<style lang="scss" >
// 布局
.layout {
  &-doc {
    background: #f5f5f5;
    min-height: 100vh;
  }
  &-warp {
    width: 1000px;
    margin: 0 auto;
  }
  // 主体
  &-body {
    position: relative;
    padding-bottom: 60px;
    padding-top: 12px;
  }

  // 头部
  &-hd {
    position: fixed;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(22, 22, 22, 0.1);
    z-index: 999;
    &__fill,
    & {
      height: 60px;
    }

    &__link {
      text-decoration: none;
      color: #888;
      display: inline-block;
      padding: 0 22px;
      height: 60px;
      line-height: 60px;
      font-size: 16px;
      &.is-active {
        color: #444;
        font-weight: 600;
      }
    }
  }
}
</style>
