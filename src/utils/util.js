/**
 * cookie
 * @param {string}  name 名称
 * @param {Object}  value AES 加密
 * @return cookie.set("cookie",e,document.domain,"/",7)
 */

const utils = {
  is: function () {
    let d = {},
      ua = navigator.userAgent;
    return d.ios = !!ua.match(/(iphone|ipod|ipad)/i), d.android = !!ua.match(/android/i), d.wechat = !!ua.match(/micromessenger/i), ua = ua.match(/msie \d+?/i), d.ie = function () {
      let t = navigator.userAgent.toLowerCase();
      return window.ActiveXObject || "ActiveXObject" in window ? (t.match(/msie\s(\d+)/) || [])[1] || "11" : !1
    }(), d
  }(),
  cookie: {
    set(name, value, domain, path, expires, is) {
      value = typeof value === "object" ? JSON.stringify(value) : value;
      document.cookie = name + "=" + (is ? value : decodeURI(value)) + (expires ? "; expires=" + expires.toGMTString() : "") + (path ? "; path=" + path : "; path=/") + (domain ? "; domain=" + domain : "")
    },
    get(name, value) {
      let o = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
      value = null !== o ? decodeURIComponent(o[2]) : value;
      try {
        return JSON.parse(value)
      } catch (e) {
      }
      return value
    },
    clear(name, path, domain) {
      this.get(name) && (document.cookie = name + "=" + (path ? "; path=" + path : "; path=/") + (domain ? "; domain=" + domain : "") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT")
    }
  }
  ,
  session: {
    set: function (name, value) {
      value = typeof value === "object" ? JSON.stringify(value) : value;
      return window.sessionStorage.setItem(name, value)
    },
    get: function (name) {
      let value = window.sessionStorage.getItem(name) || "";
      return value.indexOf('{') > -1 ? JSON.parse(value) : value
    },
    clear: function (name) {
      return window.sessionStorage.removeItem(name)
    }
  },
  store: {
    set: function (name, value) {
      value = typeof value === "object" ? JSON.stringify(value) : value;
      return window.localStorage.setItem(name, value)
    },
    get: function (name) {
      let value = window.localStorage.getItem(name) || "";
      return value.indexOf('{') > -1 ? JSON.parse(value) : value
    },
    clear: function (name) {
      return window.localStorage.removeItem(name)
    }
  },
  /**
   * *
   * @param func {Function}
   * @param wait {number}
   * @param immediate {bool}
   * @returns {Function}
   * 等待执行,在time之内只执行1次
   */
  debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result;

    let later = function () {
      let last = +new Date() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function () {
      context = this;
      args = arguments;
      timestamp = +new Date();
      let callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  },
  /**
   * *
   * @param func {Function}
   * @param wait {number}
   * @param options {object}
   * @returns {Function}
   * 立即执行,在time之内只执行1次
   */
  throttle(func, wait, options) {
    let context, args, result;
    let timeout = null;
    let previous = 0;
    if (!options) options = {};
    let later = function () {
      previous = options.leading === false ? 0 : +new Date();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function () {
      let now = +new Date();
      if (!previous && options.leading === false) previous = now;
      let remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  },

  date: {
    toString: function (l, t) {
      let s = undefined;
      l = typeof l !== "object" ? new Date(l) : l;
      let q = l.getFullYear();
      let p = l.getMonth() + 1;
      let r = l.getDate();
      let m = l.getHours();
      let n = l.getMinutes();
      let o = l.getSeconds();
      p = (parseInt(p) < 10) ? ("0" + p) : (p);
      r = (parseInt(r) < 10) ? ("0" + r) : (r);
      m = (parseInt(m) < 10) ? ("0" + m) : (m);
      n = (parseInt(n) < 10) ? ("0" + n) : (n);
      o = (parseInt(o) < 10) ? ("0" + o) : (o);
      if ("yyyy-MM-dd HH:mm:ss" === t) {
        s = q + "-" + p + "-" + r + " " + m + ":" + n + ":" + o
      } else if ("yyyy-MM" === t) {
        s = q + "-" + p
      } else if ("HH:mm" === t) {
        s = m + ":" + n
      } else if ("yyyy" === t) {
        s = q
      } else { // "yyyy-MM-dd"
        s = q + "-" + p + "-" + r
      }
      return s
    },
    toDate: function (q) {
      if (q.length === 19) {
        let p = q.substring(0, 4);
        let r = q.substring(5, 7);
        let m = q.substring(8, 10);
        let l = q.substring(11, 13);
        let n = q.substring(14, 16);
        let o = q.substring(17, 19);
        return new Date(p, r - 1, m, l, n, o)
      } else {
        if (q.length === 10) {
          let p = q.substring(0, 4);
          let r = q.substring(5, 7);
          let m = q.substring(8, 10);
          return new Date(p, r - 1, m)
        } else {
          if (q.length === 7) {
            let p = q.substring(0, 4);
            let r = q.substring(5, 7);
            return new Date(p, r - 1)
          } else {
            if (q.length === 4) {
              let p = q.substring(0, 4);
              return new Date(p)
            } else {
              return undefined
            }
          }
        }
      }
    },
    getMonthDays: function (l, o) {
      let m = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      let n = l.getFullYear();
      if (typeof o === "undefined") {
        o = l.getMonth()
      }
      if (((0 === (n % 4)) && ((0 !== (n % 100)) || (0 === (n % 400)))) && o === 1) {
        return 29
      } else {
        return m[o]
      }
    },
    addDays: function (l, n, f) {
      let m = (arguments.length === 1) ? this.toDate(this.today()) : this.toDate(n);
      m = new Date(m.getTime() + parseInt(l) * 24 * 3600 * 1000);
      return this.toString(new Date(m), f)
    },
    addMonths: function (p, o, f) {
      let l = (arguments.length === 1) ? this.toDate(this.today()) : this.toDate(o);
      let m = l.getMonth();
      let n = l.getDate();
      let q = this.getMonthDays(l, l.getMonth() + parseInt(p));
      if (n > q) {
        l.setDate(q)
      }
      l.setMonth(l.getMonth() + parseInt(p));
      return this.toString(l, f)
    },
    addMonthsForStart: function (n, m) {
      let l = (arguments.length === 1) ? this.today() : m;
      l = this.addMonths(n, l);
      return this.firstDayOfMonth(l)
    },
    addMonthsForEnd: function (n, m) {
      let l = (arguments.length === 1) ? this.today() : m;
      l = this.addMonths(n, l);
      return this.addDays(-1, this.firstDayOfMonth(l))
    },
    addYears: function (m, n, f) {
      let l = (arguments.length === 1) ? this.toDate(this.today()) : this.toDate(n);
      l.setYear(l.getFullYear() + parseInt(m));
      return this.toString(l, f)
    },
    addYearsForStart: function (l, n) {
      let m = (arguments.length === 1) ? this.today() : n;
      m = this.addYears(l, m);
      return this.firstDayOfYear(m)
    },
    addYearsForEnd: function (l, n) {
      let m = (arguments.length === 1) ? this.today() : n;
      m = this.addYears(l, m);
      return this.firstDayOfYear(m)
    },
    sunOfWeek: function (m, f) {
      let l = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(m);
      l = new Date(l - (l.getDay()) * (24 * 3600 * 1000));
      return this.toString(l, f)
    },
    monOfWeek: function (m, f) {
      let l = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(m);
      l = new Date(l - (l.getDay() - 1) * (24 * 3600 * 1000));
      return this.toString(l, f)
    },
    tueOfWeek: function (m, f) {
      let l = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(m);
      l = new Date(l - (l.getDay() - 2) * (24 * 3600 * 1000));
      return this.toString(l, f)
    },
    wedOfWeek: function (m, f) {
      let l = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(m);
      l = new Date(l - (l.getDay() - 3) * (24 * 3600 * 1000));
      return this.toString(l, f)
    },
    turOfWeek: function (m, f) {
      let l = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(m);
      l = new Date(l - (l.getDay() - 4) * (24 * 3600 * 1000));
      return this.toString(l, f)
    },
    friOfWeek: function (m, f) {
      let l = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(m);
      l = new Date(l - (l.getDay() - 5) * (24 * 3600 * 1000));
      return this.toString(l, f)
    },
    satOfWeek: function (m, f) {
      let l = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(m);
      l = new Date(l - (l.getDay() - 6) * (24 * 3600 * 1000));
      return this.toString(l, f)
    },
    firstDayOfMonth: function (m, f) {
      let l = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(m);
      l.setDate(1);
      return this.toString(l, f)
    },
    lastDayOfMonth: function (l) {
      l = (arguments.length === 0) ? this.today() : (l);
      l = this.addMonths(1, l);
      l = this.firstDayOfMonth(l);
      l = this.addDays(-1, l);
      return l
    },
    firstDayOfYear: function (m, f) {
      let l = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(m);
      l.setMonth(0);
      l.setDate(1);
      return this.toString(l, f)
    },
    lastDayOfYear: function (m, f) {
      let l = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(m);
      l.setMonth(11);
      l.setDate(31);
      return this.toString(l, f)
    },
    today: function (l) {
      if (arguments.length === 0) {
        return this.toString(new Date(), "yyyy-MM-dd")
      } else {
        return this.toString(new Date(), l)
      }
    }
  },
  // global util
  typeName(val) {
    return toString.call(val).slice(8, -1)
  },
  isNumber(val) {
    return this.typeName(val) === 'Number' && val.toString() !== 'NaN'
  },
  isArrayLen(val) {
    return this.typeName(val) === 'Array' && val.length > 0
  },
  toPercent(a) {
    return (Math.round(a * 10000) / 100).toFixed(2) + '%';
  },
  toClone(obj){
    return typeof obj === "object" ? JSON.parse(JSON.stringify(obj)) : obj
  }
};


export default utils;

