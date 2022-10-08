import axios from "axios";
const state = {
  countryList: [],
  country: {},
};

const getters = {
  COUNTRY_LIST: (state: { countryList: any }) => state.countryList,
  COUNTRY: (state: { country: any }) => state.country,
};

const mutations = {
  SET_COUNTRY_LIST: (state: { countryList: any }, countryList: any) =>
    (state.countryList = countryList),
  SET_COUNTRY: (state: { country: any }, country: any) =>
    (state.country = country),
};

const actions = {
  GET_COUNTRY_LIST: async (context: {
    commit: (arg0: string, arg1: any) => void;
  }) => {
    const { data } = await axios.get(
      process.env.VUE_APP_SERVER_ADDRESS + "/country/get/list",
      { withCredentials: true }
    );
    if (data.success) {
      context.commit("SET_COUNTRY_LIST", data.data);
    }
  },
  GET_COUNTRY: async (
    context: {
      commit: (arg0: string, arg1: any) => void;
    },
    payload: any
  ) => {
    const params = Object.entries(payload).map((e) => `${e[0]}=${e[1]}`);
    const { data } = await axios.get(
      process.env.VUE_APP_SERVER_ADDRESS + "/country/get/?" + params.join("&"),
      { withCredentials: true }
    );
    if (data.success) {
      context.commit("SET_COUNTRY", data.data);
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
