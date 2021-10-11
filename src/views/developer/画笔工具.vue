<template>
	<div>
		<!-- 折线图 -->
		<div class="u-card">
			<div class="u-card__hd">
				<cite class="u-card__title u-flex__item">画笔工具</cite>
				<div  title="清除画板" @click="hb.clearCanvas(true)" class="rubber">
				<svg t="1633922835611" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5534" width="32" height="32"><path d="M584.7 768.3L246.2 429.8 577.6 98.5c3.9-3.9 10.2-3.9 14.1 0L916 422.8c3.9 3.9 3.9 10.2 0 14.1L584.7 768.3z" fill="#51B5ED" p-id="5535"></path><path d="M880.8 387.5L821 327.7c23.4 23.4 23.4 61.2 0 84.6L524.9 708.5l59.8 59.8 296.1-296.1c23.4-23.4 23.4-61.3 0-84.7z" fill="#2996D3" p-id="5536"></path><path d="M408.4 896.6L117.9 606.1c-3.9-3.9-3.9-10.2 0-14.1l145.2-145.2 304.6 304.6-145.2 145.2c-3.9 3.9-10.2 3.9-14.1 0z" fill="#E4EFF4" p-id="5537"></path><path d="M263.2 446.8L508 691.6l-110 110c-23.4 23.4-61.2 23.4-84.6 0l59.8 59.8c23.4 23.4 61.2 23.4 84.6 0l110-110-304.6-304.6z" fill="#C1DFEA" p-id="5538"></path><path d="M674.3 263.5m-12 0a12 12 0 1 0 24 0 12 12 0 1 0-24 0Z" fill="#FFFFFF" p-id="5539"></path><path d="M449.3 321.3c-3.1 0-6.1-1.2-8.5-3.5-4.7-4.7-4.7-12.2 0-16.9l135.4-135.4c4.5-4.5 12.4-4.5 16.9 0l50.8 50.8c4.7 4.7 4.7 12.2 0 16.9-4.7 4.7-12.2 4.7-16.9 0l-42.3-42.3-126.9 126.9c-2.4 2.3-5.4 3.5-8.5 3.5z" fill="#FFFFFF" p-id="5540"></path></svg>
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
		width: 20px;
		height: 20px;
		border-radius: 12px;
	}
	.active {
		box-shadow: 0 0 0 2px #fff, 0 0 0 4px currentColor;
	}
	.rubber{
		position: relative; top: -6px; left: -10px;
	}
	.dot:active,.rubber:active{
		transform: translateY(-2px);
	}
</style>
<script>
	class Point {
		/**
		 *
		 * @param {number} x
		 * @param {number} y
		 */
		constructor(x, y) {
			this.x = x
			this.y = y
		}
	}
	class LazyPoint extends Point {
		/**
		 * Update the x and y values
		 *
		 * @param {Point} point
		 */
		update(point) {
			this.x = point.x
			this.y = point.y
		}

		/**
		 * Move the point to another position using an angle and distance
		 *
		 * @param {number} angle The angle in radians
		 * @param {number} distance How much the point should be moved
		 */
		moveByAngle(angle, distance) {
			// Rotate the angle based on the browser coordinate system ([0,0] in the top left)
			const angleRotated = angle + (Math.PI / 2)

			this.x = this.x + (Math.sin(angleRotated) * distance),
				this.y = this.y - (Math.cos(angleRotated) * distance)
		}

		/**
		 * Check if this point is the same as another point
		 *
		 * @param {Point} point
		 * @returns {boolean}
		 */
		equalsTo(point) {
			return this.x === point.x && this.y === point.y
		}

		/**
		 * Get the difference for x and y axis to another point
		 *
		 * @param {Point} point
		 * @returns {Point}
		 */
		getDifferenceTo(point) {
			return new Point(this.x - point.x, this.y - point.y)
		}

		/**
		 * Calculate distance to another point
		 *
		 * @param {Point} point
		 * @returns {Point}
		 */
		getDistanceTo(point) {
			const diff = this.getDifferenceTo(point)

			return Math.sqrt(Math.pow(diff.x, 2) + Math.pow(diff.y, 2))
		}

		/**
		 * Calculate the angle to another point
		 *
		 * @param {Point} point
		 * @returns {Point}
		 */
		getAngleTo(point) {
			const diff = this.getDifferenceTo(point)

			return Math.atan2(diff.y, diff.x)
		}

		/**
		 * Return a simple object with x and y properties
		 *
		 * @returns {object}
		 */
		toObject() {
			return {
				x: this.x,
				y: this.y
			}
		}
	}
	class LazyBrush {
		/**
		 * constructor
		 *
		 * @param {object} settings
		 * @param {number} settings.radius The radius for the lazy area
		 * @param {boolean} settings.enabled
		 */
		constructor({ radius = 30, enabled = true, initialPoint = { x: 0, y: 0 } } = {}) {
			this.radius = radius
			this._isEnabled = enabled

			this.pointer = new LazyPoint(initialPoint.x, initialPoint.y)
			this.brush = new LazyPoint(initialPoint.x, initialPoint.y)

			this.angle = 0
			this.distance = 0
			this._hasMoved = false
		}

		/**
		 * Enable lazy brush calculations.
		 *
		 */
		enable() {
			this._isEnabled = true
		}

		/**
		 * Disable lazy brush calculations.
		 *
		 */
		disable() {
			this._isEnabled = false
		}

		/**
		 * @returns {boolean}
		 */
		isEnabled() {
			return this._isEnabled
		}

		/**
		 * Update the radius
		 *
		 * @param {number} radius
		 */
		setRadius(radius) {
			this.radius = radius
		}

		/**
		 * Return the current radius
		 *
		 * @returns {number}
		 */
		getRadius() {
			return this.radius
		}

		/**
		 * Return the brush coordinates as a simple object
		 *
		 * @returns {object}
		 */
		getBrushCoordinates() {
			return this.brush.toObject()
		}

		/**
		 * Return the pointer coordinates as a simple object
		 *
		 * @returns {object}
		 */
		getPointerCoordinates() {
			return this.pointer.toObject()
		}

		/**
		 * Return the brush as a LazyPoint
		 *
		 * @returns {LazyPoint}
		 */
		getBrush() {
			return this.brush
		}

		/**
		 * Return the pointer as a LazyPoint
		 *
		 * @returns {LazyPoint}
		 */
		getPointer() {
			return this.pointer
		}

		/**
		 * Return the angle between pointer and brush
		 *
		 * @returns {number} Angle in radians
		 */
		getAngle() {
			return this.angle
		}

		/**
		 * Return the distance between pointer and brush
		 *
		 * @returns {number} Distance in pixels
		 */
		getDistance() {
			return this.distance
		}

		/**
		 * Return if the previous update has moved the brush.
		 *
		 * @returns {boolean} Whether the brush moved previously.
		 */
		brushHasMoved() {
			return this._hasMoved
		}

		/**
		 * Updates the pointer point and calculates the new brush point.
		 *
		 * @param {Point} newPointerPoint
		 * @param {Object} options
		 * @param {Boolean} options.both Force update pointer and brush
		 * @returns {Boolean} Whether any of the two points changed
		 */
		update(newPointerPoint, { both = false } = {}) {
			this._hasMoved = false
			if (this.pointer.equalsTo(newPointerPoint) && !both) {
				return false
			}

			this.pointer.update(newPointerPoint)

			if (both) {
				this._hasMoved = true
				this.brush.update(newPointerPoint)
				return true
			}

			if (this._isEnabled) {
				this.distance = this.pointer.getDistanceTo(this.brush)
				this.angle = this.pointer.getAngleTo(this.brush)

				if (this.distance > this.radius) {
					this.brush.moveByAngle(this.angle, this.distance - this.radius)
					this._hasMoved = true
				}
			} else {
				this.distance = 0
				this.angle = 0
				this.brush.update(newPointerPoint)
				this._hasMoved = true
			}

			return true
		}
	}

	class BrushTool {
		constructor({ canvas, width, height, color = "red", backgroundImage, lineWidth }) {
			// 是否开始绘制
			this.isStart = false;
			this.canvas = canvas;
			// this.width = width;
			// this.height = height;
			this.setColor(color);

			const ctx = this.ctx = canvas.getContext("2d");

			this.backgroundImage = backgroundImage;

			this.setArea({ width, height })
			this.setLineWidth(lineWidth);

			const dpi = this.dpi

			this.clearCanvas();

			const middlePoint = (p1, p2) => ({ x: p1.x + (p2.x - p1.x) / 2, y: p1.y + (p2.y - p1.y) / 2 });
			let points = [], lazy = new LazyBrush({ radius: 5, enabled: true, initialPoint: { x: 0, y: 0 } });

			// 画笔移动 使用LazyBrush算法
			const moveTo = (x, y) => {
				x = this.dpiSize(x)
				y = this.dpiSize(y)
				let hasChanged = lazy.update({ x, y }) // , { both: true }
				const isDisabled = !lazy.isEnabled();
				if (hasChanged || isDisabled) {
					points.push(lazy.brush.toObject());
				}
				if (lazy.brushHasMoved() || isDisabled) {
					this.clearCanvas();
					this.putImgData(this.tempImgData); // save history
					points.push(lazy.brush.toObject());
					let p1 = points[0], p2 = points[1]
					ctx.moveTo(p2.x, p2.y);
					ctx.beginPath();

					for (var i = 1, len = points.length; i < len; i++) {
						// 使用二次贝塞尔曲线 连接 a->b 之间的中间点
						var midPoint = middlePoint(p1, p2);
						ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
						p1 = points[i]
						p2 = points[i + 1];
					}
					ctx.lineTo(p1.x, p1.y)
					ctx.stroke()

				}
			}

			// 绑定事件，支持触摸屏
			let isMobile = this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
			let mousemove = isMobile ? "touchmove" : "mousemove";
			let mousedown = isMobile ? "touchstart" : "mousedown";
			let mouseup = isMobile ? "touchend" : "mouseup";

			canvas.addEventListener(mousemove, ev => {
				let { offsetX, offsetY } = ev;
				if (isMobile) {
					let { clientX, clientY } = ev.changedTouches[0];
					let { top, left } = ev.target.getBoundingClientRect();
					offsetX = clientX - left;
					offsetY = clientY - top;
				}
				if (this.isStart) {
					moveTo(offsetX, offsetY);
					ev.preventDefault();
				}
			}, false)
			document.addEventListener(mousedown, ev => {
				this.isStart = true;
				//初始化线条 
				ctx.beginPath();
				ctx.strokeStyle = this.color;
				ctx.lineCap = "round";
				ctx.lineJoin = "round";
				ctx.lineWidth = this.dpiSize(this.lineWidth);
			}, false);
			document.addEventListener(mouseup, () => {
				this.isStart = false;
				points.length = 0;
				this.tempImgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			}, false);
		}
		// 真实大小
		dpiSize(x) {
			return x / this.dpi
		}
		// 画笔颜色
		setColor(color = "#fc4639") {
			this.color = color;
		}
		// 设置区域
		setArea({ width, height }) {
			this.dpi = window.innerWidth > 1024 ? 1 : window.devicePixelRatio;
			const canvas = this.canvas;
			canvas.width = width;
			canvas.height = height;
			canvas.style.width = canvas.width + 'px'
			canvas.style.height = canvas.height + 'px'
			this.ctx.scale(this.dpi, this.dpi);
		}
		// 设置画笔粗细
		setLineWidth(lineWidth = 3) {
			this.lineWidth = lineWidth;
		}
		// 清除画板
		clearCanvas(closeTempData) {
			if (closeTempData) this.tempImgData = null
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			if (this.backgroundImage) {
				let zoom = this.dpiSize(this.canvas.width / this.backgroundImage.width);
				this.backgroundImage && this.ctx.drawImage(
					this.backgroundImage, 0, 0, this.backgroundImage.width * zoom, this.backgroundImage.height * zoom,
				);
			}
		}
		putImgData(imgData) {
			imgData && this.ctx.putImageData(imgData, 0, 0);
		}
		exportPNG(op = 0.91) {
			return canvas.toDataURL("image/png", op)
		}
	}

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
				this.hb = new BrushTool({
					canvas,
					width: canvas.scrollWidth,
					height: 750,
					// backgroundImage: image
				});
				this.setColorIndex();
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

