<template>
  <div ref="el" class="u-pell"></div>
</template>

<script>
import pell from "./main.js";
export default {
  props: {
    html: {
      type: String | Number,
      default: ""
    }
  },
  mounted() {
    let { el } = this.$refs;
    let { content } = pell(el, e => this.$emit("on-change", e));
    this.content = content;
    if (this.html) content.innerHTML = this.html;
  },
  watch: {
    html(h) {
      let { content, html, $refs } = this;
      if ($refs.el && html) {
        content.innerHTML = h;
      }
    }
  }
};
</script>

<style lang="scss">
/** 编辑器 */
@font-face {
  font-family: "icon-pell";
  /* project id 1125526 */
  src: url("//at.alicdn.com/t/font_1125526_jo9gsc0o7va.eot");
  src: url("//at.alicdn.com/t/font_1125526_jo9gsc0o7va.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_1125526_jo9gsc0o7va.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_1125526_jo9gsc0o7va.woff") format("woff"),
    url("//at.alicdn.com/t/font_1125526_jo9gsc0o7va.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_1125526_jo9gsc0o7va.svg#icon-pell")
      format("svg");
}

.u-pell {
  border: 1px solid rgba(10, 10, 10, 0.1);
  box-sizing: border-box;
  max-width: 640px;
  font-size: 15px;

  &__bar {
    background-color: #fff;
    border-bottom: 1px solid rgba(10, 10, 10, 0.1);
    padding: 5px 13px;
  }

  &__button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    height: 26px;
    outline: 0;
    margin: 0 2px;
    width: 26px;
    font-family: "icon-pell";
    display: inline-block;
    vertical-align: middle;
    font-size: 17px;
    color: #666;
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

  hr {
    margin: 2em auto;
    width: 300px;
    max-width: 100%;
    border: none;
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
}
</style>
