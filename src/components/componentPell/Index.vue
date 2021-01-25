<template>
  <div ref="el" class="u-pell">
    <slot />
  </div>
</template>

<script>
import pell from "./pell.js";
export default {
  props: {
    html: {
      type: String | Number,
      default: ""
    }
  },
  mounted() {
    let { el } = this.$refs;
    let html = el.innerHTML;
    if (html) el.innerHTML = null;
    let { exec, content } = pell({
      el,
      onChange: e => this.$emit("on-change", e),
      actions: [
        // 'underline', 'strikethrough'
        // {name: "heading2",icon: "&#xe68e;",title: "二级标题"},
        { name: "bold", icon: "&#xe6d9;", title: "粗体(Ctrl+B)" },
        { name: "italic", icon: "&#xe6f8;", title: "斜体 (Ctrl+I)" },
        { type: "space" },
        { name: "heading1", icon: "&#xe68d;", title: "一级标题" },
        { name: "quote", icon: "&#xe649;", title: "引用块" },
        { name: "code", icon: "&#xe6f7;", title: "插入代码" },
        { name: "olist", icon: "&#xe71b;", title: "无序列表" },
        { name: "ulist", icon: "&#xe71a;", title: "有序列表" },
        { type: "space" },
        {
          name: "link", icon: "&#xe701;", title: "插入链接",
          result: () => {
            var url = window.prompt("请输入链接地址");
            if (url) exec("createLink", url);
          }
        },
        {
          name: "image", icon: "&#xe6f5;", title: "上传图片",
          result: () => {
            var url = window.prompt('请输入图片链接地址');
            if (url) exec('insertImage', url);
          }
        },
        { name: "line", icon: "&#xe6e5;", title: "插入分割线" },
        { type: "space" },
        { name: "paragraph", icon: "&#xe700;", title: "清除格式" },
      ]
    });
    // 显示已经有的内容
    if (html) content.innerHTML = html;
  }
};
</script>

<style lang="scss">
/** 编辑器 */
@font-face {
  font-family: "icon-pell"; /* project id 1125526 */
  src: url("//at.alicdn.com/t/font_1125526_vsgudgr5ef.eot");
  src: url("//at.alicdn.com/t/font_1125526_vsgudgr5ef.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_1125526_vsgudgr5ef.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_1125526_vsgudgr5ef.woff") format("woff"),
    url("//at.alicdn.com/t/font_1125526_vsgudgr5ef.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_1125526_vsgudgr5ef.svg#icon-pell") format("svg");
}

.u-pell {
  border: 1px solid rgba(10, 10, 10, 0.1);
  box-sizing: border-box;
  color: #242424;

  &__bar {
    background-color: #fff;
    border-bottom: 1px solid rgba(10, 10, 10, 0.1);
    padding: 6px 5px;
  }

  &__button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    height: 26px;
    width: 26px;
    margin: 0 2px;
    font-family: "icon-pell";
    display: inline-block;
    vertical-align: middle;
    font-size: 17px;
    color: #424242;
    &:active {
      transform: scale(1.05);
    }
  }

  i#{&}__button {
    background-color: #e2e2e2;
    height: 20px;
    margin: 0 3px;
    width: 1px;
  }

  &__active {
    background-color: #f0f0f0;
  }
}
.u-quill-body,
.u-pell__content {
  box-sizing: border-box;
  min-height: 140px;
  // max-height: 640px;
  outline: 0;
  overflow-y: auto;
  padding: 10px;
  word-break: break-word;
  border: 1px solid transparent;
  line-height: 1.6;
  font-size: 15px;

  hr {
    margin: 2em auto;
    width: 300px;
    max-width: 100%;
    border: none;
    background: transparent;
    border-top: 1px solid #e2e2e2;
  }

  b,
  strong {
    font-weight: bolder;
  }

  ul,
  ol {
    padding-left: 2em;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  em,
  i {
    font-style: italic;
  }

  h1,
  h2 {
    clear: left;
    margin-top: 2.33333em;
    margin-bottom: 1.16667em;
    font-size: 1.2em;
    line-height: 1.5;
    font-weight: 600;
    font-synthesis: style;
  }

  h2 {
    font-size: 1.1em;
  }

  pre {
    margin: 1.4em 0;
    padding: 0.88889em;
    font-size: 0.9em;
    word-break: normal;
    word-wrap: normal;
    white-space: pre;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    background: #f6f6f6;
    border-radius: 4px;
  }

  blockquote {
    margin: 1.4em 0;
    padding-left: 1em;
    color: #646464;
    border-left: 3px solid #d3d3d3;
  }

  img {
    display: block;
    border-radius: 2px;
    margin: 1.4em auto;
  }
}
</style>
