<template >
	<div class="layout-doc" id="root">
		<header>
			<div class="layout-hd">
				<div class="layout-warp">
					<div class="u-flex u-flex--start">
						<a href="https://shaonq.github.io/">
							<img src="~@/assets/logo.png" width="256" draggable="false" />
						</a>
						<div class="u-flex__item"></div>
						<div>
							<router-link class="layout-hd__link" :to="{path:'/docs'}">相关文档</router-link>
							<router-link class="layout-hd__link" :to="{path:'/developer'}">实验室</router-link>
						</div>
					</div>
				</div>
			</div>
			<div class="layout-hd__static" style="height:60px"></div>
		</header>
		<!-- routeBar -->
		<div class="layout-hd" style="height:44px;margin-top:1px;" v-show="false">
			<div class="layout-warp">
				<u-route-bar />
			</div>
		</div>
		<!-- <div class="layout-hd__fill" style="height:44px"></div> -->
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		}
	}
</script>
<style lang="scss" >
	// 布局
	.layout {
		&-doc {
			background: #f5f5f5;
			min-height: 100vh;
		}
		&-warp {
			width: 1000px;
			margin: 0 auto;
		}
		// 主体
		&-body {
			position: relative;
			padding-bottom: 60px;
			margin: 10px auto;
		}
		&-side {
			position: relative;
			width: 240px;
			margin-left: 10px;
		}
		// 头部
		&-hd {
			position: fixed;
			width: 100%;
			z-index: 999;
			&__fill,
			& {
				height: 60px;
				background-color: #fff;
				box-shadow: 0 0 1px 0px rgba(22, 22, 22, 0.2),
					0 0 6px 2px rgba(22, 22, 22, 0.05);
			}

			&__link {
				text-decoration: none;
				color: #888;
				display: inline-block;
				padding: 0 22px;
				height: 60px;
				line-height: 60px;
				font-size: 16px;
				&.is-active {
					color: #444;
					font-weight: 600;
				}
			}
		}
	}

	.layout-body {
		.u-quill-body {
			padding: 16px 20px;
		}
		.u-quill-body h1,
		.u-quill-body h2 {
			margin-top: 2em;
			margin-block: 1em;
		}
	}
	.layout-side {
		.u-card__bd {
			color: #212121;
		}
	}
</style>
