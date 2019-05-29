# 项目介绍
从vue-cli2.0 更新到 vue-cli 3.0 , nodejs(v9.10.1)和npm(v5.8.0)更新。
> npm 在nodev10 下面会有警告 <(`^′)>,建议使用nodev9+版本  

# 项目环境
* VS Code ( 包含插件 )
    * Chinese (Simplified) Language Pack for Visual Studio Code  一 中文语言包 
    * Verue / ivue   一 Vue 语法工具
    * Auto Close Tag   一 自动添加结束标签
    * IntelliJ IDEA Keybindings 一 IntelliJ风格快捷键 
    * Darcula Theme - WebStorm Edition  一 WebStorm 主题
    * ...
* git bash
* nodejs  https://nodejs.org/en/blog/release/v9.10.1/
> 安装 VS Code（开发工具） , git , nodejs

# 准备工作
```
  /** 1. npm永久使用淘宝镜像安装依赖包 */
  npm config set registry https://registry.npm.taobao.org  
  /** 2. 安装vue-cli3.0 /
  npm install -g @vue/cli
  /** 创建一个默认模板的 vue-cli3.0 项目 */
  vue create [项目名称]
  /** 主要这个sass ,这个容易安装失败 ╮(╯▽╰)╭ */
  npm install -D sass-loader node-sass
```
# 项目结构
主要文件一览
```bash
   # public/
   # -------- index.html
   # src/
   # -------- asstes/          # 静态资源
   # -------- components/      # 组件
   # -------- theme/           # 样式
   # -------- utils/           # 工具
   # -------- views/           # 程序页面 （同vue-cli2.0 的pages）
   # -------- App.vue          # 入口模板
   # -------- main.js          # 主程序入口
   # -------- router.js        # 路由 （可更具项目需求更改为同名文件夹）
   # -------- store.js         # Vuex （可更具项目需求更改为同名文件夹）
   # babel.config.js
   # vue.config.js
```

# END
