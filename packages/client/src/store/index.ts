import Vue from "vue";
import Vuex from "vuex";

import Cart from "./Cart";
import Product from "./Product";
import User from "./User";
import Shop from "./Shop";
import Company from "./Company";
import Manufacturer from "./Manufacturer";
import Country from "./Country";
import OrderStatus from "./OrderStatus";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cart: Cart,
    product: Product,
    shop: Shop,
    company: Company,
    country: Country,
    manufacturer: Manufacturer,
    user: User,
    orderStatus: OrderStatus,
  },
});
