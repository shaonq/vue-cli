<template>
    <div>
        <template v-if="loading"><slot name="loading">加载中...</slot></template>
        <template v-else>
            <template v-if="loadend">
                <slot></slot>
            </template>
            <template v-else><slot name="loadend">没有内容</slot></template>
        </template>
    </div>
</template>
<script>
export default {
    props:{
        loading:Boolean,
        loadend:Boolean
    }    
}
</script>
<style lang="scss">

</style>
