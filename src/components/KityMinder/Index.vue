<template>
  <div>
    <div ref="minder" style="height:600px;position: relative;">123</div>
  </div>
</template>
<script>
require('kity');
require('kityminder-core');
export default {
  data() {
    return {
      json: {
        "root": {
          "data": {
            "text": "百度产品",
            "image": "https://www.baidu.com/img/bd_logo1.png?where=super",
            "imageSize": { "width": 270, "height": 129 }
          },
          "children": [
            { "data": { "text": "新闻" } },
            { "data": { "text": "网页", "priority": 1 } },
            { "data": { "text": "贴吧", "priority": 2 } },
            { "data": { "text": "知道", "priority": 2 } },
            { "data": { "text": "音乐", "priority": 3 } },
            { "data": { "text": "图片", "priority": 3 } },
            { "data": { "text": "视频", "priority": 3 } },
            { "data": { "text": "地图", "priority": 3 } },
            { "data": { "text": "百科", "priority": 3 } },
            { "data": { "text": "更多", "hyperlink": "http://www.baidu.com/more" } }
          ]
        }
      }
    }
  },
  mounted() {
    if (kityminder) {
      var minder = window.minder = new kityminder.Minder({ renderTo: this.$refs.minder });
      minder.importJson({
        "root": {
          "data": {
            "text": "百度产品",
            "image": "https://www.baidu.com/img/bd_logo1.png?where=super",
            "imageSize": { "width": 270, "height": 129 }
          },
          "children": [
            { "data": { "text": "新闻" } },
            { "data": { "text": "网页", "priority": 1 } },
            { "data": { "text": "贴吧", "priority": 2 } },
            { "data": { "text": "知道", "priority": 2 } },
            { "data": { "text": "音乐", "priority": 3 } },
            { "data": { "text": "图片", "priority": 3 } },
            { "data": { "text": "视频", "priority": 3 } },
            { "data": { "text": "地图", "priority": 3 } },
            { "data": { "text": "百科", "priority": 3 } },
            { "data": { "text": "更多", "hyperlink": "http://www.baidu.com/more" } }
          ]
        }
      });
      minder.execCommand('hand')
    }
  }
}
</script>

<style lang="scss">
</style>

