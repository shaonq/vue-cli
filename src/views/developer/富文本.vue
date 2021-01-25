<template>
  <div>
    <div class="u-quill-body">
      <h1>富文本</h1>
      <p>轻量级基础富文本编辑器</p>
    </div>
    <u-quill :handlers="handlers" style="height:1200px"></u-quill>
  </div>
</template>
<script>
export default {
  data() {
    return {
      handlers: {
        video: insert => {
          // insert("https://shaonq.github.io/nui/old/videos/miku.mp4")
        },
        link: insert => {
          const util = this.$util;
          util.alert({
            extend: true,
            title: "添加链接",
            content: `<input class="u-input" placeholder="http(s)://"/>`,
            success: (index, that) => {
              util.dom.el("input", that).focus();
            },
            ok: {
              label: "确认",
              onclick: (index, that) => {
                let value = util.dom.el("input", that).value;
                if (util.regexp.url.test(value)) {
                  insert(value)
                  util.hideToast(index)
                } else {
                  util.toast("请输入一个有效地址")
                }
              }
            }
          })
        },
        image: insert => {
          const util = this.$util;
          util.alert({
            extend: true,
            title: "添加图片",
            content: `<input class="u-input" placeholder="http(s)://"/>`,
            success: (index, that) => {
              util.dom.el("input", that).focus();
            },
            ok: {
              label: "确认",
              onclick: (index, that) => {
                let input = util.dom.el("input", that);
                insert("https://pic2.zhimg.com/v2-d00c9dfc3984682bee747f25450a1351_b.gif")
                util.hideToast(index)
              }
            }
          })
        },
      }
    }
  },
  created() {

  }
}
</script>

<style>
</style>