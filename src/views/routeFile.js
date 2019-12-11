import pinyin from "pinyin";
let docs = ["如何启动vue项目 ？", "vue vue-route vuex 简介"];
let servers = ["HTTP接口文档","多分类搜索实现"];
let laboratory = ["基础弹窗","富文本","甘特图","日程表","月甘特图"];

const setRoute = (arr, file) =>
  arr.map(item => {
    const url = item.replace(/\s/g, "").split("").map((p, i) => "_" + pinyin(p)[0][0]) .join("")
    return {
      name: item,
      to: `/${file}/${url}`,

      path: `${file}/${item}`,
      url
    };
  });

const docsRoute = setRoute(docs, "docs");
const serversRoute = setRoute(servers, "servers");
const laboratoryRoute = setRoute(laboratory, "laboratory");
export { docsRoute, serversRoute, laboratoryRoute };
