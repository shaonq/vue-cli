<template>
	<div class="u-quill-body">
		<h2>流程图</h2>
		<div>
			<div class="u-flex u-flex--start">
				<div style="width:200px;">
					<div class="dnd-wrap">
						<div data-type="start" class="dnd-circle" @mousedown="startDrag">开始</div>
						<div data-type="process" class="dnd-rect" @mousedown="startDrag">过程</div>
						<div data-type="choose" class="dnd-rect" @mousedown="startDrag">决策</div>
						<div data-type="end" class="dnd-rect" @mousedown="startDrag" style="border-radius:30px;">结束</div>

						<a class="u-btn" @click="exportPNG">下载</a>
					</div>
				</div>
				<div class="u-flex__item">
					<div ref="container" style="height:500px;background:#f9f9f9;width:100%"></div>
				</div>
			</div>
			<hr>
		</div>
	</div>
</template>

<script>
	let demojson = { "cells": [{ "position": { "x": 220, "y": 20 }, "shape": "start", "id": "77dd3bed-8798-423e-8b47-9d3b1427439d" }, { "position": { "x": 200, "y": 150 }, "shape": "process", "id": "4d7c7272-27fd-4295-be35-0f65ec2f80a1" }, { "position": { "x": 200, "y": 250 }, "shape": "choose", "id": "83092e96-2079-4918-b0d6-8d4f6795f289" }, { "position": { "x": 200, "y": 350 }, "shape": "end", "id": "8f4d3350-7ade-459e-9de4-0e8f11e5a059" }, { "shape": "edge", "id": "493f00d7-2a0c-47e9-98d5-b3161ec4ee81", "source": { "cell": "77dd3bed-8798-423e-8b47-9d3b1427439d", "port": "bottom" }, "target": { "cell": "4d7c7272-27fd-4295-be35-0f65ec2f80a1", "port": "top" }, "zIndex": 3 }, { "shape": "edge", "id": "f45e5deb-a9d2-4b08-beee-ff6e8c9c0507", "source": { "cell": "4d7c7272-27fd-4295-be35-0f65ec2f80a1", "port": "bottom" }, "target": { "cell": "83092e96-2079-4918-b0d6-8d4f6795f289", "port": "top" }, "zIndex": 4 }, { "shape": "edge", "id": "02131882-e2ab-48b0-83dd-c4e0655f5d28", "source": { "cell": "83092e96-2079-4918-b0d6-8d4f6795f289", "port": "bottom" }, "target": { "cell": "8f4d3350-7ade-459e-9de4-0e8f11e5a059", "port": "top" }, "zIndex": 5 }] };
	export default {
		methods: {
			data() {
				return {
					graph: null,
					dnd: null
				}
			},
			dataInit() {
				let { renderUI, registerNode } = this;
				let { loadJs } = this.$util;
				(async function () {
					if (typeof X6 === "undefined") {
						console.time('antv-x6 1.24.5')
						await loadJs("https://cdn.jsdelivr.net/npm/@antv/x6@1.24.5/dist/x6.min.js");
						console.timeEnd('antv-x6 1.24.5');
						registerNode();
					}
					renderUI();
				}());
			},
			registerNode() {
				const { Graph } = X6;
				/**
				 * 流程图 
				 * 定义符号 开始 start ()  过程 process  [] 决策choose <> 结束 end (=)
				 * 定义连接线 edge
				 * 显示部分，不包含操作逻辑
				 */
				// 定义拖动点
				const dotAttrs = { circle: { r: 4, magnet: true, stroke: '#31d0c6', strokeWidth: 2, fill: '#fff' } };
				const portsGroups = {
					top: { position: { name: 'top' }, zIndex: 1, attrs: dotAttrs },
					right: { position: { name: 'right' }, zIndex: 1, attrs: dotAttrs },
					bottom: { position: { name: 'bottom' }, zIndex: 1, attrs: dotAttrs },
					left: { position: { name: 'left' }, zIndex: 1, attrs: dotAttrs }
				};
				Graph.registerNode("start", {
					inherit: 'circle', width: 60, height: 60, label: '开始',
					ports: { items: [{ group: 'bottom', id: 'bottom' }], groups: portsGroups }, zIndex: 2
				});
				Graph.registerNode("process", {
					inherit: 'rect', width: 100, height: 40, label: '过程', zIndex: 2,
					ports: {
						items: [{ group: 'top', id: 'top' }, { group: 'right', id: 'right' }, { group: 'bottom', id: 'bottom' }, { group: 'left', id: 'left' }],
						groups: portsGroups,
					},
				});
				Graph.registerNode("choose", {
					inherit: 'polygon', points: '0,10 10,0 20,10 10,20', width: 100, height: 40, label: '决策', zIndex: 2,
					ports: {
						items: [{ group: 'top', id: 'top' }, { group: 'right', id: 'right' }, { group: 'bottom', id: 'bottom' }, { group: 'left', id: 'left' }],
						groups: portsGroups,
					},
				});
				Graph.registerNode("end", {
					inherit: 'rect', width: 100, height: 40, label: '结束',
					ports: {
						items: [{ group: 'top', id: 'top' }, { group: 'right', id: 'right' }, { group: 'left', id: 'left' }],
						groups: portsGroups,
					},
					attrs: { body: { strokeWidth: 1, rx: 20, ry: 20, stroke: '#333', fill: '#fff' } }, zIndex: 2,
				}, true);

			},
			renderUI() {
				const { Graph, Addon } = X6;
				/** 
				 * 初始化画布
				 * @api : https://antv-x6.gitee.io/zh/docs/api/graph/graph
				 * @demo ： https://github.com/lourain/x6-flow/tree/master/src 
				 **/
				const graph = this.graph = new Graph({
					container: this.$refs.container,
					grid: { size: 10, visible: true, type: 'mesh' },
					history: true,
					snapline: { enabled: true, sharp: true, },
					scroller: { enabled: false, pageVisible: false, pageBreak: false, pannable: true, },
					mousewheel: { enabled: true, modifiers: ['ctrl', 'meta'], },

					// 链接桩可以被链接时候的高亮
					selecting: true,
					highlighting: {
						magnetAvailable: {
							name: 'stroke',
							args: {
								padding: 4,
								attrs: { 'stroke-width': 4, stroke: 'skyblue' }
							}
						},
						magnetAdsorbed: {
							name: 'stroke',
							args: {
								padding: 4,
								attrs: { 'stroke-width': 8, stroke: 'skyblue' }
							}
						}
					},
					// 连接线相关
					connecting: {
						snap: true,
						allowBlank: false,
						allowLoop: false,
						highlight: true,
						sourceAnchor: { name: 'center' },
						targetAnchor: 'center',
						connectionPoint: 'anchor',
						// connector: 'smooth',
						router: 'manhattan',
						validateMagnet({ magnet }) {
							return magnet.getAttribute('port-group') !== 'in';
						},
						createEdge() {
							return this.createEdge({
								zIndex: -1,
								attrs: {
									line: {
										strokeDasharray: '5 5',
										stroke: '#808080',
										strokeWidth: 1,
										targetMarker: {
											name: 'block',
											args: {
												size: '6'
											}
										}
									}
								}
							});
						},
						validateConnection({ targetView, sourceMagnet, targetMagnet }) {
							// 只能从输出链接桩创建连接
							// if (!sourceMagnet || sourceMagnet.getAttribute('port-group') === 'in') {
							//   return false;
							// }
							// // 只能连接到输入链接桩
							// if (!targetMagnet || targetMagnet.getAttribute('port-group') !== 'in') {
							//   return false;
							// }
							if (!sourceMagnet || !targetMagnet) {
								return false;
							}
							// 判断目标链接桩是否可连接
							const portId = targetMagnet.getAttribute('port');
							const node = targetView.cell;
							const port = node.getPort(portId);
							if (!port) {
								return false;
							}
							return true;
						}
					}








				}).drawBackground({ color: '#fff' });
				this.dnd = new Addon.Dnd({ target: graph, validateNode() { return true; } });
				graph.fromJSON(demojson);
				this.bindEvent();
				graph.centerContent();

				window.g = graph;
			},
			startDrag(e) {
				const { graph, dnd } = this;
				const target = e.currentTarget;
				const type = target.getAttribute('data-type');
				let node = graph.createNode({ shape: type });
				dnd.start(node, e);
			},
			exportPNG(e) {
				const { DataUri } = X6;
				g.toPNG((dataUri) => {
					DataUri.downloadDataUri(dataUri, 'chart.png')
				});
				//	graph.toJSON({ diff: true })
			},
			bindEvent() {
				const graph = this.graph;
				let curCell;
				graph.on('blank:click', ev => {
					console.log('blank:click')
					curCell = null
					console.log(ev)
				})
				// 选中cell 添加操作工具
				graph.on('cell:selected', ({ cell }) => {
					console.log('cell:selected')
					// instance.ctx.curCell = cell
					// instance.ctx.node = cell
					// console.log(instance.ctx.node);
					curCell = cell;
					let removeBtnCfg;
					if (cell.isEdge()) {
						cell.attr('line', { stroke: 'skyblue', strokeWidth: 3 });
						removeBtnCfg = { distance: '30%' };
					}

					if (cell.isNode()) {
						const cellView = graph.findView(cell);
						cellView.addClass(`${cell.shape}-selected`);
						removeBtnCfg = { x: 0, y: 0, offset: { x: -5, y: -5 } };
					}
					cell.addTools({
						name: 'button-remove', // 工具名称
						args: removeBtnCfg // 工具对应的参数
					});
				});
				graph.on('cell:unselected', ({ cell }) => {
					console.log('cell:unselected')
					curCell = null;
					if (cell.isEdge()) {
						cell.attr('line', { stroke: '#808080', strokeWidth: 1 });
					} else {
						const cellView = graph.findView(cell);
						cellView && cellView.removeClass(`${cell.shape}-selected`);
					}
					cell.removeTools()
				});

				// 连接线连接
				graph.on('edge:connected', (args) => {
					console.log('edge:connected')
					const edge = args.edge;
					const node = args.currentCell;
					const elem = args.currentMagnet;
					const portId = elem.getAttribute('port');

					// 触发 port 重新渲染
					node.setPortProp(portId, 'connected', true);
					edge.zIndex = -1;
					// 更新连线样式
					edge.attr({
						line: {
							strokeDasharray: '',
							targetMarker: 'classic'
						}
					});
					edge.appendLabel({ attrs: { label: { text: "" } } });
				});

			}
		},
		mounted() {
			this.dataInit();
		}
	}
</script>

<style>
	.app {
		font-family: sans-serif;
		padding: 0;
		display: flex;
		padding: 16px 8px;
	}

	.app-content {
		flex: 1;
		height: 240px;
		margin-left: 8px;
		margin-right: 8px;
		box-shadow: 0 0 10px 1px #e9e9e9;
	}

	.dnd-wrap {
		width: 200px;
		padding: 16px;
		border: 1px solid #f0f0f0;
		display: flex;
		flex-direction: column;
		align-items: center;
		user-select: none;
	}

	.dnd-rect {
		width: 100px;
		height: 40px;
		border: 2px solid #31d0c6;
		text-align: center;
		line-height: 40px;
		margin: 16px;
		cursor: move;
	}

	.dnd-circle {
		width: 60px;
		height: 60px;
		border-radius: 100%;
		border: 2px solid #31d0c6;
		text-align: center;
		line-height: 60px;
		margin: 16px;
		cursor: move;
	}

	.x6-graph-scroller {
		border: 1px solid #f0f0f0;
		margin-left: -1px;
	}

	.validating {
		position: relative;
	}

	.validating:after {
		position: absolute;
		top: 4px;
		left: 4px;
		content: " ";
		display: block;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		border: 6px solid #873bf4;
		border-color: #873bf4 transparent #873bf4 transparent;
		animation: lds-dual-ring 1.2s linear infinite;
	}

	@keyframes lds-dual-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>