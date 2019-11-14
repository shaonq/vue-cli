// 工具
import UHouse from './util/house/Index.vue';
import ULoad from './util/Load.vue';
import UMd from './util/Md.vue';
import UGantt from './gantt/Main.vue';

export default {
    install: function (Vue) {
        // util
        Vue.component('u-house', UHouse);
        Vue.component('u-load', ULoad);  
        Vue.component('u-md', UMd);  
        Vue.component('u-gantt', UGantt);  
    }
}
