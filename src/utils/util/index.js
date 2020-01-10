// 处理时间
import date from './date.js'
// 弹窗
import dialog from './dialog.js';
// 辅助方法
import assist from './assist.js';

const util = {
  // 浏览器信息
  browser: function() {
    let d = {},
      ua = navigator.userAgent;
    return d.ios = !!ua.match(/(iphone|ipod|ipad)/i), d.android = !!ua.match(/android/i), d.wechat = !!ua.match(/micromessenger/i), ua = ua.match(/msie \d+?/i), d.ie = function() {
      let t = navigator.userAgent.toLowerCase();
      return window.ActiveXObject || "ActiveXObject" in window ? (t.match(/msie\s(\d+)/) || [])[1] || "11" : !1
    }(), d
  }(),
  // cookie
  cookie: {
    set(name, value, domain, path, expires, is) {
      value = assist.stringify(value);
      if (expires) { var d = new Date; d.setTime(d.getTime() + expires * 1000 * 60 * 60 * 24); expires = d; d = null; }
      document.cookie = name + "=" + (is ? value : escape(value)) + (expires ? "; expires=" + expires.toGMTString() : "") + (path ? "; path=" + path : "; path=/") + (domain ? "; domain=" + domain : "")
    },
    get(name, value) {
      var o = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
      return null != o ? assist.parse(unescape(o[2])) : value;
    },
    clear(name, path, domain) {
      this.get(name) && (document.cookie = name + "=" + (path ? "; path=" + path : "; path=/") + (domain ? "; domain=" + domain : "") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT")
    }
  },
  // store
  store: {
    set: function(name, value) {
      return window.localStorage.setItem(name, assist.stringify(value))
    },
    get: function(name) {
      let value = window.localStorage.getItem(name) || "";
      return assist.parse(value)
    },
    clear: function(name) {
      return window.localStorage.removeItem(name)
    }
  }
};


export default Object.assign(util, dialog, assist, { date });

