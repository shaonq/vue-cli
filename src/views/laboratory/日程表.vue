<template>
  <div>
    <div class="u-pell--body">
      <h1>日程表</h1>
      <h1>日程表含义</h1>
      <p>日程表，根据日期安排活动顺序及内容的表格。可以用日程表来规划时间，安排办事的流程。</p>
      <h1>每日数据</h1>

      <pre>
// @param {Object[]}  list :porp list Array
  [{
    content: "QC01-0710-APQP-01",
    title: "1.1协议或合同",
    startDate: "2019/11/21 00:00:00",
    endDate: "2019/11/30 00:00:00",
    className:""
  }]

// @param {Object[]}  holiday :porp holiday Array
  [{
    "holiday":false,
    "name":"国庆节前调休",
    "target":"国庆节",
    "date":"2019-09-29"
  }]
</pre>

      <h1>例子</h1>
    </div>

    <u-full-calendar :list="list" />
  </div>
</template>

<script>
export default {
  data() {
    let now = this.$util.date.today("yyyy-MM-dd HH:mm:ss");
    console.log(now)
    return {
      list: [
        {
          content: "QC01-0710-APQP-01",
          title: "1.1协议或合同",
          startDate: now,
          endDate: now,
          className: "",
        },
      ],
    };
  },
  methods: {
    handleClick(e) {
      this.$util.toast(`您点击了 ${e.name}`);
    },
  },
};
</script>