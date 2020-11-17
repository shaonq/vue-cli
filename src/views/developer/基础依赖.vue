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
    <div class="u-pell--body">
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
          <p class="u-mt">小号分组(u-form-small)</p>
          <div class="u-btn__group u-mt">
            <button class="u-btn u-form-small" @click="uplaodAvartar">上传头像</button>
            <button class="u-btn u-btn--green u-btn--primary u-form-small">我被选中</button>
            <button class="u-btn u-form-small" @click="$util.showModal({title:'标题',content:'内容'})">普通弹窗</button>
          </div>
        </li>
        <li>
          <p class="u-mt">大号分组(u-form-large)</p>
          <div class="u-card" style="width:400px;height:400px;border: 1px solid #f1f1f1;box-shadow:none">
            <div class="u-card__hd">登 录</div>
            <div class="u-card__bd"></div>
            <div class="u-card__bd">
              <div class="u-mt">
                <input placeholder="用户名" class="u-input u-from-large" />
              </div>
              <div class="u-mt">
                <select type="password" class="u-input  u-from-large">
                  <option>原始下拉</option>
                  <option>密码1</option>
                  <option>密码2</option>
                </select>
              </div>
              <div class="u-mt">
                <button class="u-btn u-btn--blue u-from-large u-btn--primary u-btn--spread">登 录</button>
              </div>
            </div>
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
        </li>
      </ul>
      <!-- ui demo end-->
      <h1>弹窗使用和演示</h1>
      <div>
        <button class="u-btn" @click="$util.toast('提示')" aria-label="toast" tooltip="top">提示</button>
        <button class="u-btn" @click="$util.alert('你好啊')" aria-label="toast" tooltip="top">询问</button>
        <button class="u-btn" @click="showLoading" aria-label="showLoading" tooltip="top">加载中</button>
        <button class="u-btn" @click="$util.hideToast()" aria-label="hideToast" tooltip="top">关闭其他</button>
        <button class="u-btn" @click="uplaodAvartar" aria-label="uplaodAvartar" tooltip="top">上传头像</button>
        <button class="u-btn" @click="$util.toast('右键点击看效果')" @contextmenu.prevent="showContextMenu" aria-label="showContextMenu" tooltip="top">右键菜单</button>
        <button class="u-btn" @click="showDropdown" aria-label="showDropdown" tooltip="top">下拉菜单</button>
      </div>
      <pre>
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

util.uplaodAvartar(option)
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
    /**
     * @param
     * @returns {Number} index
     */
    // show(type) {
    //   switch (type) {
    //     case 1:
    //       this.$util.showLoading("加载中");
    //       setTimeout(() => this.$util.showSuccess("加载成功"), 3000);
    //       break;
    //     case 2:
    //       this.$util.toast("显示弹窗");
    //       break;
    //     case 4:
    //       this.$util.showModal({
    //         title: "出错了",
    //         content: new Error("未知错误").toString(),
    //       });
    //       break;
    //     case 3:
    //       this.$util.uplaodAvartar((src) => {
    //         this.$util.showLayer({
    //           content: `<img style="margin-top:8px;" src="${src}"/>`,
    //           width: "200px",
    //           height: "200px",
    //           btn: "u-btn",
    //         });
    //       });
    //       break;

    //     default:
    //       break;
    //   }
    // },
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
    uplaodAvartar() {
      this.$util.uplaodAvartar({
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
};
</script>

<style lang="scss">
</style>
