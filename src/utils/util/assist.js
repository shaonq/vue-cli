/**
 * @name 辅助方法
 * @date 2019-01-09
 * @author shaonq@qq.com
 */

export default {
  // 防重复执行JSON.stringify
  stringify: function(val) {
    if (typeof val === 'object') try { return JSON.stringify(val) } catch (e) { }
    return val
  },
  // 防重复执行JSON.parse
  parse: function(val) {
    if (typeof val === 'string') try { return JSON.parse(val) } catch (e) { }
    return val
  },
  // 是否是一个有效数字
  isNumber: function(val) {
    return typeof val === 'number' && val.toString() !== 'NaN'
  },
  // 是否是一个有长度的数组
  isArrayLen: function(val) {
    return typeof val === 'object' && val.length > 0
  },
  // 数字转百分比
  toPercent: function(a) {
    return (Math.round(a * 10000) / 100).toFixed(2) + '%';
  },
  // 数字转千分符
  toThousands: function(a) {
    return ('' + a).replace(/\B(?=(\d{3})+\b)/g, ',')
  },
  // 浅拷贝一个对象
  clone: function(val) {
    return typeof val === "object" ? this.parse(this.stringify(val)) : val
  },
  // Json字符转Object
  toObject: function(val) {
    return val = this.parse(val), typeof val === 'object' ? val : {}
  },
  /**
   * *
   * @param func {Function}
   * @param wait {number}
   * @param immediate {bool}
   * @returns {Function}
   * 等待执行,在time之内只执行1次
   */
  debounce: function(func, wait, immediate) {
    let timeout, args, context, timestamp, result;

    let later = function() {
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

    return function() {
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
  throttle: function(func, wait, options) {
    let context, args, result;
    let timeout = null;
    let previous = 0;
    if (!options) options = {};
    let later = function() {
      previous = options.leading === false ? 0 : +new Date();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
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
}