
### version
* `node v14.16.0`
* `node v16.13.0(2022-04)[推荐]`
* `yarn 1.22.4`

https://blog.csdn.net/weixin_33743703/article/details/91362067
### node install
* windows install `node-v16.13.0-x64.msi `
* [Download](https://nodejs.org/dist/v16.13.0/)

### yarn install 
```
  npm install -g yarn --registry=https://registry.npm.taobao.org
  yarn config set registry https://registry.npm.taobao.org -g
  yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g
  
  # 忽略异常
  # yarn config set ignore-engines true
  
  # 变量名称列表
  # registry=https://registry.npm.taobao.org/
  # sass_binary_site=https://npm.taobao.org/mirrors/node-sass/phantomjs_cdn
  # electron_mirror=https://npm.taobao.org/mirrors/electron/
  # sqlite3_binary_host_mirror=https://foxgis.oss-cn-shanghai.aliyuncs.com/
  # profiler_binary_host_mirror=https://npm.taobao.org/mirrors/node-inspector/
  

  # tencent npm registry  
  yarn config set registry  http://mirrors.cloud.tencent.com/npm/ 
  
```

### Git
* [Download](https://pc.qq.com/detail/13/detail_22693.html)

###  Visual Studio Code
* [Download](https://pc.qq.com/detail/16/detail_22856.html)
* [visualstudio.com - Download](https://code.visualstudio.com/)
##### Plugin 
* Chinese (Simplified) Language Pack for Visual Studio Code 一 中文语言包
* Vetur  一 Vue 语法工具
```json
"vetur.format.defaultFormatter.html": "js-beautify-html",
"vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
        "wrap_line_length": 120,
        "wrap_attributes": "auto",
        "end_with_newline": false
    }
```
* Auto Close Tag 一 自动添加结束标签
* Beauify 一 格式化
* IntelliJ IDEA Keybindings 一 IntelliJ风格快捷键
* ...
### Directory Tree
 ```bash

# public/
# -------- index.html
# src/
# -------- assets/ # 静态资源
# -------- components/ # 组件
# -------- styles/ # 样式 
# -------- utils/ # 工具
# -------- locales/ # 多语言(非必须)
# -------- views/ # 程序页面
# -------- App.vue # 入口模板
# -------- main.js # 主程序入口
# -------- router.js # 路由
# -------- store.js # Vuex
# babel.config.js
# vue.config.js

```

### Run 
```
yarn  # 安装依赖包
yarn dev    # 启动测试环境
yarn build # 编译项目 
```

### END
