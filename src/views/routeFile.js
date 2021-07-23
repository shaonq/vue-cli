
/**
 * require.context 检索目录，测试不可用在function之中
 */
const paths = [require.context('./docs', false, /\.vue$/), require.context('./developer', false, /\.vue$/)]
function getFilesVueList() {
  return paths.map(item => {
    let arr = [];
    item.keys().forEach(key => {
      let fileName = key.replace(/(\.\/|\.vue)/g, '');
      if (fileName !== "Index") arr.push(fileName);
    })
    return arr.sort((a,b)=>a.length-b.length)
  })

}
let [docs, developer] = getFilesVueList();

const toUnicode = (string, prefix = '') => String(string).replace(/\s/g, "").split('').map(o => (/[\u4e00-\u9fa5]/.test(o) ? (prefix + o.charCodeAt(0).toString(16)) : o)).join('')
// 文件名称转成标准的路由格式
const setRoute = (arr, file) =>
  arr.map(item => {
    const url = item
    return {
      name: item,
      to: toUnicode(`/${file}/${url}`),
      path: `${file}/${item}`,
      url,
    };
  });

const docsRoute = setRoute(docs, "docs");
console.log(docsRoute)
// const serversRoute = setRoute(servers, "servers");
const developerRoute = setRoute(developer, "developer");
export { docsRoute, developerRoute, toUnicode };
