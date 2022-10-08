import axios from "axios";
const state = {
  manufacturerList: [],
  manufacturer: {},
};

const getters = {
  MANUFACTURER_LIST: (state: { manufacturerList: any }) =>
    state.manufacturerList,
  MANUFACTURER: (state: { manufacturer: any }) => state.manufacturer,
};

const mutations = {
  SET_MANUFACTURER_LIST: (
    state: { manufacturerList: any },
    manufacturerList: any
  ) => (state.manufacturerList = manufacturerList),
  SET_MANUFACTURER: (state: { manufacturer: any }, manufacturer: any) =>
    (state.manufacturer = manufacturer),
};

const actions = {
  GET_MANUFACTURER_LIST: async (context: {
    commit: (arg0: string, arg1: any) => void;
  }) => {
    const { data } = await axios.get(
      process.env.VUE_APP_SERVER_ADDRESS + "/manufacturer/get/list",
      { withCredentials: true }
    );
    if (data.success) {
      context.commit("SET_MANUFACTURER_LIST", data.data);
    }
  },
  GET_MANUFACTURER: async (
    context: {
      commit: (arg0: string, arg1: any) => void;
    },
    payload: any
  ) => {
    const params = Object.entries(payload).map((e) => `${e[0]}=${e[1]}`);
    const { data } = await axios.get(
      process.env.VUE_APP_SERVER_ADDRESS +
        "/manufacturer/get/?" +
        params.join("&"),
      { withCredentials: true }
    );
    if (data.success) {
      context.commit("SET_MANUFACTURER", data.data);
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
