<template>
<div>
<u-md>

## 富文本

### 轻量级基础富文本编辑器
 


#### 例子

</u-md>
<u-pell/>
</div>
</template>

<script>
export default {
    data() {
        return {
            list: [{
                content: "QC01-0710-APQP-01",
                title: "1.1协议或合同",
                startDate: "2019/11/21 00:00:00",
                endDate: "2019/12/30 00:00:00",
                className: ""
            }]
        }
    },
    methods: {
        handleClick(e) {
            this.$util.toast(`您点击了 ${e.name}`)
        }
    }
}
</script>
