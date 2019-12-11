// 工具
import UHouse from './House.vue';
import ULoad from './Load.vue';
import UMd from './Md.vue';
import UGantt from './gantt/Main.vue';
import UFullCalendar from './fullCalendar/Index.vue'
import UPell from './pell/Index.vue'

export default {
    install: function (Vue) {
        
        Vue.component('u-house', UHouse);
        Vue.component('u-load', ULoad);  
        Vue.component('u-md', UMd);  
        Vue.component('u-gantt', UGantt);  
        Vue.component('u-full-calendar', UFullCalendar)
        Vue.component('u-pell', UPell)
    }
}
