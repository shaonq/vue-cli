<template>
  <div>
    <div class="u-card" style="border: 1px solid #f1f1f1;box-shadow:none">
      <ul class="u-tabs">
        <li class="u-tabs__item"><a class="u-tabs__link" :class="{'is-active':tabName==='a'}" @click="tabName='a'">内容区块</a></li>
        <li class="u-tabs__item"><a class="u-tabs__link" :class="{'is-active':tabName==='b'}" @click="tabName='b'">菜单切换</a></li>
      </ul>
      <div class="u-card__bd">
        <pre>
          .u-card
          .u-card__hd/.u-tabs
          .u-card__bd

          .u-tabs
          .u-tabs__item
          .u-tabs__link.is-active
        </pre>
      </div>
    </div>
    <div class="u-quill-body">
      <!-- <h1>List</h1>
      <ul>
        <li>Button</li>
        <li>Input</li>
        <li>Dialog</li>
        <li>Date</li>
      </ul> -->
      <h1>Button</h1>
      <!-- ui demo start -->

      <ul style="padding:20px 0;">
        <li>
          <p class="u-mt">普通按钮</p>
          <div class="u-mt">
            <button class="u-btn" @click="showLoading">加载中</button>
            <button class="u-btn u-btn--blue">u-btn--blue</button>
          </div>
          <p class="u-mt">实心按钮</p>
          <div class="u-mt">
            <button class="u-btn u-btn--primary" @click="$util.toast('显示弹窗')">toast提示</button>
            <button class="u-btn u-btn--red u-btn--primary"> u-btn--primary</button>
          </div>
        </li>
        <li class="u-mt">
          <p class="u-mt">小号分组</p>
          <div class="u-btn__group u-mt">
            <button class="u-btn u-btn--small" @click="uploadAvatar">上传头像</button>
            <button class="u-btn u-btn--green u-btn--primary u-btn--small">我被选中</button>
            <button class="u-btn u-btn--small" @click="$util.showModal({title:'标题',content:'内容'})">普通弹窗</button>
          </div>
        </li>
        <li>
          <h2 class="u-mt">u-field</h2>

          <div class="u-field u-mt">
            <h3 class="u-field__label">昵称</h3>
            <div class="u-field__content">
              <span class="u-mr">鼠标划过试试</span>
              <button class="u-btn u-field__hover u-btn--link u-btn--blue"><i class="el-icon-edit"></i> 修改</button>
            </div>
          </div>
          <div class="u-field">
            <h3 class="u-field__label">修改图片</h3>
            <div class="u-field__content">
              <img src="https://imgs.aixifan.com/jy9Gvt7hIk-iYn2Qf-iyUvai-zMf2ya-qeeeea.jpg" style="margin:0;width:100%" />
              <button class="u-btn u-field__hover u-btn--link u-btn--blue"><i class="el-icon-edit"></i> 修改</button>
            </div>
          </div>

          <h2 class="u-mt">u-field-small</h2>
          <div class="u-field u-field--small">
            <label class="u-field__label">自动下载</label>
            <div class="u-field__content">
              <label class="u-checkbox">
                <input type="checkbox" />
                <i class="u-checkbox__icon"></i>
                开启文件自动下载
              </label>
              <div class="u-inline" aria-label="开启后自动下载" tooltip="top">?</div>
            </div>
          </div>
          <!-- 多选 -->
          <div class="u-field u-field--small">
            <label class="u-field__label">多选框</label>
            <div class="u-field__content">
              <label class="u-checkbox">
                <input type="checkbox" name="checkbox" />
                <div class="u-checkbox__icon"></div>
                选项A
              </label>
              <label class="u-checkbox u-ml">
                <input type="checkbox" name="checkbox" />
                <i class="u-checkbox__icon"></i>
                选项B
              </label>
              <label class="u-checkbox u-ml">
                <input type="checkbox" name="checkbox" disabled />
                <i class="u-checkbox__icon"></i>
                选项C
              </label>
              <label class="u-checkbox u-ml">
                <input type="checkbox" name="checkbox" checked disabled />
                <i class="u-checkbox__icon"></i>
                选项D
              </label>
            </div>
          </div>
          <!-- 单选 -->
          <div class="u-field u-field--small">
            <label class="u-field__label">单选框</label>
            <div class="u-field__content">
              <label class="u-radio">
                <input type="radio" name="radio" />
                <div class="u-radio__icon"></div>
                选项A
              </label>
              <label class="u-radio u-ml">
                <input type="radio" name="radio" />
                <i class="u-radio__icon"></i>
                选项B
              </label>
              <label class="u-radio u-ml">
                <input type="radio" name="radio" disabled />
                <i class="u-radio__icon"></i>
                选项C
              </label>
              <label class="u-radio u-ml">
                <input type="radio" name="radio" checked disabled />
                <i class="u-radio__icon"></i>
                选项D
              </label>
            </div>
          </div>
          <div class="u-field u-field--small">
            <label class="u-field__label">文件管理</label>
            <div class="u-field__content">
              <div>
                <p class="u-inline"><input class="u-input u-input--small" value="C:\Users\user\Documents" /></p>
              </div>
              <div class="u-color-light">微信文件默认保存位置</div>
              <div><a class="u-btn  u-btn--small">更改</a><a class="u-btn  u-btn--small">打开文件夹</a></div>
            </div>
          </div>

        </li>
      </ul>
      <!-- ui demo end-->
      <h1>弹窗使用和演示</h1>
      <div>
        <button class="u-btn" @click="$util.toast('提示')" aria-label="toast" tooltip="top">提示</button>
        <button class="u-btn" @click="$util.alert('你好啊')" aria-label="toast" tooltip="top">询问</button>
        <button class="u-btn" @click="showLoading" aria-label="showLoading" tooltip="top">加载中</button>
        <button class="u-btn" @click="$util.hideToast()" aria-label="hideToast" tooltip="top">关闭其他</button>
        <button class="u-btn" @click="uploadAvatar" aria-label="uploadAvatar" tooltip="top">上传头像</button>
        <button class="u-btn" @click="$util.toast('右键点击看效果')" @contextmenu.prevent="showContextMenu" aria-label="showContextMenu" tooltip="top">右键菜单</button>
        <button class="u-btn" @click="showDropdown" aria-label="showDropdown" tooltip="top">下拉菜单</button>
      </div>
      <pre class="line-numbers"><code class="language-javascript">
        
/**
 * @namespace util
 * @param {String} content : html 内容
 * @param {String} title : title 标题
 * @param {String} width : 容器 width 
 * @param {String} height : 容器 height 
 * @param {String} className : 自写样式 className 
 * @param {Boolean} shadow : 背景透明度 
 * @param {Boolean} shadowClose : 点击背景关闭 默认：false
 * @param {Boolean} showClose : 显示close小图标 
 * @param {Boolean} extend : 只能手动关闭 大部分默认：false
 * @returns {Number} index : 窗口索引，用于关闭
 */

util.toast(content,time)
util.hideToast(index) // 对所有适用 不穿参数会关闭所有 extend = false 的窗体
util.showloading(content)
util.showModal(options)

/**
 * @callback Callback
 * @param {Function} success =>(src,index): image src 
 * @param {Callback} option
 */

util.uploadAvatar(option)
</code>
</pre>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabName: "a",
    }
  },
  methods: {
    showLoading() {
      this.$util.showLoading("0%");
      let now = +new Date(),
        timer = setInterval(() => {
          let v = Math.ceil(((new Date() - now) / 3000) * 100);
          if (v >= 100) {
            clearInterval(timer);
            this.$util.showSuccess("加载成功");
          } else {
            this.$util.showLoading(`加载${v}%`);
          }
        }, 500);
    },
    uploadAvatar() {
      this.$util.uploadAvatar({
        success: (src, index) => {
          this.$util.showModal({
            content: `<p>${index}</p><img style="margin-top:8px;" src="${src}"/>`,
            width: "auto",
            height: "auto",
          });
        },
      });
    },
    showContextMenu(e) {
      let p = this.$util.dom.position(e.target);
      this.$util.showContextMenu({
        offset: [p.top + p.height + "px", e.pageX + "px"],
        list: [
          { label: "发现", value: "remove" },
          { label: "删除", value: "remove" },
          { label: "不可选", value: "remove", disabled: true, border: true },
        ],
        success: ({ label, value }) => {
          switch (value) {
            case "remove":
              this.$util.toast("点击了选项");
              break;
          }
        },
      });
    },
    showDropdown(e) {
      let p = this.$util.dom.position(e.target);
      this.$util.showDropdown({
        offset: [p.top + p.height + "px", p.left + "px"],
        list: [
          { label: "发现", value: "remove" },
          { label: "删除", value: "remove2" },
          { label: "不可选", value: "remove3", disabled: true, border: true },
        ],
        success: ({ label, value }) => {
          switch (value) {
            case "remove":
              this.$util.toast("点击了选项");
              break;
          }
        },
        value: "remove",
      });
    },
  },
  mounted() {
    this.$cdn.Prism();    // 代码高亮
  }
};
</script>

<style lang="scss">
</style>
