<template>
  <div style="overflow: auto;height:100%;">
    <div style="width:1200px;margin: 10px auto 80px;">
      <div class="u-flex  u-flex--start">
        <div class="t-subcard u-flex__item">
          <div style="margin:20px">
            <router-view></router-view>
          </div>
        </div>
        <div style="width:260px;padding-left:20px;">
          <div class="t-subcard" style="min-height:200px;padding:10px 0">
            <router-link
              v-for="(item,index) in list"
              :key="index"
              class="t-sublink"
              :to="{path:item.to}"
              exact
            >{{item.name}}</router-link>
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
      list: docsRoute
    }
  }
}
</script>