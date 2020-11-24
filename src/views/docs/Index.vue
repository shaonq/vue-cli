<template>
  <div class="lay-body">
    <div class="lay-body__warp">
      <div class="u-flex  u-flex--start">
        <div class="u-flex__item lay-body__main">
          <router-view></router-view>
        </div>
        <div class="lay-body__side">
          <router-link v-for="(item,index) in list" :key="index" class="t-sublink" :to="{path:item.to}" exact>{{item.name}}</router-link>
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