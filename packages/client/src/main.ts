import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCookies from "vue-cookies";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Vuelidate from "vuelidate";

// todo: создать свой инстанс axios с базовым урлом и { withCredentials: true }

Vue.use(VueCookies);
Vue.config.productionTip = false;
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

Vue.use(BootstrapVue);
// Vue.use(CardPlugin);
Vue.use(IconsPlugin);
