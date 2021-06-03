import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import store from "@/store";
Vue.use(VueRouter);
import { toUnicode, docsRoute, developerRoute } from "@/views/routeFile.js";
const V = path => Vue.extend(require(`@/views/${path}.vue`).default);
const getChildren = (arr, file) => {
  let children = arr.map((item, index) => {
    return { path: toUnicode(item.url), component: V(item.path), meta: { title: item.name } };
  });
  children.push({ path: "", component: V(arr[0].path) });
  return children;
};

const router = new VueRouter({
  linkActiveClass: "is-active",
  linkExactActiveClass: "is-exact-active",
  routes: [
    {
      path: "/",
      component: V("Layout"),
      children: [
        { path: "", redirect: "/docs" },
        {
          path: "docs",
          component: V("docs/Index"),
          children: getChildren(docsRoute).map((item, index) => {
            if (!index) item.meta.affix = true;
            return item
          })
        },
        {
          path: "developer",
          component: V("developer/Index"),
          children: getChildren(developerRoute)
        },
        { path: "*", component: V("404") }
      ]
    }
  ]
});




// 路由监听 meta.affix 表示路由常驻 meta.title 表示标题名称
let list = [], fn = (router) => router.forEach(o => ((o.meta && o.meta.affix) && list.push(o), o.children && fn(o.children)))
fn(router.getRoutes());
store.registerModule('routerBar', {
  state: { list },
  mutations: {
    addRoute(state, route) {
      let target = state.list.find((item) => item.path === route.path);
      console.log(state.list, route)
      if (target) {
        if (route.fullPath !== target.fullPath) Object.assign(target, route)
        return
      }
      state.list.push(Object.assign({}, route))
    },
    delRoute(state, route) {
      state.list.forEach((item, index) => {
        if (item.path === route.path) state.list.splice(index, 1)
      })
    },
    delOthersRoute(state, route) {
      state.list = state.list.filter(
        (item) => item.meta.affix || item.path === route.path
      )
    },
    delLeftRoute(state, route) {
      let index = state.list.length
      state.list = state.list.filter((item) => {
        if (item.name === route.name) index = state.list.indexOf(item)
        return item.meta.affix || index <= state.list.indexOf(item)
      })
    },
    delRightRoute(state, route) {
      let index = state.list.length
      state.list = state.list.filter((item) => {
        if (item.name === route.name) index = state.list.indexOf(item)
        return item.meta.affix || index >= state.list.indexOf(item)
      })
    },
    delAllList(state) {
      state.list = state.list.filter((item) => item.meta.affix)
    }
  }
});

// 全局路由拦截
router.beforeEach((route, from, next) => {
  let { name, matched, fullPath } = route;
  // 记录路由
  store.commit('addRoute', route);
  // 开启权限验证
  if (matched.some(item => item.meta.auth) && name !== "login" && !store.getters.token) {
    return next({ name: "login", query: { redirect: fullPath } });
  }
  next();
});
export default router;
