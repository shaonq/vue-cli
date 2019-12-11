<template>
<div>

<u-md>
## 日程表

### 日程表含义
日程表，根据日期安排活动顺序及内容的表格。可以用日程表来规划时间，安排办事的流程。


### 每日数据
```javascript
// porp list Array
  [{
    content: "QC01-0710-APQP-01",
    title: "1.1协议或合同",
    startDate: "2019/11/21 00:00:00",
    endDate: "2019/11/30 00:00:00",
    className:""
  }]
```
### 节假日
```javascript
// porp holiday Array
  [{
    "holiday":false,
    "name":"国庆节前调休",
    "target":"国庆节",
    "date":"2019-09-29"
  }]
```


### 例子


</u-md>

<u-full-calendar :list="list" />

</div>
</template>

<script>

export default {
  data(){
    return {
      list:[{
        content: "QC01-0710-APQP-01",
        title: "1.1协议或合同",
        startDate: "2019/11/21 00:00:00",
        endDate: "2019/12/30 00:00:00",
        className:""
      }]
    }
  },
  methods:{
    handleClick(e){
      this.$util.toast(`您点击了 ${e.name}`)
    }
  }
}
</script>