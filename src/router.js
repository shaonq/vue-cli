import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.use(VueRouter)

const view = path => {
  return Vue.extend(require(`@/views/${path}.vue`).default)
  // ()=>import('@/views/Index.vue')
}
export default new VueRouter({
  routes: [{
    path: '/',
    component: App,
    redirect:'/common',
    children: [{
      path: 'common',
      component: view('Index'),
      children: [
        {
          path: '',
          component: view('common/Index'),
          children: [
            {
              path: '',
              component: view('common/Form')
            },
            {
              path: 'notice',
              component: view('common/Notice')
            },
            {
              path: 'dialog',
              component: view('common/Dialog')
            },
            {
              path: 'worksheet',
              component: view('common/Worksheet')
            },
            {
              path: 'naotu',
              component: view('common/KityMinder')
            },
          ]
        }
      ]
    }]
  }]
})