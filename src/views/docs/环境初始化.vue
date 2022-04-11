<template>
	<div class="u-quill-body">
		<h1>工具版本</h1>
		<ul>
			<!-- <li><del>node v10.16.0</del></li>
			<li><del>node v12.22.4</del></li>  -->
			<li class="u-color-light">node v14.16.0(2021-09)[截至 2023-04]</li>
			<li>node v16.13.0(2022-04)[推荐]</li>
			<li>yarn v1.22.18</li>
		</ul>
		<h1>工具安装</h1>
		<div>
			<ul>
				<li>
				<code>VS Code</code>
					<a href="https://pc.qq.com/detail/16/detail_22856.html">下载地址</a>，部分插件如下：
					<ol>
						<li>
							<code>Chinese (Simplified) Language Pack for Visual Studio Code</code> 一
							中文语言包
						</li>
						<li><code>Vetur</code> 一 <code>Vue</code> 语法工具</li>
						<li><code>Auto Close Tag</code> 一 自动添加结束标签</li>
						<li><code>IntelliJ IDEA Keybindings</code> 一 <code>IntelliJ</code>风格快捷键</li>
					</ol>
					<blockquote>推荐登录账号同步插件 , <code>vscode</code>,<code>git</code>,<code>nodejs</code> 安装在系统盘</blockquote>
				</li>
				<li>
					<a href="https://pc.qq.com/detail/13/detail_22693.html" style="color: rgb(0, 153, 255); margin: 0px 2px; padding: 0px; vertical-align: baseline;"><code>Git</code>下载地址</a>
				</li>
				<li>
					<a href="https://nodejs.org/en/blog/release/v14.16.0/" style="color: rgb(0, 153, 255); margin: 0px 2px; padding: 0px; vertical-align: baseline;"><code>Node</code>下载地址</a>
				</li>
			</ul>
			<h1>项目依赖包( yarn )</h1>
			<pre class="line-numbers"><code class="language-javascript">
 # npm config set registry https://registry.npm.taobao.org 
 npm install -g yarn --registry https://registry.npm.taobao.org
 yarn config set registry https://registry.npm.taobao.org -g
 yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g
 # yarn global add @vue/cli
 # yarn config set electron_mirror https://cdn.npm.taobao.org/dist/electron/
</code> </pre>
			<h1 style="color:#FF4E20">﹡ 由于2021年 taobao npm 不稳定,以下备选</h1>
			<blockquote>
				<p>
					[非必须]去除node-sass 使用dart-sass
					,(dart-sass2.0语法差异，这里使用固定版本)
				</p>
				<p>
					"sass": "~1.32.6", "sass-loader": "~10.2.0"
					<del>,"node-sass": "^4.12.0"</del>
				</p>
			</blockquote>
			<pre>
 # npm default registry	  
 npm config set registry http://registry.npmjs.org

 # tencent npm registry  
 yarn config set registry  http://mirrors.cloud.tencent.com/npm/ 

 # huawei npm registry  
 yarn config set registry https://repo.huaweicloud.com/repository/npm/
 yarn config set sass_binary_site https://repo.huaweicloud.com/node-sass

 yarn cache clean -f
 </pre>
		</div>
		<h1>兼容IE10+</h1>
		<h1 style="color:#FF4E20">﹡ 2022年6月15日后IE11将不再被支持</h1>
		<div>
			<blockquote>
				package.json -&gt; browserslist&nbsp;或者 .browserslist&nbsp; 添加 [“not
				ie &lt; 10”]
			</blockquote>
			<div>
				<blockquote>
					Vue CLI 项目会使用 @vue/babel-preset-app，它通过 @babel/preset-env 和
					browserslist 配置来决定项目需要的 polyfill 默认情况下，它会把
					useBuiltIns: ‘usage’ 传递给 @babel/preset-env
				</blockquote>
				<pre class="line-numbers">
          <code class="language-shell-session">
# vue-cli3 推荐使用 babel-polyfill@6 	  
yarn add babel-polyfill -D </code>
          <code class="language-javascript">
# babel.config.js       
  presets: [ [ "@vue/app", { useBuiltIns: "entry" } ] ]

# vue.config.js
configureWebpack: config => {
    transpileDependencies: ['*'], // node_modules 里面也需要编译的包
    configureWebpack: config => {
        config.entry.app = ["babel-polyfill", "./src/main.js"]
		...
	}	
}	
      </code>  </pre>
			</div>
		</div>
		<h1>项目结构</h1>
		<pre class="line-numbers"><code class="language-javascript">
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
</code></pre>

		<h1>项目启动</h1>
		<pre class="line-numbers"><code class="language-javascript">
yarn   # 安装依赖包
yarn dev   # 启动测试环境
yarn build   # 编译项目 
</code> </pre>
	</div>
</template>
<script>
	export default {
		mounted() {
			this.$cdn.Prism(); // 代码高亮
		},
	};
</script>
