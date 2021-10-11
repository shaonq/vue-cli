/*!https://github.com/dulnan/lazy-brush is licensed under the MIT License */
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
// new code
export default class DrawingBoard {
    /**
     * 
     * @param {HTMLElement}  canvas 
     * @param {Number}  canvas 
     * @param {height}  canvas 
     */
    constructor({ canvas, width = canvas.scrollWidth, height = canvas.scrollHeight, color = "#fc4639", backgroundImage, lineWidth }) {
        // 是否开始绘制
        this.isStart = false;
        this.canvas = canvas;

        this.setColor(color);

        const ctx = this.ctx = canvas.getContext("2d");

        this.backgroundImage = backgroundImage;

        this.setArea({ width, height })

        this.setLineWidth(lineWidth);


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
        let [mousemove, mousedown, mouseup] = [isMobile ? "touchmove" : "mousemove", isMobile ? "touchstart" : "mousedown", isMobile ? "touchend" : "mouseup"];
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
            ctx.lineWidth = Number((this.lineWidth / this.dpi).toFixed(2));
        }, false);
        document.addEventListener(mouseup, () => {
            this.isStart = false;
            points.length = 0;
            this.tempImgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        }, false);
    }
    // 真实大小
    dpiSize(x) {
        return x / this.dpi * this.ratio;
    }
    // 画笔颜色
    setColor(color) {
        this.color = color;
    }
    // 设置区域
    setArea({ width, height }) {
        this.dpi = window.innerWidth > 1024 ? 1 : window.devicePixelRatio;
        const canvas = this.canvas;
        canvas.width = width;
        canvas.height = height;
        // 比例 真实大小/实际大小
        this.ratio = Number(width / canvas.offsetWidth);
        canvas.style.width = canvas.offsetWidth + 'px'
        canvas.style.height = canvas.offsetHeight + 'px'
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
            let zoom = (this.canvas.width / this.backgroundImage.width);
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