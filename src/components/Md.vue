<template>
<div ref="el" class="u-md">
    <slot></slot>
</div>
</template>

<script>
/**! https://github.com/markdown-it/markdown-it */
import hljs from 'highlight.js'
import 'highlight.js/styles/xcode.css';
const md = require('markdown-it')({   
    html: true,
    xhtmlOut: true,
    typographer: true,
    linkify: false,
    highlight(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (__) {}
        }

        return ''; // use external default escaping
    }

});
export default {
    mounted() {
        let el = this.$refs.el;
        if (el) {
            let html = md.render(el.innerHTML);
            el.innerHTML = html;
        }
    }
}
</script>

<style lang="scss">
.u-md {

    h1,
    h2,
    h3,
    h4,
    h5,
    dl {
        margin-bottom: 16px;
        margin-top: 8px;
        padding: 0;
    }

    p {
        margin-top: 8px;
        margin-bottom: 3px;
    }

    h1 {
        font-size: 24px;
        line-height: 54px;
    }

    h2 {
        font-size: 22px;
        line-height: 42px;
    }

    h1,
    h2 {
        border-bottom: 1px solid #EFEAEA;
        padding-bottom: 10px;
        margin-top: 0;
    }

    h3 {
        font-size: 18px;
        line-height: 30px;
    }

    h4 {
        font-size: 16px;
        line-height: 26px;
    }

    h5 {
        font-size: 14px;
        line-height: 23px;
    }

    a {
        color: #0099ff;
        margin: 0 2px;
        padding: 0;
        vertical-align: baseline;
        text-decoration: none;
    }

    a:hover {
        text-decoration: none;
        color: #ff6600;
    }

    ul,
    ol {
        padding: 0;
        padding-left: 18px;
        margin: 0;
        list-style-type: initial;
    }

    li {
        line-height: 24px;
    }

    p,
    ul,
    ol {
        font-size: 14px;
        line-height: 20px;
    }

    em {
        color: #2196F3;
    }

    ol {
        list-style-type: circle;
    }

    ol ol,
    ul ol {
        list-style-type: lower-roman;
    }

    code,
    pre {
        font-family: Consolas, Monaco, Andale Mono, monospace;
        background-color: #f4f4f4;
        color: inherit;
        font-size: 13px;
    }

    // code {
    //     margin: 0 2px;
    // }

    pre {
        line-height: 1.6;
        overflow: auto;
        padding: 6px 10px;
        border-radius: 2px;
    }

    // pre>code {
    //     border: 0;
    //     display: inline;
    //     max-width: initial;
    //     padding: 0;
    //     margin: 0;
    //     overflow: initial;
    //     line-height: 1.6em;
    //     font-size: .95em;
    //     white-space: pre;
    //     background: 0 0;

    // }

    // code {
    //     color: #666555;
    // }

    aside {
        display: block;
        float: right;
        width: 390px;
    }

    hr {
        text-align: left;
        color: #999;
        height: 2px;
        padding: 0;
        margin: 16px 0;
        background-color: #e7e7e7;
        border: 0 none;
    }

    dl {
        padding: 0;
    }

    dl dt {
        padding: 10px 0;
        margin-top: 16px;
        font-size: 1em;
        font-style: italic;
        font-weight: bold;
    }

    dl dd {
        padding: 0 16px;
        margin-bottom: 16px;
    }

    dd {
        margin-left: 0;
    }

    table {
        *border-collapse: collapse;
        /* IE7 and lower */
        border-spacing: 0;
        width: 100%;
    }

    table {
        border: solid #ccc 1px;
    }

    table+table {
        margin-top: 16px;
    }

    table thead {
        background: #f7f7f7;
    }

    table thead tr:hover {
        background: #f7f7f7
    }

    table tr:hover {
        background: #fbf8e9;
        -o-transition: all 0.1s ease-in-out;
        -webkit-transition: all 0.1s ease-in-out;
        -moz-transition: all 0.1s ease-in-out;
        -ms-transition: all 0.1s ease-in-out;
        transition: all 0.1s ease-in-out;
    }

    table td,
    .table th {
        border-left: 1px solid #ccc;
        border-top: 1px solid #ccc;
        padding: 10px;
        text-align: left;
    }

    table th {
        border-top: none;
        text-shadow: 0 1px 0 rgba(255, 255, 255, .5);
        padding: 5px;
        border-left: 1px solid #ccc;
    }

    table td:first-child,
    table th:first-child {
        border-left: none;
    }
}
</style>
