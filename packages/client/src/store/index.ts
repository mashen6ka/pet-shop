import Vue from "vue";
import Vuex from "vuex";

import Cart from "./Cart";
import Product from "./Product";
import AuthClient from "./AuthClient";
import Shop from "./Shop";
import Company from "./Company";
import Manufacturer from "./Manufacturer";
import Country from "./Country";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cart: Cart,
    product: Product,
    shop: Shop,
    company: Company,
    country: Country,
    manufacturer: Manufacturer,
    authClient: AuthClient,
  },
});
