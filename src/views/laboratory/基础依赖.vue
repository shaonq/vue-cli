<template>
  <div>
    <div class="u-pell--body">
      <h1>释义</h1>
      <p>项目基础的必须的弹窗，无其他依赖</p>
      <h1>List</h1>
      <ul>
        <li>Button</li>
        <li>Input</li>
        <li>Dialog</li>
        <li>Date</li>
      </ul>
      <h1>UI</h1>
      <blockquote>Button Input Dialog</blockquote>
      <!-- ui demo start -->
      <div class="u-dialog-mask is-show" style=" position: relative;">
        <div class="u-dialog is-show" style="position: relative; padding: 20px; ">
          <div class="u-dialog-content" style="width:320px;height:360px;">
            <div class="u-dialog-title is-show">登录</div>
            <div class="u-dialog-body">
              <div class="u-input-group u-mt">
                <input placeholder="用户名" class="u-input" />
              </div>
              <div class="u-input-group">
                <input placeholder="密码" type="password" class="u-input" />
              </div>

              <div class="u-input-group u-mt">
                <button class="u-button u-button__blue u-button__spread">登录</button>
              </div>
            </div>
            <div class="u-dialog-close is-show"></div>
          </div>
        </div>
      </div>
      <div style="padding:20px 0;">
        <button class="u-button" @click="show(1)">showLoading</button>
        <button class="u-button u-button__blue" @click="show(2)">toast</button>
        <button class="u-button u-button__green" @click="show(3)">uplaodAvartar</button>
        <button class="u-button u-button__red" @click="show(4)">showLayer</button>
      </div>
      <!-- ui demo end-->
      <h1>API</h1>
      <pre>
/**
 * @namespace util
 * @param {String} content : html 
 * @param {String} title : title 
 * @param {String} width : style width 
 * @param {String} height : style height 
 * @param {String} className : DIY className 
 * @param {Boolean} showShadow : 显示背景 
 * @param {Boolean} shadowClose : 背景点击关闭 
 * @param {Boolean} showClose : 显示close小图标 
 * @returns {Number} index
 */

util.toast(content)
util.showloading(content)
util.hideToast(index)
util.showLayer({title,content,...})

/**
 * @callback Callback
 * @param {string} src :image src
 *
 * @param {Callback} cb
 */

util.uplaodAvartar(cb)
         </pre>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    /**
     * @param
     * @returns {Number} index
     */
    show(type) {
      switch (type) {
        case 1:
          this.$util.showLoading('加载中');
          setTimeout(() => this.$util.showSuccess('加载成功'), 3000)
          break;
        case 2:
          this.$util.toast('显示弹窗');
          break;
        case 4:
          this.$util.showLayer({
            title: '出错了',
            content: new Error('未知错误').toString()
          });
          break;
        case 3:
          this.$util.uplaodAvartar(src => {
            this.$util.showLayer({
              content: `<img style="margin-top:8px;" src="${src}"/>`,
              width: '200px',
              height: '200px'
            });
          })
          break;

        default:
          break;
      }
    }
  }
}
</script>

<style lang="scss">
</style>
