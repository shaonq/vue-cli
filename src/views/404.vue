<template>
	<div class="card">
		<p style="font-size: 28px; color: #2f2f2f; ">404</p>
		<p style="font-size: 16px; color: #888888; margin-top: 8px;">
			对不起，系统找不到您访问的页面！
		</p>
		<router-link style="display: block;margin-top:10px;color:#FF9800" :to="{ path: '/' }">返回首页</router-link>
	</div>
</template>

<script>
	export default {};
</script>

<style lang="scss" scoped>
	.card {
		margin-bottom: 10px;
		background: #fff;
		overflow: hidden;
		border-radius: px;
		box-sizing: border-box;
		width: 620px;
		padding: 60px;
		margin: 100px auto 0;
	}
	a {
		color: #4795ef;
	}
</style>
