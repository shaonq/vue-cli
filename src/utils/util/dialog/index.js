let attr = "data-u-dialog";
const isUndefined = value => typeof value === "undefined";
const dom = {
  ie: Number(document.documentMode) | 0,
  on: (function () {
    if (document.addEventListener) {
      return function (element, event, handler) {
        if (element && event && handler) {
          element.addEventListener(event, handler, false);
        }
      }
    } else {
      return function (element, event, handler) {
        if (element && event && handler) {
          element.attachEvent('on' + event, handler);
        }
      }
    }
  })(),
  off: (function () {
    if (document.removeEventListener) {
      return function (element, event, handler) {
        if (element && event) {
          element.removeEventListener(event, handler, false);
        }
      }
    } else {
      return function (element, event, handler) {
        if (element && event) {
          element.detachEvent('on' + event, handler);
        }
      }
    }
  })(),
  once: function (el, event, fn) {
    var off = this.off;
    var listener = function () {
      if (fn) fn.apply(this, arguments)
      off(el, event, listener);
    };
    this.on(el, event, listener)
  },
  // 位置信息
  position: function (el) {
    const box = el.getBoundingClientRect();
    // html元素对象的上/左边框的宽度
    const { clientTop, clientLeft } = document.documentElement;
    const { pageYOffset, pageXOffset } = window;
    return {
      top: box.top - clientTop,
      left: box.left - clientLeft,
      height: el.clientHeight,
      width: el.clientWidth,
      pageYOffset,
      pageXOffset,
    }
  },
  el: function (attr, doc) {
    if (!doc) doc = document;
    return doc.querySelector(attr)
  },
  els: function (attr, doc) {
    if (!doc) doc = document;
    return [].slice.call(doc.querySelectorAll(attr))
  },
  hasClass: function (el, cls) {
    if (!el || !cls) return false;
    if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
    if (el.classList) {
      return el.classList.contains(cls);
    } else {
      return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
  },
  addClass: function (el, cls) {
    if (!el) return;
    var curClass = el.className;
    var classes = (cls || '').split(' ');

    for (var i = 0, j = classes.length; i < j; i++) {
      var clsName = classes[i];
      if (!clsName) continue;

      if (el.classList) {
        el.classList.add(clsName);
      } else if (!this.hasClass(el, clsName)) {
        curClass += ' ' + clsName;
      }
    }
    if (!el.classList) {
      el.className = curClass;
    }
  },
  removeClass: function (el, cls) {
    if (!el || !cls) return;
    var classes = cls.split(' ');
    var curClass = ' ' + el.className + ' ';

    for (var i = 0, j = classes.length; i < j; i++) {
      var clsName = classes[i];
      if (!clsName) continue;

      if (el.classList) {
        el.classList.remove(clsName);
      } else if (this.hasClass(el, clsName)) {
        curClass = curClass.replace(' ' + clsName + ' ', ' ');
      }
    }
    if (!el.classList) {
      el.className = curClass;
    }
  },
  append(el, doc) {
    if (!doc) doc = document.body;
    doc.appendChild(el);
  },
  remove(el) {
    if (el && el.parentNode) el.parentNode.removeChild(el)
  }
}

function dialog() {
  this.dom = dom;
  const open = (options = {}) => {
    // default options key
    if (isUndefined(options.shadow)) options.shadow = true;
    if (isUndefined(options.shadowClose)) options.shadowClose = true;
    if (isUndefined(options.showClose)) options.showClose = false;
    // created element
    const mel = document.createElement("div");
    const id = (+new Date).toString(32);
    mel.className = "u-dialog-mask";
    if (options.shadow) dom.addClass(mel, "is-show");
    if (options.shadow < 1 && options.shadow > 0) mel.style.opacity = options.shadow;
    mel.setAttribute("data-u-dialog", id);
    const el = document.createElement("div");
    el.className = "u-dialog";
    // add skin className
    const skin = options.skin || options.className;
    if (skin) dom.addClass(el, skin);
    // add extend
    if (options.extend) {
      dom.addClass(el, "is-extend"); dom.addClass(mel, "is-extend");
    }
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
    mel.oncontextmenu = el.oncontextmenu = () => false;
    dom.append(mel);
    dom.append(el);
    const winHeight = window.innerHeight;
    const winWidth = window.innerWidth;
    // set position width/height
    {
      let offset = options.offset || ["auto", "auto"];
      el.style.top = offset[0] === "auto" ? Math.max((winHeight - el.clientHeight) / 2, 0) + "px" : offset[0];
      el.style.left = offset[1] === "auto" ? Math.max((winWidth - el.clientWidth) / 2, 0) + "px" : offset[1];
      dom.addClass(el, "is-show");
    }
    // add event
    if (options.shadowClose) mel.onclick = () => this.hideToast(mel.getAttribute(attr));
    if (options.showClose) dom.on(dom.el(".u-dialog-close", el), "click", () => this.hideToast(el.getAttribute(attr)));
    if (options.time) setTimeout(() => this.hideToast(el.getAttribute(attr)), options.time * 1e3);
    if (typeof options.success === "function") options.success(id, el);
    // @bug  IE not`s support vh
    {
      let elc = dom.el(".u-dialog-content", el);
      let elhh = dom.el(".u-dialog-title", el).clientHeight;
      let elch = winHeight - elhh;
      elc.style.maxHeight = elch + 'px';
      dom.el(".u-dialog-body", el).style.maxHeight = (elch - elhh) + 'px';
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
      dom.removeClass(el, "is-show");
      let cl = () => dom.remove(el);
      setTimeout(cl, 300);
    }
    dom.els(`[${attr}]`).forEach(el => {
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
    let el = dom.el(".u-dialog__loading", el);
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
      dom.el("p", el).innerHTML = content;
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


  this.alert = content => {
    this.hideToast();
    typeof content === "string" && (content = { content });
    if (isUndefined(content.width)) content.width = "380px";
    if (isUndefined(content.time)) content.time = 0;
    if (isUndefined(content.title)) content.title = "提示";
    if (isUndefined(content.shadowClose)) content.shadowClose = true;
    if (isUndefined(content.showClose)) content.showClose = false;
    if (!content.cancel) content.cancel = { label: "取消" };
    let okhtml = '', cancelHtml = `<a class="u-btn">${content.cancel.label}</a>`;
    // ok:{label,onclick,skin}
    if (typeof content.ok === "function") { content.ok = { onclick: content.ok } }
    let isok = typeof content.ok === "object";
    if (isok) {
      let label = content.ok.label || "确认";
      okhtml = `<a class="u-btn u-btn--primary ${content.ok.skin ? content.ok.skin : 'u-btn--blue'}">${label}</a>`;
    }
    content.skin = "u-dialog__alert";
    content.content = `<div style="min-height:5em">${content.content}</div>${okhtml}${cancelHtml}<div></div>`;
    content.success = (index, el) => {
      dom.els(".u-btn", el).forEach(btn => {
        dom.on(btn, "click", () => {
          if (dom.hasClass(btn, 'u-btn--primary') && isok) {
            let onclick = content.ok.onclick;
            typeof onclick === "function" ? onclick(index, btn) : this.hideToast(index)
          } else {
            let onclick = content.cancel.onclick;
            typeof onclick === "function" ? onclick(index, btn) : this.hideToast(index)
          }
        })
      })
    }


    return open(content);
  }


  this.showModal = content => {
    this.hideToast();
    typeof content === "string" && (content = { content });
    if (isUndefined(content.width)) content.width = "320px";
    if (isUndefined(content.height)) content.height = "240px";
    if (isUndefined(content.time)) content.time = 0;
    if (isUndefined(content.shadowClose)) content.shadowClose = false;
    if (isUndefined(content.showClose)) content.showClose = true;
    return open(content);
  }


  /**
   * 生成条目弹窗
   * offset 位置
   * skin 样式
   * @param {Array} list :[{  label: "不可选", value: "remove", disabled: true, border: true   }]
   * @param {String} code :默认选中code
   * @param {Function} success =>(index, el) 
   */


  /**
   * popover 弹出组件
   * popover
   */
  this.showPopover = options => {
    return this.showModal({
      content: options.content,
      shadow: false,
      width: "auto",
      height: "auto",
      skin: options.skin,
      showClose: false,
      offset: options.offset,
      success: (index, el) => {
        dom.once(document, "scroll", () => this.hideToast(index));
        setTimeout(() => dom.once(document, "click", () => this.hideToast(index)), 100)
        dom.on(el, "click", e => { e.stopPropagation(), e.preventDefault() })
        options.success && options.success(index, el);
      }
    })
  }

  /**
   * 创建列表模板
   * @param {Array} list: [{label,value}]
   * @param {Array} value: default value
   */
  this.createLabelValue = ({ skin, list, value = "" }) => {
    return list.reduce((html, item) => {
      let childrenHtml = '', isChildren = item.children && item.children.length
      if (isChildren) childrenHtml = render(item.children);
      html += `<div class="${skin}-item${item.border ? ' is-border' : ''}${item.disabled ? ' is-disabled' : ''}${isChildren ? ' is-children' : ''}${item.value == value ? ' is-active' : ''}" data-value="${item.value}">${item.label}${childrenHtml}</div>`
      return html
    }, "")
  }

  this.showDropdown = ({ offset, success, list, value }) => {
    const skin = "u-dialog--dropdown";
    return this.showPopover({
      offset, skin, list,
      content: this.createLabelValue({ skin, list, value }),
      success: (index, el) => {
        dom.els(`.${skin}-item`).forEach(self => {
          if (dom.hasClass(self, 'is-disabled')) return;
          if (dom.hasClass(self, 'is-children')) return;
          dom.on(self, "click", e => {
            success && success({ label: self.innerText, value: self.getAttribute("data-value") });
            this.hideToast(index);
          })
        })
      }
    })
  }

  this.showContextMenu = ({ offset, success, list }) => {
    const skin = "u-dialog--contextmenu";
    return this.showPopover({
      offset, skin, list,
      content: this.createLabelValue({ skin, list }),
      success: (index, el) => {
        dom.els(`.${skin}-item`).forEach(self => {
          if (dom.hasClass(self, 'is-disabled')) return;
          if (dom.hasClass(self, 'is-children')) return;
          dom.on(self, "click", e => {
            success && success({ label: self.innerText, value: self.getAttribute("data-value") });
            this.hideToast(index);
          })
        })
      }
    })
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
      /* @bug   IE <= 10    */
      if (dom.ie && dom.ie <= 10) {
        input.style.clip = "rect(0px, 0px, 0px, 0px)";
        dom.append(input);
        setTimeout(a => dom.remove(input), 100)
      }
      input.click();
    }
    function canvasInit(callback) {
      showModal({
        extend: true,
        title: options.title || "上传头像",
        shadow: 0.8,
        width: "auto",
        height: "auto",
        content: `<div class="u-center u-noselect">
                   <p style="margin: 20px 0;color: #888;">${options.desc || "调整头像位置"}</p>
                   <div style="padding: 10px 40px;"><canvas width="240" height="240" style="width: 240px; height: 240px; cursor: grab;"></canvas></div>
                   <p style="margin:40px 0"><button style="width:240px;" class="${options.btnClass || 'u-btn'}"> 保存</button></p>
                   </div> `,
        success(index, el) {
          let canvas = dom.el("canvas", el);
          const ctx = canvas.getContext("2d");
          if (typeof callback === "function") {
            callback(canvas, ctx);
            let button = dom.el("button", el);
            dom.on(button, "click", function () {
              let imgData = ctx.getImageData(40, 40, 160, 160);
              let _canvas = document.createElement("canvas");
              let _ctx = _canvas.getContext("2d");
              _canvas.width = _canvas.height = 160;
              _ctx.putImageData(imgData, 0, 0);
              let base64 = _canvas.toDataURL("image/png", 0.91);
              imgData = _canvas = _ctx = null;
              typeof options.success === "function" && options.success(base64, index);
            })
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
       * 图片创建成功 开始创建画布       *
       * 如不满足条件可以阻断
       *
       */

      if (typeof options.change === "function" && !options.change(info)) return;

      canvasInit((canvas, ctx) => {
        const { width, height } = info;
        function drawImage(offset, callback) {
          // let { width = 0, height = 0 } = offset;
          ctx.clearRect(0, 0, cWidth, cWidth);
          ctx.fillStyle = "#ccc";
          ctx.fillRect(0, 0, cWidth, cWidth);
          ctx.fill();
          // 是否水平
          let isHorizontal = width >= height;
          // 记住上一次绘制的数据
          let dx = canvas.getAttribute("dx") | 0;
          let dy = canvas.getAttribute("dy") | 0;
          // dx, dy,
          let dWidth, dHeight, max = cLine;
          if (isHorizontal) {
            dWidth = h2w(width, height);
            dHeight = iWidth;
            dx = dx || (cWidth - dWidth) / 2;
            dy = dy || cLine;
            // 验证: 可移动范围
            let min = dHeight + cLine - dWidth;
            dx = dx + offset.width;
            dx = m2m(min, max, dx);
          } else {
            dWidth = iWidth;
            dHeight = h2w(height, width);
            dx = dx || cLine;
            dy = dy || (cWidth - dHeight) / 2;
            // 验证: 可移动范围
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
          callback && callback({
            dx, dy
          })
        }
        // 绑定事件
        // 上一次移动触发的偏移
        dom.on(canvas, "mousedown", e => {
          let clientX = e.pageX || e.clientX;
          let clientY = e.pageY || e.clientY;
          canvas.style.cursor = "grabbing";
          let isMove = true;
          const fnMove = e => {
            if (isMove) {
              let cX = e.pageX || e.clientX;
              let cY = e.pageY || e.clientY;
              let width = cX - clientX;
              let height = cY - clientY;
              drawImage({ width, height });
            }
          }
          const fnUp = e => {
            canvas.style.cursor = "grab";
            let cX = e.pageX || e.clientX;
            let cY = e.pageY || e.clientY;
            let width = cX - clientX;
            let height = cY - clientY;
            drawImage({ width, height }, o => {
              canvas.setAttribute("dx", o.dx)
              canvas.setAttribute("dy", o.dy)
            });
            isMove = false;
            dom.off(document, "mouseup", fnUp)
            dom.off(document, "mousemove", fnMove)
          }
          dom.on(document, "mousemove", fnMove)
          dom.on(document, "mouseup", fnUp)
        })
        drawImage({ width: 0, height: 0 });
      });
    });
  };
}

export default new dialog();
