<template>
<div>

<u-md>
## 基础弹

### 释义
项目基础的必须的弹窗，无其他依赖




</u-md>
<div style="padding:20px 0;">
    <el-button @click="show(1)">showLoading</el-button>
    <el-button @click="show(2)">toast</el-button>
    <el-button @click="show(3)">showLayer</el-button>
</div>


</div>
</template>
<script>
export default {
    methods: {
        show(type) {
            switch (type) {
                case 1:
                    this.$util.showLoading('加载中');
                    setTimeout(() => this.$util.showSuccess('加载成功'), 3000)
                    break;
                case 2:
                    this.$util.toast('显示弹窗');
                    break;
                case 3:
                    this.$util.showLayer('出错了');
                    break;

                default:
                    break;
            }
        }
    }
}
</script>

<style>

</style>
