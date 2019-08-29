

import HelloWorld from './HelloWorld.vue'
export default {
    install: function (Vue) {
        Vue.component('n-code', HelloWorld)
    }
}
