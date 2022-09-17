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
    const { data } = await axios.post(
      process.env.VUE_APP_SERVER_ADDRESS + "/manufacturer/get/list"
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
    const { data } = await axios.post(
      process.env.VUE_APP_SERVER_ADDRESS + "/manufacturer/get/",
      payload
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
