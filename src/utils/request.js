import axios from 'axios'
import store from '@/store'
import util from '@/utils/util/index'
// 查询 .ENV 配置 
// console.log(process.env)

// create an axios instance
const request = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    // withCredentials: true, // 跨域请求时发送cookie
    timeout: 1e4,
    //  transformRequest 在向服务器发送前，修改请求数据 
    transformRequest: [function (data) {
        /**
         * POST的默认请求体类型为Content-Type:application/json 
         * 自写 qs.stringify() 作用 'POST' data  为key => value 类型
         * 转换  application/json => application/x-www-form-urlencoded
         */
        if(toString.call(data).slice(8,-1) !== "FormData") {
            let i,body="";
            for(i in data)body+=encodeURIComponent(i)+"="+encodeURIComponent(data[i])+"&";
            return body.slice(0,-1)
        }
        return data
    }],
    //  transformResponse 在传递给 then/catch 前，允许修改响应数据
})

// request interceptor
request.interceptors.request.use(
    config => {
        //  发起请求之前

        if (store.getters.token) {
            // 在请求上携带 ['token'] 的自定义指令
            config.headers['token'] = store.getters.token
        }

        return config
    },
    error => {
        console.log('request config', error) //  request error for debug
        return Promise.reject(error)
    }
)

// response interceptor
request.interceptors.response.use(
    response => {
        const res = response.data
        // 处理请求成功后的数据 
        if (res.status === 10) {
            util.dialog.showError('登陆过期');
        } else if (res.status !== 0) {
            util.showError(res.msg||`${url} 出错了`);
            return Promise.reject(new Error(res.msg || 'Error'))
        } else {
            util.hideToast();
            return res.data || res
        }
    },
    error => {
        console.error('request response', error) // request error for debug
        return Promise.reject(error)
    }
)

export default request