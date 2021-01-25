import Quill from "./quill.min.js";
import "./index.scss"
/**
 * @api  自定义功能 API:https://quilljs.com/guides/cloning-medium-with-parchment/#dividers
 */
const BlockEmbed = Quill.import('blots/block/embed');
/**
 * @desc 自定义视频播放 用video1 替换默认 video
 */
class VideoBlot extends BlockEmbed {
    static create(value) {
        let node = super.create();
        if (typeof value === "string") value = { url: value }
        node.setAttribute('src', value.url)
        node.setAttribute('controls', value.controls || "controls")
        node.setAttribute('width', value.width || "100%")
        value.height && node.setAttribute('height', value.height)
        // hide multiple buttons
        node.setAttribute('disablepictureinpicture', true)
        node.setAttribute('controlslist', "nodownload noremoteplayback")
        // hide wechat drag
        node.setAttribute('webkit-playsinline', true)
        node.setAttribute('playsinline', true)
        node.setAttribute('x5-playsinline', true)
        return node;
    }
    static value(node) {
        return {
            src: node.src
        }
    }
}
VideoBlot.blotName = 'video1'
VideoBlot.tagName = 'video'
Quill.register(VideoBlot)

/**
 * @desc tag = figure 
 *       定义一个可以被选中的区域
 *       区域可以直接被填充html
 * 
 */
class FigureBlot extends BlockEmbed {
    static create(value) {
        let node = super.create();
        node.setAttribute("contenteditable", false)
        node.setAttribute("tabindex", -1)
        node.innerHTML = value;
        // 添加delete 删除
        node.onkeydown = e => {
            if (e.keyCode === 46 || e.keyCode === 8) {
                node.parentNode.removeChild(node)
            }
        }
        return node
    }
    static value(node) {
        return node.innerHTML
    }
}
FigureBlot.blotName = 'figure'
FigureBlot.tagName = 'figure'
Quill.register(FigureBlot)


// class DividerBlot extends BlockEmbed { }
// DividerBlot.blotName = 'divider';
// DividerBlot.tagName = 'hr';
// Quill.register(DividerBlot);



export default Quill