<template>
	<div class="u-quill-body">
		<h1>docker搭建koa开发环境</h1>
		<h1>工具安装</h1>
		<ul>
			<li>docker windows<a href="https://www.docker.com/products/docker-desktop" target="_blank">下载地址</a></li>
		</ul>
		<hr>
		<ol>
			<li><code>images: node:10.16.0 + nginx +mysql:5.6 </code></li>
			<li>
				<code>koa: koa + koa-router + mysql + promise-mysql</code>
			</li>
			<li><code>docker-compose</code></li>
		</ol>
		<figure contenteditable="false" tabindex="-1">
			<hr>
		</figure>
		<h1>根目录文件</h1>
		<ul>
			<li>server.js</li>
		</ul>
		<pre>
const Koa = require('koa')
const Router = require('koa-router')
const mysql = require('promise-mysql')
const app = new Koa()
const router = new Router()

// 根路由
router.get('/', async ctx=>{ctx.body = 'hello word'});

// 测试mysql连接路由
router.get('/db', async ctx=>{
let db = await mysql.createPool({
	host: 'mysql',
	port: 3306,
	user: 'root',
	password: '123456'
})
let res = await db.query('SHOW DATABASES')
ctx.body = res
})

app.use(router.routes())
app.listen(3000)
</pre>
		<ul>
			<li>package.json</li>
		</ul>
		<pre>{
  "name": "docker-koa",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon server.js"
  },
  "keywords": [],
  "author": "shaonq",
  "license": "MIT",
  "dependencies": {
    "koa": "^2.13.1",
    "koa-router": "^10.0.0",
    "nodemon": "^2.0.12",
    "promise-mysql": "^5.0.3"
  }
}
</pre>
		<ul>
			<li>.dockerignore</li>
		</ul>
		<pre>
*.log
.idea
.node_modules
node_modules
.vscode
</pre>
		<ul>
			<li>docker-compose.yml</li>
		</ul>
		<pre>version: "3"
services:
        koa:
                image: node:10.16.0                          #node镜像名称
                working_dir: /koa                            #工作目录的路径
                build:                                       #构建镜像
                     context: ./                            #上下文环境
                     dockerfile: ./compose/koa.Dockerfile            #Dockerfile路径
                volumes:                                     #挂载点 [格式] 本地文件:映射路径
                        - .:/koa                             # 
                ports:                                       #端口映射
                        - "3000:3000"                        #本地端口:容器端口
                command: npm start #这条命令会在工作目录下执行
        mysql:
                image: mysql:5.6
                volumes:
                        - ./mysql:/var/lib/mysql
                command: --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
                restart: always
                environment:
                        - MYSQL_ROOT_PASSWORD=123456         #root password 
                        - MYSQL_DATABASE=db_database
                ports:
                        - "3306:3306"
        nginx:
                image: nginx:latest
                volumes:
                        - ./static:/code/static
                        - ./compose/nginx.conf:/etc/nginx/conf.d/default.conf
                ports:
                        - "80:80"
</pre>

		<ul>
			<li>compose/nginx.conf</li>
		</ul>
		<pre>server {
    listen       80;
    server_name  localhost;

    location /static {
        alias /koa/static;             # 代理访问/koa/下的static
    }

    location / {
        proxy_pass http://koa:3000;    #  docker-compose.yml koa
    }
}
			</pre>
		<ul>
			<li>compose/koa.Dockerfile</li>
		</ul>
		<pre>
FROM node:10.16.0                       # 使用的基础镜像文件
WORKDIR /koa                            # 工作目录的路径
COPY ./package.json ./server.js /koa/   # 拷贝文件到/koa
COPY ./static /koa/static               # 拷贝文件到/koa/static
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
	&& apk update && apk add yarn \
	&& yarn config set registry https://registry.npm.taobao.org/ \
	&& yarn       # 设置镜像源到国内, 更新; 安装yarn,yarn设置国内镜像源，安装依赖
CMD ["npm", "start"]  # 容器启动时运行
			</pre>

	</div>

</template>
<script>
	export default {
		mounted() {
			this.$cdn.Prism();    // 代码高亮
		}
	}
</script>