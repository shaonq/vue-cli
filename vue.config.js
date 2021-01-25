/**！@doc https://cli.vuejs.org/zh/config/#vue-config-js  */
module.exports = {
    // 部署生产环境和开发环境下的URL。
    publicPath: process.env.NODE_ENV === "production" ? "/vue" : "./",
    // outputDir: build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）
    outputDir: "dist",
    //用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
    assetsDir: "assets",
    //指定生成的 index.html 的输出路径  (打包之后，改变系统默认的index.html的文件名)
    indexPath: "index.html",
    //生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。
    filenameHashing: true,
    //是否使用 eslint
    lintOnSave: true,
    //是否使用包含运行时编译器的 Vue 构建版本
    runtimeCompiler: false,
    //是否生成 map source
    productionSourceMap: false,
    // 进行编译的依赖
    transpileDependencies: ['vue-echarts', 'resize-detector'],
    // 它支持webPack-dev-server的所有选项
    devServer: {
        port: 8080, // 调试链接的端口号
        disableHostCheck: true, //是否关闭用于DNS重绑定的HTTP请求的host检查
        https: false, //是否启用https
        open: false, //配置自动启动浏览器
        //proxy:"" //服务器代理请求的 url
    }
}