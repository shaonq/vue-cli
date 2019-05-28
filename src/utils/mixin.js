/**
 * mixin.js
 * @desc 全局通用
 */

let httpUrl = 'http://172.16.20.177:9009/Mes/MesApi'; // 测试地址
if('production'=== process.env.NODE_ENV) httpUrl ='http://192.168.1.28:9001/Mes/MesApi'; // 正式地址
const httpData = (Body = {}) => {
  return {
    AppInfo: {
      appVersion: "1.0",
      challenge: "false",
      client: "Web",
      sysVersion: "1.0",
      timeStamp: +new Date
    },
    Body
  }
};
export default {
  methods: {
    // http 请求封装
    $post(url, data, success, fail, loading = true) {
      // 方便简写
      if (typeof data === "function") {
        loading = typeof fail === "undefined" ? true : fail;
        fail = success;
        success = data;
        data = {};
      }

      // 控制加载动画
      if (typeof fail === "boolean") {
        loading = fail;
        fail = null;
      }

      const nui = this.$nui;
      // 默认的错误提示
      const error = (error, title = '错误信息') => {
        nui.close();
        nui.open(
          {
            title,
            content: `<div style="word-break: break-all;word-wrap: break-word;">${error}</div>`,
            width: '4rem'
          }
        );
      };
      let index = -1;
      loading && (index = nui.showLoading('loading'));
      url = url.slice(0, 4) === "http" ? url : (httpUrl + url);

      nui.http(url, httpData(data),
        function (e) {
          loading && nui.hideToast(index);
          try {
            const {data = "", result = {}} = e;
            if (result.errorCode === 0) {
              success && success(data)
            } else if (result.errorCode === 2) {
              fail ? fail(e) : nui.toast(result.msg || '没有提示信息', '提示');
            } else {
              fail ? fail(e) : error(typeof e === "string" ? e.slice(0, 200) : result.msg || '后台没有给出报错信息', '系统异常')
            }
          } catch (e) {
            fail ? fail(e) : error('请回JSON格式的参数');
          }
        },
        {
          type: 'post',
          error: function (e) {
            loading && nui.hideToast(index);
            console.log(e)
            nui.open({
              title:'网络超时',
              content:'<pre>readyState '+e.readyState+'<br>status '+e.status +'</pre>'
            });
          }
        }
      )
    },
  }
};
