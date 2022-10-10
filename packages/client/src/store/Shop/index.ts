import axios from "axios";
import { ActionContext } from "vuex";
import { Shop } from "../types";

type shopState = {
  shopList: Shop[];
  shop: Shop | null;
};

const state: shopState = {
  shopList: [],
  shop: null,
};

const getters = {
  SHOP_LIST: (state: shopState) => state.shopList,
  SHOP: (state: shopState) => state.shop,
};

const mutations = {
  SET_SHOP_LIST: (state: shopState, shopList: Shop[]) =>
    (state.shopList = shopList),
  SET_SHOP: (state: shopState, shop: Shop) => (state.shop = shop),
};

const actions = {
  GET_SHOP_LIST: async (context: ActionContext<shopState, null>) => {
    const { data } = await axios.get(
      process.env.VUE_APP_SERVER_ADDRESS + "/shop/get/list",
      { withCredentials: true }
    );
    if (data.success) {
      context.commit("SET_SHOP_LIST", data.data);
    }
  },
  GET_SHOP: async (
    context: ActionContext<shopState, null>,
    payload: { [k: string]: unknown }
  ) => {
    const params = Object.entries(payload).map((e) => `${e[0]}=${e[1]}`);
    const { data } = await axios.get(
      process.env.VUE_APP_SERVER_ADDRESS + "/shop/get/?" + params.join("&"),
      { withCredentials: true }
    );
    if (data.success) {
      context.commit("SET_SHOP", data.data);
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
