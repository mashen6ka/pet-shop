import axios from "axios";
import { ActionContext } from "vuex";
import buildAuthHeader from "../build-auth-header";
import { APIResponse, Order } from "../types";

type orderState = {
  orderList: Order[];
};

const state: orderState = {
  orderList: [],
};

const getters = {
  ORDER_LIST: (state: orderState) => state.orderList,
};

const mutations = {
  SET_ORDER_LIST: (state: orderState, orderList: Order[]) =>
    (state.orderList = orderList),
};

// реорганизовать store/user и store/order
const actions = {
  GET_ORDER_LIST: async (context: ActionContext<orderState, null>) => {
    const authHeader = buildAuthHeader();
    const orderRes = await axios.get<APIResponse<Order[]>>(
      process.env.VUE_APP_SERVER_ADDRESS + "/orders",
      { withCredentials: true, headers: { Authorization: authHeader } }
    );
    let orderList: Order[];
    if (orderRes.data.success) {
      orderList = orderRes.data.data;
      for (const order of orderList) {
        // если в заказе нет айтемов, все сломается
        const orderId = order.id;
        const { data } = await axios.get(
          process.env.VUE_APP_SERVER_ADDRESS + `/orders/${orderId}/items`,
          { withCredentials: true, headers: { Authorization: authHeader } }
        );
        order.itemList = data.data;
      }
      orderList.sort((item1: Order, item2: Order) => {
        const date1 = new Date(item1.createdAt).getTime();
        const date2 = new Date(item2.createdAt).getTime();
        if (date1 < date2) {
          return 1;
        } else if (date1 > date2) {
          return -1;
        } else {
          return 0;
        }
      });

      context.commit("SET_ORDER_LIST", orderList);
    }
  },
  UPDATE_ORDER: async (
    context: ActionContext<orderState, null>,
    payload: Order
  ) => {
    const authHeader = buildAuthHeader();
    await axios.put(
      process.env.VUE_APP_SERVER_ADDRESS + `/orders/${payload.id}`,
      payload,
      { withCredentials: true, headers: { Authorization: authHeader } }
    );
    const orderList = context?.state?.orderList?.map((order: Order) => {
      if (order.id === payload.id) {
        order = payload;
      }
      return order;
    });
    context.commit("SET_ORDER_LIST", orderList);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
