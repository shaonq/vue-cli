<template>
	<div>
		<!-- 折线图 -->
		<div class="u-card">
			<div class="u-card__hd">
				<cite class="u-card__title u-flex__item">画笔工具</cite>
				<div title="清除画板" @click="hb.clearCanvas(true)" class="rubber">
					<svg t="1633922835611" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5534" width="32" height="32">
						<path d="M584.7 768.3L246.2 429.8 577.6 98.5c3.9-3.9 10.2-3.9 14.1 0L916 422.8c3.9 3.9 3.9 10.2 0 14.1L584.7 768.3z" fill="#51B5ED" p-id="5535"></path>
						<path d="M880.8 387.5L821 327.7c23.4 23.4 23.4 61.2 0 84.6L524.9 708.5l59.8 59.8 296.1-296.1c23.4-23.4 23.4-61.3 0-84.7z" fill="#2996D3" p-id="5536"></path>
						<path d="M408.4 896.6L117.9 606.1c-3.9-3.9-3.9-10.2 0-14.1l145.2-145.2 304.6 304.6-145.2 145.2c-3.9 3.9-10.2 3.9-14.1 0z" fill="#E4EFF4" p-id="5537"></path>
						<path d="M263.2 446.8L508 691.6l-110 110c-23.4 23.4-61.2 23.4-84.6 0l59.8 59.8c23.4 23.4 61.2 23.4 84.6 0l110-110-304.6-304.6z" fill="#C1DFEA" p-id="5538"></path>
						<path d="M674.3 263.5m-12 0a12 12 0 1 0 24 0 12 12 0 1 0-24 0Z" fill="#FFFFFF" p-id="5539"></path>
						<path
							d="M449.3 321.3c-3.1 0-6.1-1.2-8.5-3.5-4.7-4.7-4.7-12.2 0-16.9l135.4-135.4c4.5-4.5 12.4-4.5 16.9 0l50.8 50.8c4.7 4.7 4.7 12.2 0 16.9-4.7 4.7-12.2 4.7-16.9 0l-42.3-42.3-126.9 126.9c-2.4 2.3-5.4 3.5-8.5 3.5z"
							fill="#FFFFFF" p-id="5540"></path>
					</svg>
				</div>
				<div :style="{background:color,color:color}" v-for="(color,index) in colors" :class="{active:colorsIndex===index}" :key="index" @click="setColorIndex(index)" class="u-ml dot"></div>
			</div>
			<div class="u-card__bd" style="padding:0;background:rgba(0,0,0,.01)">
				<canvas style="height:600px;width:100%;" ref="canvas"></canvas>
			</div>
		</div>
	</div>
</template>
<style scoped>
	.dot,
	.rubber {
		position: relative;
		width: 20px;
		height: 20px;
		border-radius: 12px;
		transition: all 100ms;
	}
	.active {
		box-shadow: 0 0 0 2px #fff, 0 0 0 4px currentColor;
	}
	.rubber {
		top: -6px;
		left: -10px;
	}
	.dot:active,
	.rubber:active {
		transform: translateY(-2px);
	}
</style>
<script>
	import DrawingBoard from "@/utils/DrawingBoard.js"
	export default {
		data() {
			return {
				colors: ['#212121', "#2463fe", "#57c860", "#f5cb37", "#fc4639"],
				colorsIndex: 0
			}
		},
		methods: {
			// 截取el内部内容
			dataInit() {
				let canvas = this.$refs.canvas;
				this.hb = new DrawingBoard({ canvas });
				this.setColorIndex(this.colors.length - 1);
			},
			setColorIndex(index = 0) {
				this.colorsIndex = index;
				this.hb.setColor(this.colors[index]);

			}
		},
		mounted() {
			this.dataInit()
		}
	}
</script>

