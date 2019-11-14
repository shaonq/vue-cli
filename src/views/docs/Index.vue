<template>
<div style="overflow: auto;height:100%;">
    <div style="width:1200px;margin:10px auto;">
        <div class="u-flex">
            <div class="card u-flex__item">
                <div style="margin:20px">
                    <router-view></router-view>
                </div>
            </div>
            <div style="width:260px;padding-left:20px;">
                <div class="card" style="min-height:200px;padding:10px 0">
                    <router-link v-for="(item,index) in docsRoute" :key="index" class="link" :to="{path:`/docs/${item.url}`}" exact>{{item.name}}</router-link>

                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { docsRoute, serversRoute, laboratoryRoute } from "@/views/routeFile.js";
export default {
    data() {
        return {
            docsRoute
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    margin-bottom: 10px;
    background: #fff;
    overflow: hidden;
    border-radius: 2px;
    box-shadow: 0 0 2px rgba(22, 22, 22, .2);
    box-sizing: border-box;
}

.link {
    display: block;
    padding: 8px 20px;
    color: #888;
    transition: .3s;

    &:hover {
        background: rgba(22, 22, 22, .05)
    }

    &.is-active {
        color: #FF9800
    }
}
</style>
