// 工具
import UHouse from './componentHouse.vue';
import ULoad from './componentLoad.vue';
import UGantt from './componentGantt/Main.vue';
import UFullCalendar from './componentCalendar/Index.vue'
import UPell from './componentPell/Index.vue'
export default {
    install: function (Vue) {        
        Vue.component('u-house', UHouse);
        Vue.component('u-load', ULoad);  
        Vue.component('u-gantt', UGantt);  
        Vue.component('u-full-calendar', UFullCalendar)
        Vue.component('u-pell', UPell)
    }
}
