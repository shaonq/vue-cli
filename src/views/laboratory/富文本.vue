<template>
<div>
<u-md>

## 富文本

### 轻量级基础富文本编辑器
 


#### 例子

</u-md>
<u-pell  style="height:500px;">
<div><div><span style="font-size: 18px;"><b>优秀的编辑器</b></span></div><img src="https://pic2.zhimg.com/v2-d00c9dfc3984682bee747f25450a1351_b.gif"><div><br></div><div>我们先看一下表情包 。</div></div>
</u-pell >
</div>
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
