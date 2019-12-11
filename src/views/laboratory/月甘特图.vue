<template>
    <div>
        <table>
           <tr>
               <td>部门</td>
               <td>人员</td>
           </tr>
        </table>
    </div>
</template>

<script>
const date = {
    toString: function (l, t) {
        let s = undefined;
        l = typeof l !== "object" ? new Date(l) : l;
        let q = l.getFullYear();
        let p = l.getMonth() + 1;
        let r = l.getDate();
        let m = l.getHours();
        let n = l.getMinutes();
        let o = l.getSeconds();
        p = (parseInt(p) < 10) ? ("0" + p) : (p);
        r = (parseInt(r) < 10) ? ("0" + r) : (r);
        m = (parseInt(m) < 10) ? ("0" + m) : (m);
        n = (parseInt(n) < 10) ? ("0" + n) : (n);
        o = (parseInt(o) < 10) ? ("0" + o) : (o);
        if ("yyyy-MM-dd HH:mm:ss" === t) {
            s = q + "-" + p + "-" + r + " " + m + ":" + n + ":" + o
        } else if ("yyyy-MM" === t) {
            s = q + "-" + p
        } else if ("HH:mm" === t) {
            s = m + ":" + n
        } else if ("yyyy" === t) {
            s = q
        } else {
            s = q + "-" + p + "-" + r
        }
        return s
    },
    toDate: function (q) {
        if (q.length === 19) {
            let p = q.substring(0, 4);
            let r = q.substring(5, 7);
            let m = q.substring(8, 10);
            let l = q.substring(11, 13);
            let n = q.substring(14, 16);
            let o = q.substring(17, 19);
            return new Date(p, r - 1, m, l, n, o)
        } else {
            if (q.length === 10) {
                let p = q.substring(0, 4);
                let r = q.substring(5, 7);
                let m = q.substring(8, 10);
                return new Date(p, r - 1, m)
            } else {
                if (q.length === 7) {
                    let p = q.substring(0, 4);
                    let r = q.substring(5, 7);
                    return new Date(p, r - 1)
                } else {
                    if (q.length === 4) {
                        let p = q.substring(0, 4);
                        return new Date(p)
                    } else {
                        return undefined
                    }
                }
            }
        }
    },
    getMonthDays: function (l, o) {
        let m = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let n = l.getFullYear();
        if (typeof o === "undefined") {
            o = l.getMonth()
        }
        if (((0 === (n % 4)) && ((0 !== (n % 100)) || (0 === (n % 400)))) && o === 1) {
            return 29
        } else {
            return m[o]
        }
    },
    addDays: function (l, n, f) {
        let m = (arguments.length === 1) ? this.toDate(this.today()) : this.toDate(n);
        m = new Date(m.getTime() + parseInt(l) * 24 * 3600 * 1000);
        return this.toString(new Date(m), f)
    },
    addMonths: function (p, o, f) {
        let l = (arguments.length === 1) ? this.toDate(this.today()) : this.toDate(o);
        let m = l.getMonth();
        let n = l.getDate();
        let q = this.getMonthDays(l, l.getMonth() + parseInt(p));
        if (n > q) {
            l.setDate(q)
        }
        l.setMonth(l.getMonth() + parseInt(p));
        return this.toString(l, f)
    },
    firstDayOfMonth: function (m, f) {
        let l = (arguments.length === 0) ? this.toDate(this.today()) : this.toDate(m);
        l.setDate(1);
        return this.toString(l, f)
    },
    today: function (l) {
        if (arguments.length === 0) {
            return this.toString(new Date(), "yyyy-MM-dd")
        } else {
            return this.toString(new Date(), l)
        }
    }
}

export default {
    created() {
        var day = date.today();
        var daynow = new Date(day);
        var monthDays = date.getMonthDays(daynow);
        var monthFirstDay = date.firstDayOfMonth(day);
        var monthDaylist = [];
        for (var i = 0; i < monthDays; i++)monthDaylist.push(date.addDays(i,monthFirstDay));



        console.log(monthDaylist)
        window.date = date;
        window.debug = this;
    }
}
</script>

<style>

</style>
