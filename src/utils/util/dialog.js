/**
 * @name 基础弹窗插件
 * @date 2019-01-09
 * @author shaonq@qq.com
 */
let index = 0;
let attr = "data-u-dialog";
function dialog() {
  const isUndefined = value => typeof value === "undefined";
  const open = (options = {}) => {
    if (isUndefined(options.showShadow)) options.showShadow = true;
    if (isUndefined(options.shadowClose)) options.shadowClose = true;
    if (isUndefined(options.showClose)) options.showClose = false;
    const id = (+new Date() + ++index).toString(32);
    // element
    let maskEl = document.createElement("div");
    maskEl.className = "u-dialog-mask " + (options.showShadow ? "is-show" : "");
    if (options.showShadow < 1 && options.showShadow > 0)
      maskEl.style.opacity = options.showShadow;
    maskEl.setAttribute("data-u-dialog", id);
    let el = document.createElement("div");
    el.className = "u-dialog " + (options.className || "");
    el.setAttribute("data-u-dialog", id);
    // xss
    const filterXss = value => {
      return value ? value.replace(/<[\/]*script>/ig, "[script]") : "";
    };
    options.title = filterXss(options.title);
    options.content = filterXss(options.content);
    options.width = options.width ? options.width : "910px";
    options.height = options.height ? options.height : "auto";
    el.innerHTML = `
            <div class="u-dialog-content"
                style="width:${options.width};height:${options.height}">
                <div class="u-dialog-title ${options.title ? "is-show" : ""}">
                ${options.title}</div>
                <div class="u-dialog-body">${options.content}</div>
                <div 
                class="u-dialog-close ${options.showClose ? "is-show" : ""}">
                x</div>
            </div> `;
    document.body.appendChild(maskEl);
    document.body.appendChild(el);
    // position
    let top = Math.max((window.innerHeight - el.clientHeight) / 2, 0);
    let left = Math.max((window.innerWidth - el.clientWidth) / 2, 0);
    el.style.top = top + "px";
    el.style.left = left + "px";
    el.classList.add("is-show");
    // event
    if (options.shadowClose)
      maskEl.onclick = () => this.hideToast(maskEl.getAttribute(attr));
    if (options.showClose)
      el.querySelector(".u-dialog-close").onclick = () =>
        this.hideToast(el.getAttribute(attr));
    if (options.time)
      setTimeout(
        () => this.hideToast(el.getAttribute(attr)),
        options.time * 1e3
      );
    if (typeof options.success === "function") options.success.call(el, id);
    return id;
  };
  this.hideToast = id => {
    function remove(el) {
      el.classList.remove("is-show");
      setTimeout(() => {
        let parent = el.parentNode;
        if (parent) parent.removeChild(el);
      }, 150);
    }
    Array.prototype.forEach.call(document.querySelectorAll(`[${attr}]`), el => {
      id ? id == el.getAttribute(attr) && remove(el) : remove(el);
    });
  };
  this.toast = (content, time = 2) => {
    this.hideToast();
    return open({
      className: "u-dialog__toast",
      content,
      width: "auto",
      showShadow: false,
      shadowClose: false,
      time
    });
  };
  this.showLoading = content => {
    let el = document.querySelector(".u-dialog__loading");
    if (!el) {
      this.hideToast();
      return open({
        className: "u-dialog__loading",
        content: `<i></i><p>${content || ""}</p>`,
        width: "120px",
        height: "120px",
        showShadow: 0.3,
        shadowClose: false
      });
    } else {
      el.querySelector("p").innerHTML = content;
      return el.getAttribute(attr);
    }
  };
  this.showSuccess = (content, time = 2) => {
    this.hideToast();
    return open({
      className: "u-dialog__success",
      content: `<i></i><p>${content || ""}</p>`,
      width: "120px",
      height: "120px",
      showShadow: false,
      shadowClose: false,
      time
    });
  };
  this.showLayer = content => {
    this.hideToast();
    typeof content === "string" && (content = { content });
    if (isUndefined(content.width)) content.width = "320px";
    if (isUndefined(content.height)) content.height = "240px";
    if (isUndefined(content.time)) content.time = 0;
    if (isUndefined(content.shadowClose)) content.shadowClose = false;
    if (isUndefined(content.showClose)) content.showClose = true;
    return open(content);
  };

  /**
   * 扩展
   * uplaodAvartar 头像上传
   * btnClass Object
   * change : Function 读取图片信息 Object
   * success : Function 返回图片地址 Srting
   */

  this.uplaodAvartar = function(options) {
    if (typeof options === "function") options = { success: options }
    if (typeof options !== "object") throw ""
    if (!options.btnClass) options.btnClass = "u-button u-button__blue u-button__spread";
    const showLayer = this.showLayer;
    function imageInit(callback) {
      let input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = e => {
        const file = (e.target || e.path[0]).files[0];
        /** 名称，大小，类型 */
        let { name, size, type } = file;
        if (typeof callback === "function") {
          /** 图片转base64 */
          const reader = new FileReader();
          reader.readAsDataURL(file);
          let img = new Image();
          reader.onload = ({ target }) => {
            img.onload = () => {
              callback(img, {
                width: img.width,
                height: img.height,
                size: size,
                MB: Math.ceil((size / 1024 / 1024) * 100) / 100,
                name,
                type
              });
            };
            img.src = target.result;
          };
        }
        input = null;
      };
      input.click();
    }
    function canvasInit(callback) {
      showLayer({
        extend: true,
        title: "上传头像",
        showShadow: 0.8,
        width: "400px",
        height: "540px",
        content: `<div class="u-center">
                   <p style="margin: 20px 0;color: #888;">调整头像位置</p>
                   <div><canvas width="240" height="240" style="width: 240px; height: 240px; cursor: grab;"></canvas></div>
                   <p style="margin:40px auto 0;width:240px;"><button class="${options.btnClass}"> 保存</button></p>
                   </div>
                  `,
        success() {
          let canvas = this.querySelector("canvas");
          const ctx = canvas.getContext("2d");
          if (typeof callback === "function") {
            callback(canvas, ctx);
            let button = this.querySelector("button");
            button.onclick = function() {
              let imgData = ctx.getImageData(40, 40, 160, 160);
              let _canvas = document.createElement("canvas");
              let _ctx = _canvas.getContext("2d");
              _canvas.width = _canvas.height = 160;
              _ctx.putImageData(imgData, 0, 0);
              let base64 = _canvas.toDataURL("image/png", 0.91);
              imgData = _canvas = _ctx = null;
              typeof options.success === "function" && options.success(base64);
            };
          }
        }
      });
    }
    // image 信息
    imageInit((img, info) => {
      /**
       * 模型设计
       * 横：40+160+40 = 240
       * 数：40+160+40 = 240
       */
      const cWidth = 240; // canvas 宽度
      const cLine = 40; // 遮罩层宽度
      const iWidth = cWidth - cLine * 2; // 图片宽度
      // 通过固定高度计算长度，反之亦可
      function h2w(width, height) {
        return width / (height / iWidth);
      }
      // 限制范围
      function m2m(min, max, value) {
        if (value > max) return max;
        if (value < min) return min;
        return value;
      }

      /**
       * 图片创建成功 开始创建画布
       *
       * 如不满足条件可以阻断
       *
       */

      if (typeof options.change === "function" && !options.change(info)) return;

      canvasInit((canvas, ctx) => {
        const { width, height } = info;
        function drawImage(offset = { width: 0, height: 0 }) {
          ctx.clearRect(0, 0, cWidth, cWidth);
          ctx.fillStyle = "#ccc";
          ctx.fillRect(0, 0, cWidth, cWidth);
          ctx.fill();
          // 是否水平
          let isHorizontal = width >= height;
          // 画图 ctx.drawImage(image, dx, dy, dWidth, dHeight);
          let dx, dy, dWidth, dHeight;
          let max = cLine;
          if (isHorizontal) {
            dWidth = h2w(width, height);
            dHeight = iWidth;
            dx = (cWidth - dWidth) / 2;
            dy = cLine;
            // 可移动范围
            let min = dHeight + cLine - dWidth;
            dx = dx + offset.width;
            dx = m2m(min, max, dx);
          } else {
            dWidth = iWidth;
            dHeight = h2w(height, width);
            dx = cLine;
            dy = (cWidth - dHeight) / 2;
            // 可移动范围
            let min = dWidth + cLine - dHeight;
            dy = dy + offset.height;
            dy = m2m(min, max, dy);
          }

          ctx.drawImage(img, dx, dy, dWidth, dHeight);
          ctx.stroke();
          ctx.fillStyle = "rgba(250,250,250,.88)";
          ctx.fillRect(0, 0, 40, 240);
          ctx.fillRect(200, 0, 40, 240);
          ctx.fillRect(40, 0, 160, 40);
          ctx.fillRect(40, 200, 160, 40);
          ctx.fill();
        }
        // 绑定事件
        canvas.onmousedown = ea => {
          let clientX = ea.pageX || ea.clientX;
          let clientY = ea.pageY || ea.clientY;

          canvas.style.cursor = "grabbing";
          document.onmousemove = eb => {
            let cX = eb.pageX || eb.clientX;
            let cY = eb.pageY || eb.clientY;
            let width = cX - clientX;
            let height = cY - clientY;
            drawImage({ width, height });
          };
          document.onmouseup = () => {
            canvas.style.cursor = "grab";
            document.onmousemove = null;
          };
        };
        drawImage();
      });
    });
  };
}

export default new dialog();
