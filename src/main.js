import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import nui from './utils/nui'
import util from './utils/util'
import mixin from './utils/mixin'
import './utils/filter'
import './theme/index.scss'

Vue.config.productionTip = false

// 变量挂载
Object.defineProperties(Vue.prototype, {
  $nui: {
    get() {
      return nui
    }
  },
  $util: {
    get() {
      return utils
    }
  },
})

// 初始化
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
