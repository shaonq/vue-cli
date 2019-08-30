# 项目介绍
vue-cli v3.0 , nodejs v8.9.3 , npm v6.11.0

# 项目环境
* VS Code ( 包含插件 )
    * Chinese (Simplified) Language Pack for Visual Studio Code  一 中文语言包 
    * Verue / ivue   一 Vue 语法工具
    * Auto Close Tag   一 自动添加结束标签
    * IntelliJ IDEA Keybindings 一 IntelliJ风格快捷键 
    * Darcula Theme - WebStorm Edition  一 WebStorm 主题
    * ...
* git bash
* nodejs  https://nodejs.org/en/blog/release/v8.9.3/

# 准备工作
```
  /** 1. npm永久使用淘宝镜像安装依赖包 */
  npm config set registry https://registry.npm.taobao.org  
  npm install -g npm
  /** 2. 安装vue-cli */
  npm install -g @vue/cli
  /** 创建一个空模板项目 */
  vue create [项目名称]
  /** 安装依赖 */
  npm install -D sass-loader node-sass element-ui
  /** DIY element 主题  https://element.eleme.cn/#/zh-CN/theme  */
```

# 项目结构
主要文件一览
```bash
   # public/
   # -------- index.html
   # src/
   # -------- asstes/          # 静态资源
   # -------- components/      # 组件 element-theme
   # -------- theme/           # 样式 
   # -------- utils/           # 工具
   # -------- views/           # 程序页面
   # -------- App.vue          # 入口模板
   # -------- main.js          # 主程序入口
   # -------- router.js        # 路由 （可更具项目需求更改为同名文件夹）
   # -------- store.js         # Vuex （可更具项目需求更改为同名文件夹）
   # babel.config.js
   # vue.config.js
```

# END
