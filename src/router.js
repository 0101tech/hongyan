import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Detail from "./views/Detail.vue";
import Login from "./views/Login.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        title: "鸿雁"
      }
    },
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        title: "鸿雁",
        keepAlive: true
      }
    },
    {
      path: "/detail/:id/:location",
      name: "detail",
      component: Detail,
      meta: {
        title: "鸿雁"
      }
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
