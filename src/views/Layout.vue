<template>
  <div style="background:#f4f4f4;min-height:100vh;">
    <div id="sidebar" style="z-index:9">
      <div class="t-header">
        <div class="u-flex u-flex--start" style="margin: 0 auto;width:1200px;">
          <a href="https://shaonq.github.io/">
            <img src="~@/assets/logo.png" style="height:60px" draggable="false" />
          </a>
          <div class="u-flex__item"></div>
          <div>
            <router-link class="t-link" :to="{path:'/docs'}">相关文档</router-link>
            <!-- <router-link class="t-link" :to="{path:'/servers'}">团队约定</router-link> -->
            <router-link class="t-link" :to="{path:'/developer'}">实验室</router-link>
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
      var a = new StickySidebar('#sidebar', {
        // topSpacing: 0,
        // bottomSpacing: 0,
        // containerSelector: '.container',
        // innerWrapperSelector: '.sidebar__inner'
      });
    })()
  }
}
</script>
<style lang="scss" >
.t-header {
  position: relative;
  z-index: 999;
  height: 60px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(22, 22, 22, 0.2);
}
.t-link {
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
.t-sub {
  &card {
    margin-bottom: 10px;
    background: #fff;
    overflow: hidden;
    border-radius: 2px;
    box-shadow: 0 0 2px rgba(22, 22, 22, 0.2);
    box-sizing: border-box;
    font-size: 15px;
  }

  &link {
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
</style>
