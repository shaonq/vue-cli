<template>
	<div class="u-quill-body">
		<h1>docker部署vue项目</h1>
		<h1>工具安装</h1>
		<ul>
			<li>docker windows<a href="https://www.docker.com/products/docker-desktop" target="_blank">下载地址</a></li>
		</ul>
		<ol>
			<li>启用&nbsp;程序与功能&nbsp;Hyper-V</li>
			<li>启用&nbsp;程序与功能&nbsp;适用于 Linux&nbsp;的&nbsp;Windows&nbsp;子系统</li>
			<li>安装选择使用 WSL2</li>
		</ol>
		<figure contenteditable="false" tabindex="-1">
			<hr>
		</figure>
		<h1>项目依赖 (&nbsp;nginx&nbsp; )</h1>
		<pre>docker pull nginx</pre>
		<h1>常用命令&nbsp;</h1>
		<pre>docker image # 查看镜像
docker run --name=nginx -d -p 4030:80 nginx # 在 4030 端口上运行 nginx 镜像
# 运行之后的镜像可以在 docker 工具上直接管理和查看运行日志
</pre>
		<h1>打包镜像</h1>
		<p></p>
		<ul>
			<li>添加Dockerfile文件</li>
		</ul>
		<pre># nginx
FROM nginx
# @author: shaonq
MAINTAINER shaonq&nbsp;
# copy dist =&gt;&nbsp; /usr/share/nginx/html/
COPY dist/&nbsp; /usr/share/nginx/html/&nbsp;
</pre>
		<ul>
			<li>打包镜像</li>
		</ul>
		<pre># 打包镜像命令  docker build -t dockervue .
# 在9020端口运行镜像 docker run --name=dockervue -d -p 9020:80 dockervue 
# 其他操作可在 docker 上直接操作
      </pre>
		<blockquote> dist文件夹和Dockerfile 同级，执行打包命令就可以 </blockquote>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
	</div>
</template>
<script>
	export default {
		mounted() {
			this.$cdn.Prism();    // 代码高亮
		}
	}
</script>