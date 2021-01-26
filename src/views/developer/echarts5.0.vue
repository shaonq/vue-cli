<template>
  <div>
    <!-- 折线图1 -->
    <div class="u-card">
      <div class="u-card__hd">
        <cite class="u-card__title">折线图1</cite>
      </div>
      <div class="u-card__bd">
        <u-chart style="height:200px" :options="line1" />
      </div>
      <!-- 折线图2 -->
      <div class="u-card__hd">
        <cite class="u-card__title">折线图2</cite>
      </div>
      <div class="u-card__bd" style="background: #21285f;">
        <u-chart style="height:200px" :options="line2" />
      </div>
    </div>
  </div>
</template>

<script>
import { graphic } from "echarts";
export default {
  data() {
    return {
      len20list: [],
      line1: {
        tooltip: { show: true },
        xAxis: [{
          type: "category",
          boundaryGap: false,
          data: [/** array */],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{ type: "value" }],
        series: [{
          name: "条形图1",
          type: "line",
          data: [/** array */],
          areaStyle: { show: true },
          itemStyle: {
            borderRadius: [0, 5, 5, 0],
            // areaStyle.show = true , graphic.LinearGradient 前四个参数位，右下左上，渐变色网站 https://uigradients.com
            color: graphic.LinearGradient(0, 0, 1, 0, ["#feac5e", " #c779d0"].map((color, index) => ({ color, offset: index })))
          }
        }]
      },
      line2: {
        tooltip: { show: true },
        xAxis: [{
          type: "category",
          boundaryGap: true,
          data: [/** array */],
          splitLine: { show: false },
          axisTick: { alignWithLabel: true },
        }],
        yAxis: [{
          type: "value",
          splitLine: { lineStyle: { color: "rgba(250,250,250,0.08)" } },
        }],
        series: [{
          name: "折线图2",
          type: "line",
          data: [/** array */],
          itemStyle: {
            color: "#feac5e"
          }
        }, {
          name: "柱状图2",
          type: "bar",
          data: [/** array */],
          itemStyle: {
            borderRadius: [4, 4, 0, 0],
            color: "#c779d0"
          }
        }]
      }

    }
  },
  methods: {
    createRandom(len = 1, max = 1e4, min = 0) {
      return Array(len).toString().split(',').map(() => (Math.random() * (max - min)) | 0)
    },
    dataInit() {
      if (!this.len20list.length) this.len20list = this.createRandom(20, 2e4, 1e4);
      let len20list = this.len20list.slice(1).concat(this.createRandom(1, 2e4, 1e4));
      this.len20list = len20list;
      this.line1.xAxis[0].data = len20list;
      this.line1.series[0].data = len20list;
      let len10list = len20list.slice(0, 10);
      this.line2.xAxis[0].data = len10list;
      this.line2.series[0].data = len10list;
      this.line2.series[1].data = len20list.slice(10);
      this.timer = setTimeout(this.dataInit, 5e3);
    }
  },
  created() {
    this.dataInit()
  },
  destroyed() {
    this.timer && clearTimeout(this.timer)
  }
}
</script>

<style lang="scss">
</style>