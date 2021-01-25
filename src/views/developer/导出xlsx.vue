<template>
  <div>
    <div class="u-quill-body">
      <h1></h1>
      <table class="xlsx">
        <tr>
          <th></th>
          <th>A</th>
          <th>B</th>
          <th>C</th>
          <th>D</th>
        </tr>
        <tr v-for="(item,index) in list" :key="index">
          <th style="width:2em">{{index+1}}</th>
          <td v-for="(self,i) in item" :key="i">{{self}}</td>
        </tr>
      </table>

      <a class="u-btn u-mt" @click="exportXLSX()">导出xlsx</a>
      <!-- pdf view -->
      <div style="margin-top:40px;">
        <div ref="view"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: String
  },
  data() {
    return {
      list: [
        // { 周一: '语文', 周二: '数学', 周三: '历史', 周四: '政治', 周五: '英语' },
        // { 周一: '数学', 周二: '数学', 周三: '政治', 周四: '英语', 周五: '英语' },
        // { 周一: '政治', 周二: '英语', 周三: '历史', 周四: '政治', 周五: '数学' },
        ["This", "is", "a", "Test"],
        ["你好", "你好", "你好", "你好"],
        [1, 2, 3, 4],
        ["Click", "to", "edit", "cells"]
      ]
    }
  },
  methods: {
    exportXLSX() {
      let data = this.list;
      let { loadJs } = this.$util;
      (async function () {
        if (typeof XLSX === "undefined") {
          console.time('xlsx v0.16.8')
          // @demo:https://sheetjs.com/demo/manifest.html
          await loadJs("https://cdn.jsdelivr.net/npm/xlsx@0.16.8/dist/xlsx.full.min.js");
          console.timeEnd('xlsx v0.16.8')
        }
        // 设置表格样式，!cols为列宽
        const options = { '!cols': [{ wpx: 30 }, { wpx: 40 }, { wpx: 50 }, { wpx: 60 }, { wpx: 70 }] };
        // const ws = XLSX.utils.json_to_sheet(data);
        const ws = XLSX.utils.aoa_to_sheet(data);
        ws['!cols'] = options['!cols'];
        console.log(ws)
        // 创建 Book
        const wb = XLSX.utils.book_new();
        // 添加 Sheet1
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        // 导出
        XLSX.writeFile(wb, 'demo.xlsx');
      }())
    }
  },
  mounted() {
    // var file = obj.files[0];
    // var reader = new FileReader();
    // reader.onload = function (e) {
    //   var data = e.target.result;
    //   excelData = XLSX.read(data, {
    //     type: 'binary'
    //   });
    //   //excelData.SheetNames[0]是获取Sheets中第一个Sheet的名字
    //   //excelData.Sheets[Sheet名]获取第一个Sheet的数据
    //   var json = XLSX.utils.sheet_to_json(excelData.Sheets[excelData.SheetNames[0]]);
    //   document.querySelector("p").innerHTML = JSON.stringify(json, null, "\t");
    // };
    // reader.readAsBinaryString(file);
  }
}
</script>

<style lang="scss" scoped>
.xlsx {
  width: auto;
  min-width: 100%;
  font-size: 14px;
  line-height: 24px;
  color: #454545;
  td {
    border: 1px solid #e2e2e2;
  }
  th {
    background-color: #e2e2e2;
    border: 1px solid #d4d4d4;
    font-weight: 500;
  }
}
</style>