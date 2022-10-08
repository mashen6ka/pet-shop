import axios from "axios";
const state = {
  companyList: [],
  company: {},
};

const getters = {
  COMPANY_LIST: (state: { companyList: any }) => state.companyList,
  COMPANY: (state: { company: any }) => state.company,
};

const mutations = {
  SET_COMPANY_LIST: (state: { companyList: any }, companyList: any) =>
    (state.companyList = companyList),
  SET_COMPANY: (state: { company: any }, company: any) =>
    (state.company = company),
};

const actions = {
  GET_COMPANY_LIST: async (context: {
    commit: (arg0: string, arg1: any) => void;
  }) => {
    const { data } = await axios.get(
      process.env.VUE_APP_SERVER_ADDRESS + "/company/get/list",
      { withCredentials: true }
    );
    if (data.success) {
      context.commit("SET_COMPANY_LIST", data.data);
    }
  },
  GET_COMPANY: async (
    context: {
      commit: (arg0: string, arg1: any) => void;
    },
    payload: any
  ) => {
    const params = Object.entries(payload).map((e) => `${e[0]}=${e[1]}`);
    const { data } = await axios.get(
      process.env.VUE_APP_SERVER_ADDRESS + "/company/get/?" + params.join("&"),
      { withCredentials: true }
    );
    if (data.success) {
      context.commit("SET_COMPANY", data.data);
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
