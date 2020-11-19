<template>
  <div class="u-pell--body">
    <h1>工具版本</h1>
    <ul>
      <li>node v10.16.0(npm 6.9.0)</li>
      <li>yarn v1.22.4</li>
      <li>vue-cli v3.0</li>
    </ul>
    <h1>工具安装</h1>
    <div>
      <ul>
        <li>
          VS Code&nbsp;
          <a href="https://pc.qq.com/detail/16/detail_22856.html">下载地址</a>，部分插件如下：
          <ol>
            <li>Chinese (Simplified) Language Pack for Visual Studio Code 一 中文语言包</li>
            <li>Vetur 一 Vue 语法工具</li>
            <li>Auto Close Tag 一 自动添加结束标签</li>
            <li>IntelliJ IDEA Keybindings 一 IntelliJ风格快捷键</li>
          </ol>
        </li>
        <li>
          <a href="https://pc.qq.com/detail/13/detail_22693.html" style="color: rgb(0, 153, 255); margin: 0px 2px; padding: 0px; vertical-align: baseline;">Git下载地址</a>
        </li>
        <li>
          <a href="https://nodejs.org/en/blog/release/v10.16.0/" style="color: rgb(0, 153, 255); margin: 0px 2px; padding: 0px; vertical-align: baseline;">Node下载地址</a>
        </li>
      </ul>
      <h1>项目依赖包( yarn )</h1>
      <pre>
 npm config set registry https://registry.npm.taobao.org 
 npm install -g yarn@1.12.3
 yarn config set registry https://registry.npm.taobao.org -g
 yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g
 yarn global add @vue/cli
 </pre>
    </div>
    <h1>兼容IE10+</h1>
    <div>
      <blockquote>package.json -&gt; browserslist&nbsp;或者 .browserslist&nbsp; 添加 [“not ie &lt; 10”]</blockquote>
      <div>
        <blockquote>Vue CLI 项目会使用 @vue/babel-preset-app，它通过 @babel/preset-env 和 browserslist 配置来决定项目需要的 polyfill 默认情况下，它会把 useBuiltIns: ‘usage’ 传递给 @babel/preset-env</blockquote>
        <pre>
yarn add babel-polyfill

/** babel.config.js 添加 */

module.exports = {
  presets: [["@vue/app", { polyfills: ["es6.promise", "es6.symbol"] }]]
}
        </pre>
        <div>
          <ul>
            <li>
              <span style="color: rgb(85, 85, 85); font-size: 14px;">&nbsp;</span>
              <a href="https://babeljs.io/docs/en/next/babel-polyfill.html" style="background-color: rgb(255, 255, 255); color: rgb(0, 153, 255); margin: 0px 2px; padding: 0px; vertical-align: baseline; ">Polyfill文档</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <h1>项目结构</h1>
    <pre># public/
# -------- index.html
# src/
# -------- asstes/ # 静态资源
# -------- components/ # 组件
# -------- styles/ # 样式
# -------- utils/ # 工具
# -------- views/ # 程序页面
# -------- App.vue # 入口模板
# -------- main.js # 主程序入口
# -------- router.js # 路由
# -------- store.js # Vuex
# babel.config.js
# vue.config.js</pre>
    <h1>项目启动</h1>
    <pre>yarn   # 安装依赖包
yarn run dev   # 启动测试环境
yarn run build   # 编译项目 <br /></pre>
  </div>
</template>