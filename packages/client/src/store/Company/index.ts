import axios from "axios";
import { ActionContext } from "vuex";
import { Company } from "../types";
import buildAuthHeader from "../build-auth-header";

type companyState = {
  companyList: Company[];
};

const state: companyState = {
  companyList: [],
};

const getters = {
  COMPANY_LIST: (state: companyState) => state.companyList,
};

const mutations = {
  SET_COMPANY_LIST: (state: companyState, companyList: Company[]) =>
    (state.companyList = companyList),
};

const actions = {
  GET_COMPANY_LIST: async (context: ActionContext<companyState, null>) => {
    const authHeader = buildAuthHeader();
    const { data } = await axios.get(
      process.env.VUE_APP_SERVER_ADDRESS + "/companies",
      { withCredentials: true, headers: { Authorization: authHeader } }
    );
    if (data.success) {
      context.commit("SET_COMPANY_LIST", data.data);
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
