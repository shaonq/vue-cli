<template>
  <div>
    <ul class="u-tabs">
      <li class="u-tabs__item">
        <a
          class="u-tabs__link"
          :class="{ 'is-active': tabName === 'a' }"
          @click="tabName = 'a'"
          >菜单说明</a
        >
      </li>
      <li class="u-tabs__item">
        <a
          class="u-tabs__link"
          :class="{ 'is-active': tabName === 'b' }"
          @click="tabName = 'b'"
          >菜单样式</a
        >
      </li>
    </ul>
    <div class="u-card__bd">
      <pre v-if="tabName === 'b'">
 .u-tabs .u-tabs__item
 .u-tabs .u-tabs__item.is-active
        </pre
      >
      <pre v-else>
 Tab
 需要需要使用vm.data 配合 v-if 来使用
        </pre
      >
    </div>
    <div class="u-quill-body">
      <h1>Button</h1>
      <div style="padding:20px 0;">
        <div>
          <p class="u-mt">普通</p>
          <div class="u-mt">
            <button class="u-btn">默认按钮</button>
            <button class="u-btn u-btn--blue">u-btn--blue</button>
            <button class="u-btn u-btn--primary">u-btn--primary</button>
            <button class="u-btn u-btn--red u-btn--small u-btn--primary">
              u-btn--small
            </button>
          </div>
        </div>
        <div class="u-mt">
          <p class="u-mt">普通组</p>
          <div class="u-btn__group u-mt">
            <button class="u-btn" @click="uploadAvatar">上传头像</button>
            <button class="u-btn u-btn--blue u-btn--primary">我被选中</button>
            <button class="u-btn">普通弹窗</button>
          </div>
        </div>
        <div>
          <h2 class="u-mt">u-field</h2>

          <div class="u-field u-mt">
            <h3 class="u-field__label">昵称</h3>
            <div class="u-field__content">
              <span class="u-mr">鼠标划过试试</span>
              <button class="u-btn u-field__hover u-btn--link u-btn--blue">
                修改
              </button>
            </div>
          </div>
          <div class="u-field">
            <h3 class="u-field__label">修改图片</h3>
            <div class="u-field__content">
              <img
                src="https://imgs.aixifan.com/jy9Gvt7hIk-iYn2Qf-iyUvai-zMf2ya-qeeeea.jpg"
                @click="$util.showImageView($event.target)"
                style="margin:0;width:100%"
              />
              <button class="u-btn u-field__hover u-btn--link u-btn--blue">
                修改
              </button>
            </div>
          </div>
          <div class="u-field u-mt">
            <h3 class="u-field__label">长图片</h3>
            <div class="u-field__content">
              <div style="max-height:300px;"  class="u-scroll">
					<img
                  @click="$util.showImageView($event.target)"                   
                  src="https://nim-nosdn.netease.im/MTY3OTkxNjk=/bmltYV8xODI1MjY3MzQ5NV8xNjI4ODIxMzAxNDU2XzVmMDc4OWRlLTAzMzAtNGRmMi1iYzY2LTU2OWEwYTZiYTExMA==?createTime=1628821301390"
                />
              </div>
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
              <div class="u-inline" aria-label="开启后自动下载" tooltip="top">
                ?
              </div>
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
                <p class="u-inline">
                  <input
                    class="u-input u-input--small"
                    value="C:\Users\user\Documents"
                  />
                </p>
              </div>
              <div class="u-color-light">微信文件默认保存位置</div>
              <div>
                <a class="u-btn  u-btn--small">更改</a
                ><a class="u-btn  u-btn--small">打开文件夹</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1>弹窗使用和演示</h1>
      <div>
        <button
          class="u-btn"
          @click="$util.toast('提示')"
          aria-label="toast"
          tooltip="top"
        >
          提示
        </button>
        <button
          class="u-btn"
          @click="showLoading"
          aria-label="showLoading"
          tooltip="top"
        >
          加载中
        </button>
        <button
          class="u-btn"
          @click="$util.hideToast()"
          aria-label="hideToast"
          tooltip="top"
        >
          关闭其他
        </button>
        <button
          class="u-btn"
          @click="uploadAvatar"
          aria-label="uploadAvatar"
          tooltip="top"
        >
          上传头像
        </button>
        <button
          class="u-btn"
          @click="$util.toast('右键点击看效果')"
          @contextmenu.prevent="showContextMenu"
          aria-label="showContextMenu"
          tooltip="top"
        >
          右键菜单
        </button>
        <button
          class="u-btn"
          @click="showDropdown"
          aria-label="showDropdown"
          tooltip="top"
        >
          下拉菜单
        </button>
      </div>
      <div class="u-mt">
        <button
          class="u-btn"
          @click="
            $util.alert('十步杀一人，千里不留行。<br> 事了拂衣去，深藏身与名。')
          "
          aria-label="toast"
          tooltip="top"
        >
          侠客行
        </button>
        <button
          class="u-btn"
          @click="confirmInfo()"
          aria-label="toast"
          tooltip="top"
        >
          确认信息
        </button>
        <button
          class="u-btn"
          @click="deleteInfo()"
          aria-label="toast"
          tooltip="top"
        >
          删除提示
        </button>
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
 * @returns {String} index : 窗口索引，用于关闭
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

/**
 * util.alert(option,extend)
 * @param extend.confirmText: '确定',
 * @param extend.confirmSkin:'u-btn--blue',
 * @param extend.confirm: {Function},
 * @param extend.cancelText: '取消',
 * @param extend.cancelSkin: '',
 * @param extend.cancel: {Function},
 */
</code>
</pre>
      <h1>栅格（24）</h1>
      <div class="u-flex u-flex--row xx-shadow">
        <div class="u-flex-1">1</div>
        <div class="u-flex-2">2</div>
        <div class="u-flex-3">3</div>
        <div class="u-flex-6">6</div>
        <div class="u-flex-4">4</div>
        <div class="u-flex-5">5</div>
        <div class="u-flex-3">3</div>
        <div class="u-flex-12">12</div>
        <div class="u-flex-12">12</div>
      </div>
      <pre>.u-flex--row [.u-flex-1 ... .u-flex-24] </pre>
      <h1>其他</h1>
      <div>
        <span class="u-unread">未读消息 <code>u-unread</code></span>
        <span class="u-ml u-unread" data-unread="99+"
          >显示数字<code>data-unread</code></span
        >
      </div>
      <hr />
      <p>骨架 <code>u-skeleton</code></p>
      <div class="u-skeleton is-loading">
        <li
          class="u-skeleton__item"
          v-for="i in 4"
          :key="i"
          :style="{ width: i > 1 ? '100%' : '60%' }"
        ></li>
      </div>
      <p class="u-mt">过渡动画</p>
      <code class="u-mr">u-loading</code>
      <span class="u-loading"><i /><i /><i /></span>
      <code class="u-ml u-mr">u-looping</code>
      <span class="u-looping"><i /><i /><i /><i /></span>
      <p class="u-mb">加载条 <code>u-progress</code></p>
      <div class="u-progress is-loading" style="width:320px">
        <div class="u-progress-bar" style="width:50%"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabName: "a",
    };
  },
  methods: {
    showLoading() {
      this.$util.showLoading("0%");
      let now = +new Date();
      let timer = setInterval(() => {
        let v = Math.ceil(((new Date() - now) / 1000) * 100);
        if (v >= 100) {
          clearInterval(timer);
          this.$util.showSuccess("加载成功");
        } else {
          this.$util.showLoading(`加载${v}%`);
        }
      }, 66);
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
    confirmInfo() {
      this.$util.alert(
        {
          title: "确认信息",
          content: "检测到未保存的内容，是否在离开页面前保存修改？",
        },
        {
          confirmText: "放弃修改",
          confirm: (index) => this.$util.toast("放弃修改"),
        }
      );
    },
    deleteInfo() {
      this.$util.alert("此操作将永久删除该文件, 是否继续?", {
        confirmText: "确定",
        confirmSkin: "u-btn--red",
        confirm: (index) => this.$util.toast("删除成功"),
      });
    },
  },
};
</script>

<style lang="scss">
.xx-shadow > * {
  text-align: center;
  border: 1px solid #e2e2e2;
  box-sizing: border-box;
  color: #666;
  font-size: 13px;
}
</style>
