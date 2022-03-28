<template>
	<div>
		<div class="u-quill-body">
			<h1>富文本</h1>
			<p>轻量级基础富文本编辑器</p>
		</div>
		<u-quill :handlers="handlers" style="height:300px;border-right-width:0;border-left-width:0" type="json" :html="defaultJsonString" @change="onChange">
		</u-quill>
		<h1 style="padding:20px 16px;">预览</h1>
		<u-quill :handlers="handlers" :html="html" style="border:0" type="json" readonly="readonly"></u-quill>
		<h1 style="padding:20px 16px;">数据</h1>
		<div class="u-quill-body">
			<pre>{{ html }}</pre>
		</div>
	</div>
</template>
<script>
	const defaultJsonString = JSON.stringify({
		ops: [
			{ insert: "佳人" },
			{ attributes: { header: 1 }, insert: "\n" },
			{ attributes: { color: "#999999" }, insert: " " },
			{
				attributes: { newLink: "#", color: "#999999" },
				insert: "【作者】"
			},
			{ attributes: { newLink: "#", color: "#2673db" }, insert: "杜甫 " },
			{ attributes: { color: "#999999" }, insert: "【朝代】" },
			{
				insert:
					"唐\n绝代有佳人，幽居在空谷。\n自云良家子，零落依草木。\n关中昔丧乱，兄弟遭杀戮。\n官高何足论，不得收骨肉。\n世情恶衰歇，万事随转烛。\n夫婿轻薄儿，新人美如玉。\n合昏尚知时，鸳鸯不独宿。\n"
			},
			{
				attributes: { color: "#cc0000" },
				insert: "但见新人笑，那闻旧人哭"
			},
			{
				insert:
					"。\n在山泉水清，出山泉水浊。\n侍婢卖珠回，牵萝补茅屋。\n摘花不插发，采柏动盈掬。\n天寒翠袖薄，日暮倚修竹。\n"
			}
		]
	});
	export default {
		data() {
			return {
				defaultJsonString,
				html: defaultJsonString,
				handlers: {
					// video: (insert) => {
					//    insert("https://shaonq.github.io/nui/old/videos/miku.mp4")
					// },
					link: insert => {
						const util = this.$util;
						util.alert({
							extend: true,
							title: "添加链接",
							content: `<input class="u-input" placeholder="http(s)://"/>`,
							success: (index, that) => {
								util.dom.el("input", that).focus();
							},
							ok: {
								label: "确认",
								onclick: (index, that) => {
									let value = util.dom.el("input", that.parentNode.parentNode)
										.value;
									if (util.regexp.url.test(value)) {
										insert(value);
										util.hideToast(index);
									} else {
										util.toast("请输入一个有效地址");
									}
								}
							}
						});
					},
					image: insert => {
						const util = this.$util;
						util.alert({
							extend: true,
							title: "添加图片",
							content: `<input class="u-input" placeholder="http(s)://"/>`,
							success: (index, that) => {
								util.dom.el("input", that).focus();
							},
							ok: {
								label: "确认",
								onclick: (index, that) => {
									let value = util.dom.el("input", that.parentNode.parentNode)
										.value;
									if (util.regexp.image.test(value)) {
										insert(value);
										util.hideToast(index);
									} else {
										util.toast("请输入一个有效图片地址");
									}
								}
							}
						});
					}
				}
			};
		},
		methods: {
			onChange(html) {
				// console.log((html));
				this.html = html;
			}
		}
	};
</script>

<style lang="scss"></style>
