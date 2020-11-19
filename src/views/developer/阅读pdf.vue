<template>
  <div>
    <div class="u-pell--body">
      <h1>在线阅读pdf</h1>
      <div class="u-flex">
        <div class="u-flex__item"><input class="u-input" placeholder="请输入一个在线地址" value="https://shaonq.github.io/md/file/如何快速实现网页预览PDF文件.pdf" /></div>
        <div><button class="u-btn u-ml" @click="loadPdfPath($util.dom.el('input').value)">在线查看</button></div>
      </div>

      <!-- pdf view -->
      <div style="margin-top:40px;">
        <div ref="view"></div>
      </div>
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
  props: {
    src: String
  },
  methods: {
    loadPdfPath(path) {
      let el = this.$refs.view;
      el.innerHTML = "";
      (async function () {
        if (typeof pdfjsLib === "undefined") {
          console.time('pdfjs v2.5.207')
          // await loadJs("https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.163/build/pdf.min.js");
          // pdfjsLib.workerSrc = require('pdfjs-dist/build/pdf.worker.min')
          await loadJs("https://cdn.jsdelivr.net/npm/pdfjs-dist@2.5.207/build/pdf.min.js");
          pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.5.207/build/pdf.worker.js';
          console.timeEnd('pdfjs v2.5.207')
        }
        pdfjsLib.getDocument(path).promise.then(pdf => {
          let curr = 1, numPages = pdf.numPages;
          let loadPdfPage = pageNumber => {
            return pdf.getPage(pageNumber).then(function (pdfPage) {
              // Display page on the existing canvas with 100% scale.
              let viewport = pdfPage.getViewport({ scale: 2 });
              let canvas = document.createElement('canvas');
              canvas.width = viewport.width || 794;
              canvas.height = viewport.height || 1123;
              canvas.style.width = "100%";
              canvas.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.14)";
              canvas.style.marginBottom = "5px";
              canvas.style.borderRadius = "2px";
              let ctx = canvas.getContext('2d');
              let renderTask = pdfPage.render({
                canvasContext: ctx,
                viewport: viewport,
              });
              el.appendChild(canvas);
              canvas = null;
              return renderTask.promise;
            });
          };

          let init = curr => {
            loadPdfPage(curr).then(() => {
              curr++;
              if (numPages >= curr) init(curr);
            })
          };
          init(curr);
        }).catch(function (e) {
          console.log(e.message)
        });
      }())
    }
  },
  mounted() {
    this.$util.dom.el('button').click()
  }
}
</script>

<style lang="scss">
</style>