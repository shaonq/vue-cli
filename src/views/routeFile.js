import pinyin from "pinyin";
let docs = ["如何启动vue项目 ？", "vue vue-route vuex 简介"];
let servers = ["如何启动vue项目 ？",];
let laboratory = ["如何启动vue项目 ？",];

const setRoute = (arr, file) =>
  arr.map(item => {
    return {
      name: item,
      path: `${file}/${item}`,
      url: item
        .replace(/\s/g, "")
        .split("")
        .map((p, i) => "_" + pinyin(p)[0][0])
        .join("")
    };
  });

const docsRoute = setRoute(docs, "docs");
const serversRoute = setRoute(servers, "servers");
const laboratoryRoute = setRoute(laboratory, "laboratory");
export { docsRoute, serversRoute, laboratoryRoute };
