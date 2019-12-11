<template>
<div>

<u-md>
## 甘特图

### 甘特图含义
甘特图以图示通过活动列表和时间刻度表示出特定项目的顺序与持续时间。一条线条图，*横轴表示时间*，*纵轴表示项目*，*线条表示期间计划和实际完成情况*。直观表明计划何时进行，进展与要求的对比。便于管理者弄清项目的剩余任务，评估工作进度。
甘特图是以作业排序为目的，将活动与时间联系起来的最早尝试的工具之一，帮助企业描述工作中心、超时工作等资源的使用。

#### 甘特图包含以下三个含义：

1. 以图形或表格的形式显示活动；
2. 通用的显示进度的方法；
3. 构造时含日历天和持续时间，不将周末节假算在进度内。

简单、醒目、便于编制，在管理中广泛应用。


### 甘特图构造

### 节点构造
```javascript
// porp tasks Array
  [{
    id: 11,                 // 节点id 
    parent: 1,              // 父节点的id 
    name: 'Requirements',   // 节点名称
    start: new Date(),      // 开始时间
    duration: 10,           // 节点周期
    percent: 0.5            // 进度
  }]
```
### 节点关系构造
```javascript
// porp links Array
  [{
    source: 11,     // 开始节点id
    target: 12,     // 结束节点id
    type: 'FS'      // 节点关系
  }]
```

### 例子
</u-md>
<u-gantt :tasks="tasks" :links="links" @on-click="handleClick"></u-gantt>

</div>
</template>

<script>
var tasks = [{
        id: 1,
        name: 'Waterfall model'
    },
    {
        id: 11,
        parent: 1,
        name: 'Requirements',
        start: new Date(),
        duration: 10,
        percent: 0.5
    },
    {
        id: 12,
        parent: 1,
        name: 'Design',
        start: new Date(),
        duration: 15,
        percent: 0.6
    },
    {
        id: 13,
        parent: 1,
        name: 'Implement',
        type: 'milestone',
        start: new Date(),
        percent: 0.4
    },
    {
        id: 14,
        parent: 1,
        name: 'Verification',
        start: new Date(),
        duration: 5,
        percent: 0.3
    },
    {
        id: 2,
        name: 'Development'
    },
    {
        id: 21,
        parent: 2,
        name: 'Preliminary',
        start: new Date(),
        duration: 12,
        percent: 0.7
    },
    {
        id: 22,
        parent: 2,
        name: 'Systems design',
        start: new Date(),
        duration: 6,
        percent: 0.1
    },
    {
        id: 23,
        parent: 2,
        name: 'Development',
        start: new Date(),
        duration: 16,
        percent: 0.2
    },
    {
        id: 24,
        parent: 2,
        name: 'Integration',
        start: new Date(),
        duration: 8,
        percent: 0.8
    }
];
var links = [{
        source: 11,
        target: 12,
        type: 'FS'
    },
    {
        source: 12,
        target: 13,
        type: 'FS'
    },
    {
        source: 13,
        target: 14,
        type: 'FS'
    },
    {
        source: 13,
        target: 21,
        type: 'FS'
    },
    {
        source: 23,
        target: 24,
        type: 'SF'
    }
];
export default {
  data(){
    return {
      links,
      tasks
    }
  },
  methods:{
    handleClick(e){
      this.$util.toast(`您点击了 ${e.name}`)
    }
  }
}
</script>