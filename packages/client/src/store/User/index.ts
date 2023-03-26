import axios from "axios";
import { ActionContext } from "vuex";
import buildAuthHeader from "../build-auth-header";
import { APIResponse, Company, Order, User } from "../types";

type userState = {
  user: User | null;
  userList: User[];
  orderList: Order[];
  companyList: Company[];
  token: string;
  error: string;
};

const state: userState = {
  user: null,
  userList: [],
  orderList: [],
  companyList: [],
  token: "",
  error: "",
};

const getters = {
  USER: (state: userState) => state.user,
  USER_ORDER_LIST: (state: userState) => state.orderList,
  USER_COMPANY_LIST: (state: userState) => state.companyList,
  USER_LIST: (state: userState) => state.userList,
  USER_ERROR: (state: userState) => state.error,
  USER_TOKEN: (state: userState) => state.token,
};

const mutations = {
  SET_USER: (state: userState, user: User) => (state.user = user),
  SET_USER_ORDER_LIST: (state: userState, orderList: Order[]) =>
    (state.orderList = orderList),
  SET_USER_COMPANY_LIST: (state: userState, companyList: Company[]) =>
    (state.companyList = companyList),
  SET_USER_LIST: (state: userState, userList: User[]) =>
    (state.userList = userList),
  SET_USER_ERROR: (state: userState, error: string) => (state.error = error),
  SET_USER_TOKEN: (state: userState, token: string) => (state.token = token),
};

const actions = {
  // надо норм переписать
  AUTHORIZE_USER: async (
    context: ActionContext<userState, null>,
    payload: { login: string; password: string }
  ) => {
    const authHeader = buildAuthHeader();
    axios
      .post(process.env.VUE_APP_SERVER_ADDRESS + "/user/authn/", payload, {
        withCredentials: false,
        headers: { Authorization: authHeader },
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
  GET_USER_ORDER_LIST: async (context: ActionContext<userState, null>) => {
    const authHeader = buildAuthHeader();
    const orderRes = await axios.get<APIResponse<Order[]>>(
      process.env.VUE_APP_SERVER_ADDRESS + "/user/orders",
      { withCredentials: true, headers: { Authorization: authHeader } }
    );
    let orderList: Order[];
    if (orderRes.data.success) {
      orderList = orderRes.data.data;
      for (const order of orderList) {
        // если в заказе нет айтемов, все сломается
        const orderId = order.id;
        const { data } = await axios.get(
          process.env.VUE_APP_SERVER_ADDRESS +
            `/orders/${orderId}/items?orderId=${orderId}`,
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
      context.commit("SET_USER_ORDER_LIST", orderList);
    }
  },
  GET_USER_COMPANY_LIST: async (context: ActionContext<userState, null>) => {
    const authHeader = buildAuthHeader();
    const { data } = await axios.get<APIResponse<Company[]>>(
      process.env.VUE_APP_SERVER_ADDRESS + "/user/companies",
      { withCredentials: true, headers: { Authorization: authHeader } }
    );
    if (data.success) {
      context.commit("SET_USER_COMPANY_LIST", data.data);
    }
  },
  GET_USER: async (context: ActionContext<userState, null>) => {
    const authHeader = buildAuthHeader();
    const { data } = await axios.get<APIResponse<User>>(
      process.env.VUE_APP_SERVER_ADDRESS + "/user",
      { withCredentials: true, headers: { Authorization: authHeader } }
    );
    if (data.success) {
      context.commit("SET_USER", data.data);
    }
  },
  GET_USER_LIST: async (context: ActionContext<userState, null>) => {
    const authHeader = buildAuthHeader();
    const { data } = await axios.get<APIResponse<User[]>>(
      process.env.VUE_APP_SERVER_ADDRESS + "/users",
      { withCredentials: true, headers: { Authorization: authHeader } }
    );
    if (data.success) {
      context.commit("SET_USER_LIST", data.data);
    }
  },
  // вынести в store/order - нафиг это тут
  CREATE_ORDER: async (
    context: ActionContext<userState, null>,
    payload: Order
  ) => {
    const authHeader = buildAuthHeader();
    const { data } = await axios.post(
      process.env.VUE_APP_SERVER_ADDRESS + "/orders",
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
      { withCredentials: true, headers: { Authorization: authHeader } }
    );
    const orderId = data.data.id;

    for (const item of payload.itemList) {
      await axios.post(
        process.env.VUE_APP_SERVER_ADDRESS +
          `/orders/${orderId}/items/${item.product.id}`,
        {
          quantity: item.quantity,
        },
        { withCredentials: true, headers: { Authorization: authHeader } }
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
