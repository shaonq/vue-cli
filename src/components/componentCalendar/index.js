import UTIL_LUNAR from './lunar.js'
import UTIL_DATE from './date.js'
import './index.scss';
export default {
    props: {
        list: {
            type: Array,
            default: []
        },
        type: {
            type: String,
            default: 'month' // month | week | day
        },
        holiday: Array // 法定节假日
        //{"holiday":false,"name":"国庆节前调休","target":"国庆节","date":"2019-09-29"}
    },
    data() {
        return {
            activeDay: '', //当前选中的日期
            monthRange: [], // 月数据范围
            renderType: this.type, // month week day
        }
    },
    created() {
        this.activeDay = this.toDay;
    },
    watch: {
        activeDay(val) {
            let [startDate, endDate] = [this.$date.firstDayOfMonth(val), this.$date.lastDayOfMonth(val)];
            let [start, end] = this.monthRange;
            if (startDate !== start && endDate !== end) {
                // init
                this.monthRange = [startDate, endDate];
                this.$emit('on-init', startDate, endDate, val);
            }

        }
    },
    computed: {
        listFormat() {
            return this.list.map((item, index) => {
                let startDate = this.$date.toString(item.startDate);
                let o = {
                    title: item.title,
                    content: item.content,
                    startDate,
                    endDate: item.endDate ? this.$date.toString(item.endDate) : '',
                    _hm: this.$date.toString(item.startDate, "HH:mm"),
                    _className: {},
                    _source: item
                };
                if (item.className) o._className = { [item.className]: true }
                return o
            })
        },
        $date: () => UTIL_DATE,
        toDay() {
            return this.$date.today();
        },
        // 计算日期
        diffDays: function (a, b, bool) {
            let d = (this.$date.toDate(a) - this.$date.toDate(b)) / (24 * 3600 * 1000);
            return bool ? d : (d < 0 ? -d : d)
        },
        monthList() { // 当月数据，按周分
            let first = this.$date.firstDayOfMonth(this.activeDay);
            let len = 36,
                i = 0,
                j = 0,
                _j = 0,
                list = [];
            while (i < len) {
                j = (i / 7) | 0;
                if (j === _j) {
                    let t = this.$date.addDays(7 * j, first);
                    list.push([this.$date.sunOfWeek(t), this.$date.monOfWeek(t), this.$date.tueOfWeek(t), this.$date.wedOfWeek(t), this.$date.turOfWeek(t), this.$date.friOfWeek(t), this.$date.satOfWeek(t)]);
                    t = null, _j++
                }
                i++
            }
            return list
        },
        weekList() { // 当前周的数据
            let t = this.activeDay;
            return [this.$date.sunOfWeek(t), this.$date.monOfWeek(t), this.$date.tueOfWeek(t), this.$date.wedOfWeek(t), this.$date.turOfWeek(t), this.$date.friOfWeek(t), this.$date.satOfWeek(t)]
        },
        // 本月的数据集合
        getItems() {
            let arr = {};
            this.monthList.forEach(week => week.forEach(ymd => arr[ymd] = this.getItem(ymd)));
            return arr;
        }
    },
    methods: {
        // 获取农历
        toLunar(date) {
            let val = '',
                value;
            let item = UTIL_LUNAR(new Date(date));
            value = (item.lunarDate === 1 ? item.lMonth + '月' : item.lDate)
            item.festival().forEach(item => {
                if (~'thc'.indexOf(item.type)) val = item.value;
            })
            return val || value
        },
        // 获取农历详情
        dayLunar(date) {
            let item = UTIL_LUNAR(new Date());
            return item.lMonth + '月' + item.lDate + ' ' + item.animal + '年'
        },
        // 获取年份
        getYear(ymd) {
            return +ymd.split('-')[0]
        },
        // 获取月份
        getMonth(ymd) {
            return +ymd.split('-')[1]
        },
        // 获取天
        getDay(ymd) {
            return +ymd.split('-')[2]
        },
        // 获取当天的数据
        getItem(ymd) {
            let date = +new Date(ymd);
            let arr = this.listFormat.filter(item => {
                let {
                    startDate,
                    endDate
                } = item;
                let start = +new Date(startDate);
                if (endDate) {
                    let end = +new Date(endDate);
                    return date >= start && date <= end;
                }
                return date === start
            })
            return JSON.parse(JSON.stringify(arr)).map(item => {
                let css_start = "is-start";
                let css_end = "is-end";
                let {
                    startDate,
                    endDate
                } = item;
                if (endDate) {
                    let start = +new Date(startDate);
                    let end = +new Date(endDate);
                    if (date === start) item._className[css_start] = true;
                    if (date === end) item._className[css_end] = true;
                } else {
                    item._className[css_start] = true;
                    item._className[css_end] = true;
                }
                item.date = ymd;
                return item
            })
        },
        // 法定节假日
        getHoliday(date, holiday = true) {
            let [item] = this.holiday.filter(d => d.date === date);
            return item && item.holiday === holiday
        }

    }
}