let attr = "data-u-dialog";
const isUndefined = value => typeof value === "undefined";
function dialog() {
  const open = (options = {}) => {
    // default options key
    if (isUndefined(options.shadow)) options.shadow = true;
    if (isUndefined(options.shadowClose)) options.shadowClose = true;
    if (isUndefined(options.showClose)) options.showClose = false;
    // created element
    const maskEl = document.createElement("div");
    const id = (+new Date).toString(32);
    maskEl.className = "u-dialog-mask";
    if (options.shadow) maskEl.classList.add("is-show");
    if (options.shadow < 1 && options.shadow > 0) maskEl.style.opacity = options.shadow;
    maskEl.setAttribute("data-u-dialog", id);
    const el = document.createElement("div");
    el.className = "u-dialog";
    // add skin className
    const skin = options.skin || options.className;
    if (skin) el.classList.add(skin);
    // add extend
    if (options.extend) { el.classList.add("is-extend"); maskEl.classList.add("is-extend"); }
    el.setAttribute("data-u-dialog", id);
    // change xss
    const filterXss = (value = "") => value.replace(/ipt>/g, "ipt&gt;")
    options.title = filterXss(options.title);
    options.content = filterXss(options.content);
    options.width = options.width ? options.width : "auto";
    options.height = options.height ? options.height : "auto";
    el.innerHTML = `
      <div class="u-dialog-content" style="width:${options.width};height:${options.height}">
        <div class="u-dialog-title ${options.title ? "is-show" : ""}"> ${options.title}</div>
        <div class="u-dialog-body">${options.content}</div>
        <div class="u-dialog-close ${options.showClose ? "is-show" : ""}">x</div>
      </div> `;
    document.body.appendChild(maskEl);
    document.body.appendChild(el);
    const winHeight = window.innerHeight;
    const winWidth = window.innerWidth;
    // set position width/height
    {
      let offset = options.offset || ["auto", "auto"];
      el.style.top = offset[0] === "auto" ? Math.max((winHeight - el.clientHeight) / 2, 0) + "px" : offset[0];
      el.style.left = offset[1] === "auto" ? Math.max((winWidth - el.clientWidth) / 2, 0) + "px" : offset[1];
      el.classList.add("is-show");
    }
    // add event
    if (options.shadowClose) maskEl.onclick = () => this.hideToast(maskEl.getAttribute(attr));
    if (options.showClose) el.querySelector(".u-dialog-close").onclick = () => this.hideToast(el.getAttribute(attr));
    if (options.time) setTimeout(() => this.hideToast(el.getAttribute(attr)), options.time * 1e3);
    if (typeof options.success === "function") options.success(id, el);
    // @bug  IE not`s support vh
    {
      let elc = el.querySelector(".u-dialog-content");
      let elhh = el.querySelector(".u-dialog-title").clientHeight;
      let elch = winHeight - elhh;
      elc.style.maxHeight = elch + 'px';
      el.querySelector(".u-dialog-body").style.maxHeight = (elch - elhh) + 'px';
    }
    // width height auto
    {
      let offsetTop = el.clientHeight + el.offsetTop;
      let offsetLeft = el.clientWidth + el.offsetLeft;
      if (offsetTop > (winHeight - 10)) el.style.top = (winHeight - el.clientHeight - 10) + "px";
      if (offsetLeft > (winWidth - 10)) el.style.top = (winWidth - el.clientWidth - 10) + "px";
    }
    // return clsoe index
    return id;
  };
  this.hideToast = id => {
    function remove(el) {
      el.classList.remove("is-show");
      let cl = () => el.parentNode && el.parentNode.removeChild(el);
      setTimeout(cl, 300);
    }
    // Array.prototype.forEach.call(document.querySelectorAll(`[${attr}]`), el => {
    //   id ? id == el.getAttribute(attr) && remove(el) : (!~el.className.indexOf('is-extend') && remove(el));
    // });
    [].slice.call(document.querySelectorAll(`[${attr}]`)).forEach(el => {
      id ? id == el.getAttribute(attr) && remove(el) : (!~el.className.indexOf('is-extend') && remove(el));
    })
  };
  this.toast = (content, time = 2) => {
    this.hideToast();
    return open({
      className: "u-dialog__toast",
      content,
      width: "auto",
      shadow: false,
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
        shadow: 0.3,
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
      shadow: false,
      shadowClose: false,
      time
    });
  };
  this.showModal = content => {
    this.hideToast();
    typeof content === "string" && (content = { content });
    if (isUndefined(content.width)) content.width = "320px";
    if (isUndefined(content.height)) content.height = "240px";
    if (isUndefined(content.time)) content.time = 0;
    if (isUndefined(content.shadowClose)) content.shadowClose = false;
    if (isUndefined(content.showClose)) content.showClose = true;
    return open(content);
  };
  this.showContextMenu = ({ offset, list, success }) => {
    let render = (list) => {
      let html = '';
      for (let i in list) {
        let item = list[i], p = '', isChildren = item.children && item.children.length
        if (isChildren) p = render(item.children);
        html += `<div class="u-dialog--contextmenu-item ${item.border ? 'is-border' : ''} ${isChildren ? 'is-children' : ''}" data-code="${item.code}">${item.text}${p}</div>`
      }
      return `<div>${html}</div>`
    }
    this.showModal({
      content: render(list),
      shadow: false,
      width: "auto",
      height: "auto",
      skin: "u-dialog--contextmenu",
      showClose: false,
      offset,
      success: (index, el) => {
        [].forEach.call(el.querySelectorAll('.u-dialog--contextmenu-item'), self => {
          if (!~self.className.indexOf("is-children")) {
            const close = () => {
              this.hideToast(index);
              document.removeEventListener("click", close, false);
            }
            self.addEventListener("click", e => {
              success && success({
                text: self.innerText,
                code: self.getAttribute("data-code")
              });
              close();
              e.stopPropagation();
              e.preventDefault();
            })
            document.addEventListener("click", close, false);
          }
        })
      }
    });
  }

  /**
   ** 扩展:extend
   ** uplaodAvartar 头像上传
   ** change : Function 读取图片信息 Object *
   ** success : Function 返回图片地址 Srting 
   */
  this.uplaodAvartar = function (options = {}) {
    const showModal = this.showModal;
    function imageInit(callback) {
      let input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = e => {
        // console.log(e);
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
      showModal({
        extend: true,
        title: "上传头像",
        shadow: 0.8,
        width: "400px",
        height: "540px",
        content: `<div class="u-center u-noselect">
                   <p style="margin: 20px 0;color: #888;">调整头像位置</p>
                   <div><canvas width="240" height="240" style="width: 240px; height: 240px; cursor: grab;"></canvas></div>
                   <p style="margin-top:40px"><button style="width:240px;" class="${options.btnClass || 'u-btn'}"> 保存</button></p>
                   </div> `,
        success(index, el) {
          let canvas = el.querySelector("canvas");
          const ctx = canvas.getContext("2d");
          if (typeof callback === "function") {
            callback(canvas, ctx);
            let button = el.querySelector("button");
            button.onclick = function () {
              let imgData = ctx.getImageData(40, 40, 160, 160);
              let _canvas = document.createElement("canvas");
              let _ctx = _canvas.getContext("2d");
              _canvas.width = _canvas.height = 160;
              _ctx.putImageData(imgData, 0, 0);
              let base64 = _canvas.toDataURL("image/png", 0.91);
              imgData = _canvas = _ctx = null;
              typeof options.success === "function" && options.success(base64, index);
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

        canvas.onmousedown = e => {
          let clientX = e.pageX || e.clientX;
          let clientY = e.pageY || e.clientY;

          canvas.style.cursor = "grabbing";
          document.onmousemove = e => {
            let cX = e.pageX || e.clientX;
            let cY = e.pageY || e.clientY;
            let width = cX - clientX;
            let height = cY - clientY;
            drawImage({ width, height });
          };
          document.onmouseup = e => {
            canvas.style.cursor = "grab";
            clientX = e.pageX || e.clientX;
            clientY = e.pageY || e.clientY;
            document.onmousemove = null;
          };
        };
        drawImage();
      });
    });
  };
}

export default new dialog();
