<template>
  <div class="layout-body">
    <div class="layout-warp">
      <div class="u-flex u-flex--start">
        <div class="u-flex__item is-clamp">
          <div class="u-card">
            <router-view></router-view>
          </div>
        </div>
        <!-- 侧边栏目 -->
        <div class="u-ml" style="width:220px;" ref="el">
          <div class="u-card ">
            <div class="u-card__bd" style="padding:12px 0">
              <router-link style="display: block;font-size:14px;border-radius: 4px;" v-for="(item,index) in list" :key="index" class="u-dialog--dropdown-item" :to="{path:item.to}" exact>{{item.name}}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { docsRoute, serversRoute, developerRoute } from "@/views/routeFile.js";
export default {
  data() {
    return {
      list: developerRoute
    }
  },
  mounted() {
    (async () => {
      // 顶部固定
      if (typeof StickySidebar === "undefined") {
        await this.$util.loadJs("https://cdn.jsdelivr.net/npm/sticky-sidebar@3.3.1/dist/sticky-sidebar.min.js");
      }
      new StickySidebar(this.$refs.el, {
        topSpacing: 72,
      });
    })()
  }
}
</script>
<style lang="scss">
</style>
