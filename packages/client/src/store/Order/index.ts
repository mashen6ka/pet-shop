import axios from "axios";

const state = {
  orderList: [],
};

const getters = {
  ORDER_LIST: (state: { orderList: any }) => state.orderList,
};

const mutations = {
  SET_ORDER_LIST: (state: { orderList: any }, orderList: any) =>
    (state.orderList = orderList),
};

// реорганизовать store/user и store/order
const actions = {
  GET_ORDER_LIST: async (context: {
    commit: (arg0: string, arg1: any) => void;
  }) => {
    const orderRes = await axios.get(
      process.env.VUE_APP_SERVER_ADDRESS + "/order/get/list",
      { withCredentials: true }
    );
    const orderList = orderRes.data.data;
    if (orderRes.data.success) {
      for (const order of orderList) {
        // если в заказе нет айтемов, все сломается
        const orderId = order.id;
        const { data } = await axios.get(
          process.env.VUE_APP_SERVER_ADDRESS +
            `/order/get/item/list/?orderId=${orderId}`,
          { withCredentials: true }
        );
        order.itemList = data.data;
      }
      orderList.sort(function (item1: any, item2: any) {
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
  UPDATE_ORDER: async (context: any, payload: any) => {
    const res = await axios.post(
      process.env.VUE_APP_SERVER_ADDRESS + "/order/update",
      payload,
      { withCredentials: true }
    );
    // наверн сюда еще апдейт айтемов надо вынести
    const orderList = context?.state?.orderList?.map((order: any) => {
      if (order.id === payload.id) {
        order = payload;
      }
      return order;
    });
    // не очень хорошо, что в запрос улетает еще список товаров
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
