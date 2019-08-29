import Vue from 'vue';
Vue.directive('move', {
    bind(el, binding, vnode) {
        // mousedown 被按下, mousemove 被移动, mouseup 被移开
        const offset = e => {
            const { offsetLeft, offsetTop, offsetParent } = e;
            let top = offsetTop, left = offsetLeft;
            if (offsetParent) {
                left += offset(offsetParent).left;
                top += offset(offsetParent).top;
            }
            return { top, left };
        };
        const { mask } = binding.modifiers;
        // 计算X轴范围
        const limitX = (offsetParent, e) => {
            let { left } = offset(offsetParent);
            let offsetWidth = offsetParent.offsetWidth + left;
            let { pageX } = e;
            if (pageX < left) pageX = left;
            if (pageX > offsetWidth) pageX = offsetWidth;
            return { pageX }
        }
        el.onmousedown = e => { // 鼠标按下
            const { pageX, pageY } = e; // 鼠标的位置      
            const offsetParent = el.offsetParent || document;
            let div;
            if (mask) {
                div = document.createElement("div");
                div.className = "a-fade-in";
                // div.id = (+new Date).toString(32);
                let { offsetWidth, offsetHeight } = el;
                let { left, top } = offset(el);
                div.style.width = offsetWidth + "px";
                div.style.height = offsetHeight + "px";
                div.style.position = "absolute";
                div.style.left = left + "px";
                div.style.top = top + "px";
                div.style.backgroundColor = "rgba(0,0,0,.3)";
                document.body.appendChild(div);
            }
            document.onmousemove = e => {  // 鼠标移动
                let x = limitX(offsetParent, e).pageX - pageX, y = e.pageY - pageY;
                if (div && mask) {
                    let left = (offset(el).left + x);
                    div.style.left = left + "px";
                }
                binding.value({ x, y, el });
            };
            document.onmouseup = e => { // 鼠标松开
                if (div && mask) {
                    document.body.removeChild(div);
                    div = null;
                }
                binding.value({
                    x: limitX(offsetParent, e).pageX - pageX,
                    y: e.pageY - pageY,
                    el, // dataset 可获取自定义值
                    isMoveEnd: true
                });
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    }

});