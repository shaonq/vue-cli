import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import ElementUI from 'element-ui'
// DIY 
import Components from '@/components/'
Vue.use(Components);
Vue.use(ElementUI)

// 添加工具
import nui from '@/utils/nui'
import util from '@/utils/util'
// 添加过滤 指令
import '@/utils/filter'
import '@/utils/directive'
// 引入主题
import '@/theme/index.scss'

Vue.config.productionTip = false

// 变量挂载
Object.defineProperties(Vue.prototype, {
  $util: {
    get() { return util }
  },
  $nui: {
    get() { return nui }
  },
})

// 初始化
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
