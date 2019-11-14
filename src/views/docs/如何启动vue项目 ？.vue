<template>
<u-md>
# 如何启动vue项目 ?
项目启动的相关安装包介绍

## Node安装
* windows 下载系统版本的`.msi`的安装包完全安装即可
* [下载地址](https://nodejs.org/dist/v8.12.0/)

## 全局依赖
#### 使用 yarn 管理依赖包
```bash
 npm config set registry https://registry.npm.taobao.org  
 npm install -g yarn@1.12.3
 yarn config set registry https://registry.npm.taobao.org -g
 yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g
```

#### 安装 vue-cli
*   `yarn global add @vue/cli`
*  [官方文档](https://cli.vuejs.org/zh/guide/installation.html)

#### 安装 Git
* [下载地址](https://pc.qq.com/detail/13/detail_22693.html)

####  Visual Studio Code 编辑器
* [镜像下载](https://pc.qq.com/detail/16/detail_22856.html) [官方下载](https://code.visualstudio.com/)
##### 插件 (自定义)
* Chinese (Simplified) Language Pack for Visual Studio Code 一 中文语言包
* Verue / ivue 一 Vue 语法工具
* Auto Close Tag 一 自动添加结束标签
* Beauify 一 格式化
* vue-format 一 vue文件格式化
* IntelliJ IDEA Keybindings 一 IntelliJ风格快捷键
* Darcula Theme - WebStorm Edition 一 WebStorm 主题


# 项目结构
 ```
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
