// 日期格式化 'yyyy-MM-dd HH:mm:ss'

import Vue from 'vue'
Vue.filter('ymd', function (value) {
    return (value && typeof value === 'string') ? value.slice(0,10):value
});