<template>
	<div class="layout-body">
		<div class="layout-warp">
			<div class="u-flex u-flex--start">
				<div class="u-flex__item is-clamp">
					<div class="u-card" ref="body">
						<router-view></router-view>
					</div>
				</div>
				<!-- 侧边栏目 -->
				<div class="layout-side" ref="el">
					<div class="u-card">
						<div class="u-card__bd" style="padding:8px 0">
							<router-link style="display: block;font-size:14px;line-height:36px;" v-for="(item,index) in list" :key="index" class="u-dialog--dropdown-item" :to="{path:item.to}" exact>{{item.name}}</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { developerRoute } from "@/views/routeFile.js";
	export default { data() { return { list: developerRoute } } }
</script>
<style lang="scss">
</style>
