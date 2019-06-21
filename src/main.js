import Vue from "vue";
import App from "./App.vue";
import Vant from "vant";
import "vant/lib/index.css";
import router from "./router";
import store from "./store";
import { formatCount } from "./utils/numberUtil";
import { timestampFormat } from "./utils/moment";

Vue.config.productionTip = false;

Vue.use(Vant);

Vue.filter("formatCount", function(value) {
  return formatCount(value);
});
Vue.filter("timestampFormat", function(value) {
  return timestampFormat(value);
});

router.beforeEach((to, from, next) => {
  /*路由发生改变修改页面的title */
  // if (to.meta.title) {
  //   document.title = '鸿雁-' + to.meta.title
  // }
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
