<template>
  <div class="u-gantt" ref="el" style="overflow: auto;"></div>
</template>

<script>
import { utils, SVGGantt } from "gantt";
const _Array = {
  type: Array,
  default: () => [],
};
export default {
  props: {
    tasks: _Array,
    links: _Array,
  },
  data() {
    return {
      svgGantt: null,
    };
  },
  computed: {
    formatData() {
      const { tasks, links } = this;
      utils.autoSchedule(tasks, links);
      return utils.formatData(tasks, links);
    },
  },
  watch: {
    formatData() {
      if (this.svgGantt)
        this.svgGantt.setData(utils.formatData(this.tasks, links));
    },
  },
  mounted() {
    let options = {
      viewMode: "day",
      onClick: (e) => this.$emit("on-click", e),
      offsetY: 50,
      rowHeight: 30,
      barHeight: 16,
      thickWidth: 1.4,
      styleOptions: {
        bgColor: "#fff",
        lineColor: "#eee",
        redLineColor: "#f04134",
        groupBack: "#3db9d3",
        groupFront: "#299cb4",
        taskBack: "#65c16f",
        taskFront: "#46ad51",
        milestone: "#d33daf",
        warning: "#faad14",
        danger: "#f5222d",
        link: "#ffa011",
        textColor: "#222",
        lightTextColor: "#999",
        lineWidth: "1px",
        thickLineWidth: "1.4px",
        fontSize: "13px",
        smallFontSize: "12px",
        fontFamily: `"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif`,
      },
    };
    console.log(this.formatData);
    this.svgGantt = new SVGGantt(this.$refs.el, this.formatData, options);
  },
};
</script>

<style lang="scss">
.u-gantt {
  position: relative;
  overflow: auto;
  min-height: 280px;
  height: 100%;
  user-select: none;
}
</style>
