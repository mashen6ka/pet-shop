import axios from "axios";

const state = {
  user: {},
  userList: [],
  orderList: [],
  companyList: [],
  accessToken: null,
  isAuthorized: false,
};

const getters = {
  USER: (state: { user: any }) => state.user,
  USER_ORDER_LIST: (state: { orderList: any }) => state.orderList,
  USER_COMPANY_LIST: (state: { companyList: any }) => state.companyList,
  USER_LIST: (state: { userList: any }) => state.userList,
};

const mutations = {
  SET_USER: (state: { user: any }, user: any) => (state.user = user),
  SET_USER_ORDER_LIST: (state: { orderList: any }, orderList: any) =>
    (state.orderList = orderList),
  SET_USER_COMPANY_LIST: (state: { companyList: any }, companyList: any) =>
    (state.companyList = companyList),
  SET_USER_LIST: (state: { userList: any }, userList: any) =>
    (state.userList = userList),
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
  GET_USER_LIST: async (context: {
    commit: (arg0: string, arg1: any) => void;
  }) => {
    const { data } = await axios.post("http://localhost:3000/user/get/list");
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
    const { data } = await axios.post("http://localhost:3000/order/create/", {
      id: payload.id,
      userId: payload.userId,
      companyId: payload.companyId,
      statusId: payload.statusId,
      createdAt: payload.createdAt,
      completedAt: payload.completedAt,
      shopId: payload.shopId,
      price: payload.price,
    });
    // пока пофиг на все проверки если что
    const orderId = data.data.id;

    for (const item of payload.itemList) {
      const { data } = await axios.post(
        "http://localhost:3000/order/create/item/",
        {
          orderId: orderId,
          productId: item.product.id,
          quantity: item.quantity,
        }
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
