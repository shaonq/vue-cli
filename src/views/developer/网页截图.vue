<template>
  <div>
    <div class="u-pell--body">
      <div id="qq">
        <h1>网页截图</h1>
        <ol>
          <li><code>html2canvas.js</code> 网页转换为图片 </li>
          <li><code>jspdf.js</code> 图片转换为pdf文件 </li>
        </ol>
        <hr>
        <img src="https://imgs.aixifan.com/jy9Gvt7hIk-iYn2Qf-iyUvai-zMf2ya-qeeeea.jpg">
        <hr>
        <p>点击测试↓</p>
      </div>
    </div>
    <div class="u-btn__group">
      <a class="u-btn" @click="appendCanvas()">生成截图</a>
      <a class="u-btn" @click="downloadPDF()">下载PDF</a>
    </div>
  </div>
</template>

<script>
function loadJs(src) {
  return new Promise((resolve, reject) => {
    let n = document.getElementsByTagName("head")[0], o = document.createElement("script");
    o.onload = o.onreadystatechange = o.onerror = function () {
      o && o.readyState && /^(?!(?:loaded|complete)$)/.test(o.readyState) || (o.onload = o.onreadystatechange = o.onerror = null, o.src = "", o.parentNode.removeChild(o), o = null, resolve && resolve())
    }, o.src = src;
    try {
      n.appendChild(o)
    } catch (i) {
      reject && reject()
    }
  });
}
export default {
  mounted() {
  },
  methods: {
    captureCanvas({ el, success }) {
      let dom = this.$util.dom;
      (async function () {
        if (typeof html2canvas === "undefined") {
          console.time('html2canvas v1.0.0-rc.7')
          await loadJs("https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.7/dist/html2canvas.min.js");
          console.timeEnd('html2canvas v1.0.0-rc.7')
        }
        let p = dom.position(el);
        // @bug offset
        window.scrollTo(p.pageXOffset, p.top);
        let canva = document.createElement("canvas");
        let dpi = window.devicePixelRatio || 1;
        let w = p.width * dpi;
        let h = p.height * dpi;
        let scale = 2;
        canva.width = w * scale;
        canva.height = h * scale;
        canva.style.width = w + "px";
        canva.style.height = h + "px";
        let ctx = canva.getContext("2d");
        ctx.scale(scale, scale);
        html2canvas(el, { canvas: canva, background: '#FFFFFF', scrollY: 0, scrollX: 0, width: w, height: h, useCORS: true }).then(success)
      }());
    },
    createPDF({ canvas, pdfName }) {
      (async function () {
        console.time('create pdf')
        if (typeof jsPDF === "undefined") {
          console.time('jspdf v1.3.1')
          await loadJs("https://cdn.jsdelivr.net/npm/jspdf@1.3.1/dist/jspdf.debug.min.js");
          console.timeEnd('jspdf v1.3.1')
        }
        // px 转 9pt
        let a4pt = { width: 594.3, height: 840.51 }
        let allHeight = (canvas.height) * (a4pt.width / canvas.width);
        let pdfWidth = a4pt.width;
        let pdfheight = a4pt.height;
        let base64 = canvas.toDataURL('image/jpeg', 0.83);
        let pageCount = Math.ceil(allHeight / pdfheight);
        let pdf = new jsPDF('', 'pt', 'a4')
        for (let page = 1; page <= pageCount; page++) {
          let top = -(page - 1) * pdfheight;
          // 最后一页如果小于5px，则跳过打印
          if (pdfheight - (page * pdfheight - allHeight) < 5) return;
          pdf.addImage(base64, 'JPEG', 0, top, pdfWidth, allHeight)
          if (page !== pageCount) pdf.addPage();
        }
        // @todo debug
        // let a = document.createElement('a');
        // a.href = base64;
        // a.download = pdfName + ".jpg";
        // a.click();
        // 导出pdf文件命名
        pdf.save(pdfName + '.pdf');
        pdf = canvas = null;
        console.timeEnd('create pdf')
      }())
    },
    // 查看截图
    appendCanvas() {
      let dom = this.$util.dom;
      let el = dom.el("#qq");
      let p = dom.position(el);
      this.captureCanvas({
        el, success: canvas => {
          dom.append(canvas, dom.el("#qq"))
        }
      })
    },
    downloadPDF() {
      let dom = this.$util.dom;
      let el = dom.el("#qq");
      this.captureCanvas({
        el, success: canvas => {
          this.createPDF({ canvas, pdfName: this.$util.date.today() })
        }
      })
    },
  }
}
</script>

<style>
</style>