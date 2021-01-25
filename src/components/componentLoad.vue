<template>
    <div>
        <slot v-if="loading" name="loading">加载中...</slot>
        <slot v-else-if="empty" name="empty">没有内容</slot>
        <slot v-else>加载中...</slot>
    </div>
</template>
<script>
export default {
    props: {
        loading: Boolean,
        empty: Boolean
    }
}
</script>
<style lang="scss">
</style>
