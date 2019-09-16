<template>
<div class="demo">
    <full-calendar @on-init="dataInit" :list="list" :holiday="holiday" @on-day="onDay" @on-item="onItem"></full-calendar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      holiday: [],
    }
  },
  methods: {
    dataInit(startDate, endDate,date) {
      this.getHoliday(date.slice(0, 7));
      this.list = [{
        "FBillNo": "QC01-0710-APQP-01",
        "EntryName": "1.1协议或合同",
        "PlanStartTime": "2019/09/21 00:00:00",
        "PlanEndTime": "2019/09/30 00:00:00"
      }, {
        "FBillNo": "QC01-0710-APQP-01",
        "EntryName": "1.2顾客特殊要求传递清单及工作任务单123",
        "PlanStartTime": "2019/09/21 00:00:00",
        "PlanEndTime": "2019/09/22 00:00:00"
      }, {
        "FBillNo": "QC01-0710-APQP-01",
        "EntryName": "1.3新项目信息输入输出检查表",
        "PlanStartTime": "2019/09/21 00:00:00",
        "PlanEndTime": "2019/09/23 00:00:00"
      }, {
        "FBillNo": "QC01-0710-APQP-01",
        "EntryName": "1.4新开发产品市场分析报告",
        "PlanStartTime": "2019/09/24 00:00:00",
        "PlanEndTime": "2019/09/24 00:00:00"
      }, {
        "FBillNo": "QC01-0710-APQP-01",
        "EntryName": "1.5工程工作申请单",
        "PlanStartTime": "2019/09/25 00:00:00",
        "PlanEndTime": "2019/09/25 00:00:00"
      }, {
        "FBillNo": "QC01-0710-APQP-01",
        "EntryName": "1.6产品成本核算表",
        "PlanStartTime": "2019/09/26 00:00:00",
        "PlanEndTime": "2019/09/26 00:00:00"
      }, {
        "FBillNo": "QC01-0710-APQP-01",
        "EntryName": "1.7项目经验-以往缺陷清单",
        "PlanStartTime": "2019/09/21 00:00:00",
        "PlanEndTime": "2019/09/27 00:00:00"
      }, {
        "FBillNo": "QC01-0710-APQP-01",
        "EntryName": "1.8产品设计方案评估报告",
        "PlanStartTime": "2019/09/28 00:00:00",
        "PlanEndTime": "2019/09/28 00:00:00"
      }, {
        "FBillNo": "QC01-0710-APQP-01",
        "EntryName": "1.9注塑模具设计制造方案评估报告",
        "PlanStartTime": "2019/09/29 00:00:00",
        "PlanEndTime": "2019/09/29 00:00:00"
      }, {
        "FBillNo": "QC01-0710-APQP-01",
        "EntryName": "1.10冲压模具设计制造方案评估报告",
        "PlanStartTime": "2019/09/30 00:00:00",
        "PlanEndTime": "2019/09/30 00:00:00"
      }, {
        "FBillNo": "QC01-0619-APQP-01",
        "EntryName": "1.1协议或合同",
        "PlanStartTime": "2019/09/21 00:00:00",
        "PlanEndTime": "2019/09/21 00:00:00"
      }, {
        "FBillNo": "QC01-0619-APQP-01",
        "EntryName": "1.2顾客特殊要求传递清单及工作任务单123",
        "PlanStartTime": "2019/09/22 00:00:00",
        "PlanEndTime": "2019/09/22 00:00:00"
      }, {
        "FBillNo": "QC01-0619-APQP-01",
        "EntryName": "1.3新项目信息输入输出检查表",
        "PlanStartTime": "2019/09/23 00:00:00",
        "PlanEndTime": "2019/09/23 00:00:00"
      }, {
        "FBillNo": "QC01-0619-APQP-01",
        "EntryName": "1.4新开发产品市场分析报告",
        "PlanStartTime": "2019/09/24 00:00:00",
        "PlanEndTime": "2019/09/24 00:00:00"
      }, {
        "FBillNo": "QC01-0619-APQP-01",
        "EntryName": "1.5工程工作申请单",
        "PlanStartTime": "2019/09/25 00:00:00",
        "PlanEndTime": "2019/09/25 00:00:00"
      }, {
        "FBillNo": "QC01-0619-APQP-01",
        "EntryName": "1.6产品成本核算表",
        "PlanStartTime": "2019/09/26 00:00:00",
        "PlanEndTime": "2019/09/26 00:00:00"      
      }].map(function(item, index) {
        let o ={};
        o.title =item.EntryName;
        o.content = `
订单编号：${item.FBillNo}
        `
        o.startDate = item.PlanStartTime;
        o.endDate = item.PlanEndTime;
        o.className = 'a' + Math.random().toString(16).slice(-6);
        return o
      })
    },
    getHoliday(date) {
      fetch('http://timor.tech/api/holiday/year/' + date).then(data => data.json()).then(data => {
        if (data && data.code === 0) {
          this.holiday = Object.values(data.holiday);
        }
      })
    },
    onDay(date) {
      console.log(date + '=> on-day')
    },
    onItem(date, item) {
      console.log(date + '=> on-item => '+JSON.stringify(item))
    },
  }
}
</script>

<style scoped lang="scss">
.demo {
  width: 90%;
  margin: 0 auto;
  background: #fff;
  margin-top: 70px;
  padding: 0 16px 16px;
  border-radius: 2px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, .05);
}
</style>
