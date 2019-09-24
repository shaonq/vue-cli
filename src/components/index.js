

import FullCalendar from './FullCalendar/Index.vue'
import KityMinder from './KityMinder/Index.vue'
export default {
    install: function (Vue) {
        Vue.component('full-calendar', FullCalendar)
        Vue.component('kity-minder', KityMinder)
    }
}
