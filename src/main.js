import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
Vue.config.productionTip = false

// 第三方和自写UI 
import ElementUI from 'element-ui'
import Components from '@/components/'
Vue.use(Components);
Vue.use(ElementUI)

// 添加工具
import util from '@/utils'
// import '@/utils/util/index.scss'
import http from '@/utils/request'

// 引入主题
import '@/styles/index.scss'

// 变量挂载
Object.defineProperties(Vue.prototype, {
  $util: { get() { return util } },
  $http: { get() { return http } },
})

// 初始化 debug
window.app = new Vue({ router, store, render: h => h(App) }).$mount('#app')