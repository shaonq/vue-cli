import '@babel/polyfill'

import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
Vue.config.productionTip = false

// add component
import Components from '@/components/'
Vue.use(Components);

// add util
import util from 'shaonq'
import http from '@/utils/request'

// add theme
import '@/theme/index.scss'

// add global variable
Object.defineProperties(Vue.prototype, {
  $util: { get() { return util } },
  $http: { get() { return http } },

  // 当前系统下的钩子
  $cdn: {
    get() {
      return {
        // 代码高亮
        Prism: function () {
        }
      }
    }
  }
})

// 初始化 debug
window.app = new Vue({ router, store, render: h => h(App) }).$mount('#app')