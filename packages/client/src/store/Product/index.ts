import axios from "axios";
const state = {
  productList: [],
  product: {},
  productShopList: {},
};

const getters = {
  PRODUCT_LIST: (state: { productList: any }) => state.productList,
  PRODUCT: (state: { product: any }) => state.product,
  PRODUCT_SHOP_LIST: (state: { productShopList: any }) => state.productShopList,
};

const mutations = {
  SET_PRODUCT_LIST: (state: { productList: any }, productList: any) =>
    (state.productList = productList),
  SET_PRODUCT: (state: { product: any }, product: any) =>
    (state.product = product),
  SET_PRODUCT_SHOP_LIST: (
    state: { productShopList: any },
    productShopList: any
  ) => (state.productShopList = productShopList),
};

const actions = {
  GET_PRODUCT_LIST: async (context: {
    commit: (arg0: string, arg1: any) => void;
  }) => {
    const { data } = await axios.post(
      process.env.VUE_APP_SERVER_ADDRESS + "/product/get/list"
    );
    if (data.success) {
      context.commit("SET_PRODUCT_LIST", data.data);
    }
  },
  GET_PRODUCT: async (
    context: {
      commit: (arg0: string, arg1: any) => void;
    },
    payload: any
  ) => {
    const { data } = await axios.post(
      process.env.VUE_APP_SERVER_ADDRESS + "/product/get/",
      payload
    );
    if (data.success) {
      context.commit("SET_PRODUCT", data.data);
    }
  },
  GET_PRODUCT_SHOP_LIST: async (
    context: {
      commit: (arg0: string, arg1: any) => void;
    },
    payload: any
  ) => {
    const { data } = await axios.post(
      process.env.VUE_APP_SERVER_ADDRESS + "/product/get/shop/list",
      payload
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
