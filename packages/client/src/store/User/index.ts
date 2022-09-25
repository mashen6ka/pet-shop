import axios from "axios";

const state = {
  user: {},
  userList: [],
  orderList: [],
  companyList: [],
  token: "",
  error: "",
};

const getters = {
  USER: (state: { user: any }) => state.user,
  USER_ORDER_LIST: (state: { orderList: any }) => state.orderList,
  USER_COMPANY_LIST: (state: { companyList: any }) => state.companyList,
  USER_LIST: (state: { userList: any }) => state.userList,
  USER_ERROR: (state: { error: any }) => state.error,
  USER_TOKEN: (state: { token: any }) => state.token,
};

const mutations = {
  SET_USER: (state: { user: any }, user: any) => (state.user = user),
  SET_USER_ORDER_LIST: (state: { orderList: any }, orderList: any) =>
    (state.orderList = orderList),
  SET_USER_COMPANY_LIST: (state: { companyList: any }, companyList: any) =>
    (state.companyList = companyList),
  SET_USER_LIST: (state: { userList: any }, userList: any) =>
    (state.userList = userList),
  SET_USER_ERROR: (state: { error: any }, error: any) => (state.error = error),
  SET_USER_TOKEN: (state: { token: any }, token: any) => (state.token = token),
};

const actions = {
  // надо норм переписать
  AUTHORIZE_USER: async (
    context: {
      commit: (arg0: string, arg1: any) => void;
    },
    payload: any
  ) => {
    axios
      .post(process.env.VUE_APP_SERVER_ADDRESS + "/user/authn", payload, {
        withCredentials: false,
      })
      .then((res) => {
        context.commit("SET_USER_ERROR", "");
        context.commit("SET_USER_TOKEN", res.data.data.token);
      })
      .catch((err) => {
        context.commit("SET_USER_ERROR", err.response.data.error);
        context.commit("SET_USER_TOKEN", "");
      });
  },
  // переписать тут все вообще блин!
  GET_USER_ORDER_LIST: async (
    context: {
      commit: (arg0: string, arg1: any) => void;
    },
    payload: any
  ) => {
    const orderRes = await axios.post(
      process.env.VUE_APP_SERVER_ADDRESS + "/user/get/order/list",
      payload,
      { withCredentials: true }
    );
    const orderList = orderRes.data.data;
    if (orderRes.data.success) {
      for (const order of orderList) {
        // если в заказе нет айтемов, все сломается
        const orderId = order.id;
        const { data } = await axios.post(
          process.env.VUE_APP_SERVER_ADDRESS + "/order/get/item/list",
          { orderId: orderId },
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
      process.env.VUE_APP_SERVER_ADDRESS + "/user/get/company/list",
      payload,
      { withCredentials: true }
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
      process.env.VUE_APP_SERVER_ADDRESS + "/user/get/",
      payload,
      { withCredentials: true }
    );
    if (data.success) {
      context.commit("SET_USER", data.data);
    }
  },
  GET_USER_LIST: async (context: {
    commit: (arg0: string, arg1: any) => void;
  }) => {
    const { data } = await axios.post(
      process.env.VUE_APP_SERVER_ADDRESS + "/user/get/list",
      {},
      { withCredentials: true }
    );
    if (data.success) {
      context.commit("SET_USER_LIST", data.data);
    }
  },
  // вынести в store/order - нафиг это тут
  CREATE_ORDER: async (
    context: {
      commit: (arg0: string, arg1: any) => void;
    },
    payload: any
  ) => {
    const { data } = await axios.post(
      process.env.VUE_APP_SERVER_ADDRESS + "/order/create/",
      {
        id: payload.id,
        userId: payload.userId,
        companyId: payload.companyId,
        statusId: payload.statusId,
        createdAt: payload.createdAt,
        completedAt: payload.completedAt,
        shopId: payload.shopId,
        price: payload.price,
      },
      { withCredentials: true }
    );
    // пока пофиг на все проверки если что
    const orderId = data.data.id;

    for (const item of payload.itemList) {
      const { data } = await axios.post(
        process.env.VUE_APP_SERVER_ADDRESS + "/order/create/item/",
        {
          orderId: orderId,
          productId: item.product.id,
          quantity: item.quantity,
        },
        { withCredentials: true }
      );
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
