import axios from "axios";
const state = {
  shopList: [],
  shop: {},
};

const getters = {
  SHOP_LIST: (state: { shopList: any }) => state.shopList,
  SHOP: (state: { shop: any }) => state.shop,
};

const mutations = {
  SET_SHOP_LIST: (state: { shopList: any }, shopList: any) =>
    (state.shopList = shopList),
  SET_SHOP: (state: { shop: any }, shop: any) => (state.shop = shop),
};

const actions = {
  GET_SHOP_LIST: async (context: {
    commit: (arg0: string, arg1: any) => void;
  }) => {
    const { data } = await axios.post(
      process.env.VUE_APP_SERVER_ADDRESS + "/shop/get/list",
      {},
      { withCredentials: true }
    );
    if (data.success) {
      context.commit("SET_SHOP_LIST", data.data);
    }
  },
  GET_SHOP: async (
    context: {
      commit: (arg0: string, arg1: any) => void;
    },
    payload: any
  ) => {
    const { data } = await axios.post(
      process.env.VUE_APP_SERVER_ADDRESS + "/shop/get/",
      payload,
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
