import axios from "axios";
import { ActionContext } from "vuex";
import buildAuthHeader from "../build-auth-header";
import { Shop } from "../types";

type shopState = {
  shopList: Shop[];
};

const state: shopState = {
  shopList: [],
};

const getters = {
  SHOP_LIST: (state: shopState) => state.shopList,
};

const mutations = {
  SET_SHOP_LIST: (state: shopState, shopList: Shop[]) =>
    (state.shopList = shopList),
};

const actions = {
  GET_SHOP_LIST: async (context: ActionContext<shopState, null>) => {
    const authHeader = buildAuthHeader();
    const { data } = await axios.get(
      process.env.VUE_APP_SERVER_ADDRESS + "/shops",
      { withCredentials: true, headers: { Authorization: authHeader } }
    );
    if (data.success) {
      context.commit("SET_SHOP_LIST", data.data);
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
