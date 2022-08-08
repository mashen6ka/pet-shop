import axios from "axios";

const state = {
  user: {},
  orderList: [],
  companyList: [],
  accessToken: null,
  isAuthorized: false,
};

const getters = {
  USER: (state: { user: any }) => state.user,
  USER_ORDER_LIST: (state: { orderList: any }) => state.orderList,
  USER_COMPANY_LIST: (state: { companyList: any }) => state.companyList,
};

const mutations = {
  SET_USER: (state: { user: any }, user: any) => (state.user = user),
  SET_USER_ORDER_LIST: (state: { orderList: any }, orderList: any) =>
    (state.orderList = orderList),
  SET_USER_COMPANY_LIST: (state: { companyList: any }, companyList: any) =>
    (state.companyList = companyList),
};

const actions = {
  // переписать тут все вообще блин!
  GET_USER_ORDER_LIST: async (
    context: {
      commit: (arg0: string, arg1: any) => void;
    },
    payload: any
  ) => {
    const orderRes = await axios.post(
      "http://localhost:3000/user/get/order/list",
      payload
    );
    const orderList = orderRes.data.data;
    if (orderRes.data.success) {
      for (const order of orderList) {
        // если в заказе нет айтемов, все сломается
        const orderId = order.id;
        const { data } = await axios.post(
          "http://localhost:3000/order/get/item/list",
          { orderId: orderId }
        );
        order.itemList = data.data;
      }

      context.commit("SET_USER_ORDER_LIST", orderList);
    }
  },
  GET_USER_COMPANY_LIST: async (
    context: {
      commit: (arg0: string, arg1: any) => void;
    },
    payload: any
  ) => {
    const { data } = await axios.post(
      "http://localhost:3000/user/get/company/list",
      payload
    );
    if (data.success) {
      context.commit("SET_USER_COMPANY_LIST", data.data);
    }
  },
  GET_USER: async (
    context: {
      commit: (arg0: string, arg1: any) => void;
    },
    payload: any
  ) => {
    const { data } = await axios.post(
      "http://localhost:3000/user/get/",
      payload
    );
    if (data.success) {
      context.commit("SET_USER", data.data);
    }
    // context.commit("SET_USER", {
    //   id: 1,
    //   firstName: "Maria",
    //   lastName: "Slepokurova",
    //   middleName: "Fedorovna",
    //   email: "mari@gmail.com",
    //   phone: "+79998576939",
    //   personalDiscount: 20,
    //   birthday: "2001-11-05",
    //   login: "mashenka",
    //   password: "qwerty",
    // });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
