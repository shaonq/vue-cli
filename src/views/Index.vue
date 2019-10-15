<template>
  <u-house top="60px" style="min-width:1103px;">
    <div class="layout-topbar" slot="top">
      <div style="height:60px;width:280px;" class="layout-topbar__logo"></div>
    </div>
    <router-view></router-view>
  </u-house>
</template>

<script>
export default {

}
</script>
<style lang="scss">
/**
 * layout 布局
 * top 60px 
 * left 224px
 *
 */

$primary-color: #398dee;
$layout-topbar-height: 60px; // 高度
$layout-topbar-text_active: #ffd04b; // 选中的颜色
$border-color:#ebeef5;
.layout {
  &-loadbar {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 101;
    display: none;
    height: 2px;
    pointer-events: none;
    background: $primary-color;
    transform: translateX(-100%);
    &.is-active {
      display: block;
      animation: layout-loadbar 1s ease-in-out 0.8s infinite;
    }
  } // layout-topbar
  &-topbar {
    position: relative;
    width: 100%;
    background-color: $primary-color;
    background-image: linear-gradient(to right bottom, #579ef1, $primary-color);
    box-shadow: 0 2px 4px rgba(33, 33, 33, 0.1);
    z-index: 999;
    &__logo {
      display: block;
      height: $layout-topbar-height;
      width: 240px;

      background-size:cover;
    }
    &__link {
      display: block;
      font-size: 15px;
      height: $layout-topbar-height;
      line-height: $layout-topbar-height;
      color: #fff;
      padding: 0 20px;
      cursor: pointer;
      transition: border-color 0.3s, background-color 0.3s, color 0.3s;
      border-bottom: 3px solid transparent;
      box-sizing: border-box;
      opacity: .6;
      &:hover {
         opacity: .83;
      }
      &.is-active {
        opacity: 1;
      }
    }
  }
  &-sidebar {
    position: relative;
    overflow: hidden;
    height: 100%;
    background: #fff;
    border-right: 1px solid $border-color;
    z-index: 888; // 列表
    &__ul {
      a {
        display: block;
        line-height: 42px;
        min-height: 42px;
        height: auto;
        color: #424242;
        text-decoration: none;
        padding-left: 20px;
        padding-right: 24px;
        border-left: 4px solid transparent;
        white-space: nowrap;
        transition: 333ms;
        &:hover{
            background-color: rgba(22,22, 22,0.05);
        }
        &.is-active {
          background-color: rgba(22,22, 22,0.05);
          color: $primary-color;
        }
      }
      &ti {
        font-weight: 400;
        font-size: 13px;
        line-height: 40px;
        padding-left: 24px;
        padding-right: 24px;
        margin-top: 8px;
        color: #999;
      }
    }
  }
  &-main {
    position: relative;
    height: 100%;
  }
}

@keyframes layout-loadbar {
  0% {
    transform: translateX(-100%);
  }

  40% {
    transform: translateX(0);
  }

  60% {
    transform: translateX(0);
  }

  to {
    transform: translateX(100%);
  }
}



/** 自定义字体  */
@font-face {
  font-family: 'icon-bsc';  /* project id 472676 */
  src: url('//at.alicdn.com/t/font_472676_akoma40ezbu.eot');
  src: url('//at.alicdn.com/t/font_472676_akoma40ezbu.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_472676_akoma40ezbu.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_472676_akoma40ezbu.woff') format('woff'),
  url('//at.alicdn.com/t/font_472676_akoma40ezbu.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_472676_akoma40ezbu.svg#icon-bsc') format('svg');
}
.icon-bsc{
  font-family: icon-bsc  !important;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>