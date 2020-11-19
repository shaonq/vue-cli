let docs = ["环境初始化", "vue vue-route vuex"];
// let servers = ["HTTP接口文档"];
let developer = ["基础依赖", "富文本", "甘特图", "日程表", "网页截图", "阅读pdf"];

// 文件名称转成标准的路由格式
const setRoute = (arr, file) =>
  arr.map(item => {

    const url = item
    return {
      name: item,
      to: `/${file}/${url}`,
      path: `${file}/${item}`,
      url
    };
  });

const docsRoute = setRoute(docs, "docs");
// const serversRoute = setRoute(servers, "servers");
const developerRoute = setRoute(developer, "developer");
export { docsRoute, developerRoute };
