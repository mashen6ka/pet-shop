import axios from "axios";
import { ActionContext } from "vuex";
import { Product, Shop } from "../types";

type productState = {
  productList: Product[];
  product: Product | null;
  productShopList: Shop[];
};

const state: productState = {
  productList: [],
  product: null,
  productShopList: [],
};

const getters = {
  PRODUCT_LIST: (state: productState) => state.productList,
  PRODUCT: (state: productState) => state.product,
  PRODUCT_SHOP_LIST: (state: productState) => state.productShopList,
};

const mutations = {
  SET_PRODUCT_LIST: (state: productState, productList: Product[]) =>
    (state.productList = productList),
  SET_PRODUCT: (state: productState, product: Product) =>
    (state.product = product),
  SET_PRODUCT_SHOP_LIST: (state: productState, productShopList: Shop[]) =>
    (state.productShopList = productShopList),
};

const actions = {
  GET_PRODUCT_LIST: async (context: ActionContext<productState, null>) => {
    const { data } = await axios.get(
      process.env.VUE_APP_SERVER_ADDRESS + "/product/get/list",
      { withCredentials: true }
    );
    if (data.success) {
      context.commit("SET_PRODUCT_LIST", data.data);
    }
  },
  GET_PRODUCT: async (
    context: ActionContext<productState, null>,
    payload: { [k: string]: unknown }
  ) => {
    const params = Object.entries(payload).map((e) => `${e[0]}=${e[1]}`);
    const { data } = await axios.get(
      process.env.VUE_APP_SERVER_ADDRESS + "/product/get/?" + params.join("&"),
      { withCredentials: true }
    );
    if (data.success) {
      context.commit("SET_PRODUCT", data.data);
    }
  },
  GET_PRODUCT_SHOP_LIST: async (
    context: ActionContext<productState, null>,
    payload: { [k: string]: unknown }
  ) => {
    const params = Object.entries(payload).map((e) => `${e[0]}=${e[1]}`);
    const { data } = await axios.get(
      process.env.VUE_APP_SERVER_ADDRESS +
        "/product/get/shop/list/?" +
        params.join("&"),
      { withCredentials: true }
    );
    if (data.success) {
      context.commit("SET_PRODUCT_SHOP_LIST", data.data);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
