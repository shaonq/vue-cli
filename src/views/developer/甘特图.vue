<template>
  <div>
    <div class="u-quill-body">
      <h1>数据格式</h1>
      <pre><code class="language-javascript">
    {
      title: "0.1协议或合同",
      endDate: "2020-11-30",
      startDate: "2019-09-21",
      actualEndDate: "2020-11-29",
      actualStartDate: "2019-09-22",
      dateList: [
        { endDate: "2020-09-30", startDate: "2019-09-21", title: "0.1协议或合同", },
        { endDate: "2020-10-30", startDate: "2019-09-30", title: "0.1协议或合同", },
        { endDate: "2020-11-30", startDate: "2019-10-30", title: "0.1协议或合同", },
      ]
    }
      </code></pre>
      <h1>例子</h1>
    </div>
    <!-- gantt demo -->
    <div>
      <u-gantt :list="list" style="height:380px" class="test-gantt" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          FBillNo: "QC01-0710-APQP-01",
          EntryName: "1.1协议或合同",
          PlanStartTime: "2019/09/21 00:00:00",
          PlanEndTime: "2019/09/30 00:00:00",
        },
        {
          FBillNo: "QC01-0710-APQP-01",
          EntryName: "1.2顾客特殊要求传递清单及工作任务单123",
          PlanStartTime: "2019/09/21 00:00:00",
          PlanEndTime: "2019/09/22 00:00:00",
        },
        {
          FBillNo: "QC01-0710-APQP-01",
          EntryName: "1.3新项目信息输入输出检查表",
          PlanStartTime: "2019/09/21 00:00:00",
          PlanEndTime: "2019/09/23 00:00:00",
        },
        {
          FBillNo: "QC01-0710-APQP-01",
          EntryName: "1.4新开发产品市场分析报告",
          PlanStartTime: "2019/09/24 00:00:00",
          PlanEndTime: "2019/09/24 00:00:00",
        },
        {
          FBillNo: "QC01-0710-APQP-01",
          EntryName: "1.5工程工作申请单",
          PlanStartTime: "2019/09/25 00:00:00",
          PlanEndTime: "2019/09/25 00:00:00",
        },
        {
          FBillNo: "QC01-0710-APQP-01",
          EntryName: "1.6产品成本核算表",
          PlanStartTime: "2019/09/26 00:00:00",
          PlanEndTime: "2019/09/26 00:00:00",
        },
        {
          FBillNo: "QC01-0710-APQP-01",
          EntryName: "1.7项目经验-以往缺陷清单",
          PlanStartTime: "2019/09/21 00:00:00",
          PlanEndTime: "2019/09/27 00:00:00",
        },
        {
          FBillNo: "QC01-0710-APQP-01",
          EntryName: "1.8产品设计方案评估报告",
          PlanStartTime: "2019/09/28 00:00:00",
          PlanEndTime: "2019/09/28 00:00:00",
        },
        {
          FBillNo: "QC01-0710-APQP-01",
          EntryName: "1.9注塑模具设计制造方案评估报告",
          PlanStartTime: "2019/09/29 00:00:00",
          PlanEndTime: "2019/09/29 00:00:00",
        },
        {
          FBillNo: "QC01-0710-APQP-01",
          EntryName: "1.10冲压模具设计制造方案评估报告",
          PlanStartTime: "2019/09/30 00:00:00",
          PlanEndTime: "2019/09/30 00:00:00",
        },
        {
          FBillNo: "QC01-0619-APQP-01",
          EntryName: "1.1协议或合同",
          PlanStartTime: "2019/09/21 00:00:00",
          PlanEndTime: "2019/09/21 00:00:00",
        },
        {
          FBillNo: "QC01-0619-APQP-01",
          EntryName: "1.2顾客特殊要求传递清单及工作任务单123",
          PlanStartTime: "2019/09/22 00:00:00",
          PlanEndTime: "2019/09/22 00:00:00",
        },
        {
          FBillNo: "QC01-0619-APQP-01",
          EntryName: "1.3新项目信息输入输出检查表",
          PlanStartTime: "2019/09/23 00:00:00",
          PlanEndTime: "2019/09/23 00:00:00",
        },
        {
          FBillNo: "QC01-0619-APQP-01",
          EntryName: "1.4新开发产品市场分析报告",
          PlanStartTime: "2019/09/24 00:00:00",
          PlanEndTime: "2019/09/24 00:00:00",
        },
        {
          FBillNo: "QC01-0619-APQP-01",
          EntryName: "1.5工程工作申请单",
          PlanStartTime: "2019/09/25 00:00:00",
          PlanEndTime: "2019/09/25 00:00:00",
        },
        {
          FBillNo: "QC01-0619-APQP-01",
          EntryName: "1.6产品成本核算表",
          PlanStartTime: "2019/09/26 00:00:00",
          PlanEndTime: "2019/09/26 00:00:00",
        },
      ].map((item, index) => {
        let o = {};
        o.title = item.EntryName;
        o.content = ` 订单编号：${item.FBillNo} `;
        o.startDate = item.PlanStartTime;
        o.endDate =
          new Date().toJSON().slice(0, 7).replace("-", "/") +
          item.PlanEndTime.slice(7);
        o.className = "a" + Math.random().toString(16).slice(-6);
        let t; //="yyyy-MM-dd HH:mm:ss"
        o.startDate = this.$util.date.toString(new Date(o.startDate), t);
        o.endDate = this.$util.date.toString(new Date(o.endDate), t);
        return o;
      }),
    };
  },
  methods: {
    handleClick(e) {
      this.$util.toast(`您点击了 ${e.name}`);
    },
  },
  created() {
    this.list.unshift({
      className: "a653e82",
      content: " 订单编号：QC01-0710-APQP-01 ",
      endDate: "2020-11-30",
      startDate: "2019-09-21",
      title: "0.1协议或合同",
      actualEndDate: "2020-11-29",
      actualStartDate: "2019-09-22",
      dateList: [
        { endDate: "2020-09-30", startDate: "2019-09-21", title: "0.1协议或合同", },
        { endDate: "2020-10-30", startDate: "2019-09-30", title: "0.1协议或合同", },
        { endDate: "2020-11-30", startDate: "2019-10-30", title: "0.1协议或合同", },
      ]

    });
  },
  mounted() {
    this.$cdn.Prism();    // 代码高亮
  }
};
</script>
<style lang="scss">
.test-gantt {
  thead {
    td {
      border-color: #f79898;
      background: #f79898;
      color: #fff;
    }
  }
}
</style>