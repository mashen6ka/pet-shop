import axios from "axios";
const state = {
  orderStatusList: [],
  orderStatus: {},
};

const getters = {
  ORDER_STATUS_LIST: (state: { orderStatusList: any }) => state.orderStatusList,
};

const mutations = {
  SET_ORDER_STATUS_LIST: (
    state: { orderStatusList: any },
    orderStatusList: any
  ) => (state.orderStatusList = orderStatusList),
};

const actions = {
  GET_ORDER_STATUS_LIST: async (context: {
    commit: (arg0: string, arg1: any) => void;
  }) => {
    const { data } = await axios.get(
      process.env.VUE_APP_SERVER_ADDRESS + "/order/status/get/list",
      { withCredentials: true }
    );
    if (data.success) {
      context.commit("SET_ORDER_STATUS_LIST", data.data);
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
