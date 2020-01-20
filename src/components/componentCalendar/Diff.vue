<template>
  <div class="__calendar">
    <!-- 工具条 -->
    <div class="__calendar-head">
      <slot></slot>
    </div>
    <!-- 面板区 -->
    <div class="__calendar-body">
      <!-- 周面板 -->
      <table class="__calendar-week">
        <tr class="__calendar__thead">
          <td>星期日</td>
          <td>星期一</td>
          <td>星期二</td>
          <td>星期三</td>
          <td>星期四</td>
          <td>星期五</td>
          <td>星期六</td>
        </tr>
        <tr></tr>
      </table>
    </div>
  </div>
</template>

<script>
import UTIL_LUNAR from './lunar.js'
import UTIL_DATE from './date.js'
import './index.scss';
export default {
  props: {
    list: Object | Array
  },
  data() {
    return {

    }
  },
  methods: {}
}
</script>