<template>
  <div class="lay-doc">
    <div class="lay-head">
      <div class="lay-head__warp">
        <div class="u-flex u-flex--start" style="margin: 0 auto;width:1200px;">
          <a href="https://shaonq.github.io/">
            <img src="~@/assets/logo.png" style="height:60px" draggable="false" />
          </a>
          <div class="u-flex__item"></div>
          <div>
            <router-link class="lay-head__link" :to="{path:'/docs'}">相关文档</router-link>
            <!-- <router-link class="t-link" :to="{path:'/servers'}">团队约定</router-link> -->
            <router-link class="lay-head__link" :to="{path:'/developer'}">实验室</router-link>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted() {
    (async () => {
      if (typeof StickySidebar === "undefined") {
        await this.$util.loadJs("https://cdn.jsdelivr.net/npm/sticky-sidebar@3.3.1/dist/sticky-sidebar.min.js");
      }
      // topSpacing: 0,
      // bottomSpacing: 0,
      // containerSelector: '.app__demo',
      // innerWrapperSelector: '.sidebar__inner'

      new StickySidebar('.lay-head', {});
      // new StickySidebar('.lay-body__side', {});
    })()
  }
}
</script>
<style lang="scss" >
// 布局
.lay {
  &-doc {
    background: #f4f4f4;
    min-height: 100vh;
  }
  // 主体
  &-body {
    position: relative;
    padding: 10px 0 80px;
    &__warp {
      width: 1200px;
      margin: 0 auto;
    }
    &__main,
    &__side {
      background: #fff;
      border-radius: 2px;
      box-shadow: 0 1px 3px rgba(22, 22, 22, 0.1);
      box-sizing: border-box;
      min-height: 260px;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    &__main {
      // overflow: hidden;
      margin-right: 10px;
      padding-left: 10px;
      padding-right: 10px;
    }
    // 侧边
    &__side {
      width: 260px;
      font-size: 15px;

      & > a {
        display: block;
        padding: 8px 20px;
        color: #888;
        transition: 0.3s;

        &:hover {
          background: rgba(22, 22, 22, 0.05);
        }

        &.is-active {
          color: #ff9800;
        }
      }
    }
  }

  // 头部
  &-head {
    position: relative;
    height: 60px;
    z-index: 999;
    &__warp {
      background-color: #fff;
      box-shadow: 0 1px 3px rgba(22, 22, 22, 0.1);
    }

    &__link {
      text-decoration: none;
      color: #888;
      display: inline-block;
      padding: 0 22px;
      height: 60px;
      line-height: 60px;
      font-size: 15px;
      &.is-active {
        color: #444;
        font-weight: 600;
      }
    }
  }
}
</style>
