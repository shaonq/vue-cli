
// 工具
import UHouse from './util/house/Index.vue';
import ULoad from './util/Load.vue';
import FullCalendar from './FullCalendar/Index.vue'
import KityMinder from './KityMinder/Index.vue'
export default {
    install: function (Vue) {
        // util
        Vue.component('u-house', UHouse);
        Vue.component('u-load', ULoad);  
        
        // 其他
        Vue.component('full-calendar', FullCalendar)
        Vue.component('kity-minder', KityMinder)
    }
}
