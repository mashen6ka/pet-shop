import Vue from "vue";
import Vuex from "vuex";

import Cart from "./Cart";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cart: Cart,
  },
});
