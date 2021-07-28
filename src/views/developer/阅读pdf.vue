<template>
	<div>
		<div class="u-quill-body">
			<h1>在线阅读pdf</h1>
			<div class="u-flex">
				<div class="u-flex__item"><input class="u-input" placeholder="请输入一个在线地址" v-model="value" /></div>
				<div><button class="u-btn u-ml" @click="loadDemo()">在线查看</button></div>
			</div>
			<div class="u-skeleton is-loading" v-if="loading">
				<p class="u-skeleton__item" v-for="i in 10" :key="i"></p>
			</div>
			<!-- pdf view -->
			<div ref="view"></div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			src: String
		},
		methods: {
			async loadPdfPath(el, path) {
				el.innerHTML = "";
				let loadJs = this.$util.loadJs;
				if (typeof pdfjsLib === "undefined") {
					console.time('pdfjs v2.5.207')
					await loadJs("https://cdn.jsdelivr.net/npm/pdfjs-dist@2.5.207/build/pdf.min.js");
					pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.5.207/build/pdf.worker.js';
					console.timeEnd('pdfjs v2.5.207')
				}
				return new Promise(function (resolve, reject) {
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
								canvas.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.16)";
								canvas.style.marginBottom = "5px";
								canvas.style.borderRadius = "2px";
								canvas.style.display = "block";
								let ctx = canvas.getContext('2d');
								let renderTask = pdfPage.render({ canvasContext: ctx, viewport: viewport });
								el.appendChild(canvas);
								canvas = null;
								return renderTask.promise;
							});
						};
						let init = curr => { loadPdfPage(curr).then(() => { curr++; if (numPages >= curr) init(curr) }) };
						init(curr);
						resolve(numPages)
					}).catch(reject);
				})
			},

			async loadDemo() {
				try {
					let el = this.$refs.view;
					let page = await this.loadPdfPath(el, this.value);
					this.$util.showNearby({ content: `加载了一个 ${page} 页的pdf文件`, offset: ["100px", "auto"] });
					this.loading = false;
				} catch (error) {
					this.loading = true;
				}
			}
		},
		data() {
			return {
				value: "https://shaonq.github.io/md/file/如何快速实现网页预览PDF文件.pdf",
				loading: true,
			}
		},
		mounted() {
			this.loadDemo()
		}
	}
</script>

<style lang="scss">
</style>