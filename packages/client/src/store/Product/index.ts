import axios from "axios";
const state = {
  productList: [],
  product: {},
};

const getters = {
  PRODUCT_LIST: (state: { productList: any }) => state.productList,
  PRODUCT: (state: { product: any }) => state.product,
};

const mutations = {
  SET_PRODUCT_LIST: (state: { productList: any }, productList: any) =>
    (state.productList = productList),
  SET_PRODUCT: (state: { product: any }, product: any) =>
    (state.product = product),
};

const actions = {
  GET_PRODUCT_LIST: async (context: {
    commit: (arg0: string, arg1: any) => void;
  }) => {
    const { data } = await axios.post("http://localhost:3000/product/get/list");
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
      "http://localhost:3000/product/get/",
      payload
    );
    if (data.success) {
      context.commit("SET_PRODUCT", data.data);
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
