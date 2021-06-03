<template>

    <ul class="u-flex">
        <li class="u-flex__item u-tabs__item u-clamp" style="max-width:100px;min-width:10px;" v-for="route in $store.state.routerBar.list" :key="route.path">
            <a class="u-tabs__link" @click="$router.push(route).catch(e=>{})" :class="{'is-active':$route.fullPath === route.fullPath}">{{route.meta.title||route.path}} </a>
        </li>
    </ul>
</template>
<script>
try {
    
} catch (error) {
    
}
</script>