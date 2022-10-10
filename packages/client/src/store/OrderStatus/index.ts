import axios from "axios";
import { ActionContext } from "vuex";
import { OrderStatus } from "../types";

type orderStatusState = {
  orderStatusList: OrderStatus[];
  orderStatus: OrderStatus | null;
};

const state: orderStatusState = {
  orderStatusList: [],
  orderStatus: null,
};

const getters = {
  ORDER_STATUS_LIST: (state: orderStatusState) => state.orderStatusList,
};

const mutations = {
  SET_ORDER_STATUS_LIST: (
    state: orderStatusState,
    orderStatusList: OrderStatus[]
  ) => (state.orderStatusList = orderStatusList),
};

const actions = {
  GET_ORDER_STATUS_LIST: async (
    context: ActionContext<orderStatusState, null>
  ) => {
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
