// 工具
import ULoad from './componentLoad.vue';
import UGantt from './componentGantt/Main.vue';
import UFullCalendar from './componentCalendar/Index.vue';
import UQuill from './componentQuill/Index.vue';
import UCharts from './componentChart';
import URouteBar from './componentRouteBar';



export default {
    install: function (Vue) {
        Vue.component('u-load', ULoad);
        Vue.component('u-gantt', UGantt);
        Vue.component('u-full-calendar', UFullCalendar);
        Vue.component('u-quill', UQuill);
        Vue.component('u-chart', UCharts);
        Vue.component('u-route-bar', URouteBar);
    }
}
