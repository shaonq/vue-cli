<template>
<u-md>
# 依赖的环境
* node v8.12.0 (npm v6.11.2) 
* yarn v1.12.3
* vue-cli v3.0 

# 项目环境
* VS Code [下载地址](https://pc.qq.com/detail/16/detail_22856.html)，部分插件如下：
    * Chinese (Simplified) Language Pack for Visual Studio Code  一 中文语言包 
    * Vetur   一 Vue 语法工具
    * Auto Close Tag   一 自动添加结束标签
    * IntelliJ IDEA Keybindings 一 IntelliJ风格快捷键 
    * Darcula Theme - WebStorm Edition  一 WebStorm 主题
* [Git下载地址](https://pc.qq.com/detail/13/detail_22693.html)
* [Node下载地址](https://nodejs.org/en/blog/release/v8.12.0/)  


## 全局依赖
#### 使用 yarn 管理依赖包
```javascript
 npm config set registry https://registry.npm.taobao.org  
 npm install -g yarn@1.12.3
 yarn config set registry https://registry.npm.taobao.org -g
 yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g
 yarn global add @vue/cli
```

# 支持ie10+

#### browserslist 
1. package.json -> browserslist 
2. .browserslist  

> 添加 ["not ie < 10"]


#### Polyfill
>  Vue CLI 项目会使用 @vue/babel-preset-app，它通过 @babel/preset-env 和 browserslist 配置来决定项目需要的 polyfill 默认情况下，它会把 useBuiltIns: 'usage' 传递给 @babel/preset-env

安装 `yarn add babel-polyfill`

1. vue.config.js -> transpileDependencies

2. babel.config.js ->  
```javascript
module.exports = {
  presets: [["@vue/app", { polyfills: ["es6.promise", "es6.symbol"] }]]
}
 ```
3, [Polyfill文档](https://babeljs.io/docs/en/next/babel-polyfill.html)



# 项目结构
 ```javascript
# public/
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
# vue.config.js
# [配置文件相关]
```

# 项目启动
```bash
yarn install # 安装依赖包
npm start    # 启动测试环境
npm run build # 编译项目 
```

# END
</u-md>
</template>

<script>
export default {

}


</script>

<style>

</style>
