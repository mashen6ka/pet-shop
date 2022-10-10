import axios from "axios";
import { ActionContext } from "vuex";
import { Company } from "../types";

type companyState = {
  companyList: Company[];
  company: Company | null;
};

const state: companyState = {
  companyList: [],
  company: null,
};

const getters = {
  COMPANY_LIST: (state: companyState) => state.companyList,
  COMPANY: (state: companyState) => state.company,
};

const mutations = {
  SET_COMPANY_LIST: (state: companyState, companyList: Company[]) =>
    (state.companyList = companyList),
  SET_COMPANY: (state: companyState, company: Company) =>
    (state.company = company),
};

const actions = {
  GET_COMPANY_LIST: async (context: ActionContext<companyState, null>) => {
    const { data } = await axios.get(
      process.env.VUE_APP_SERVER_ADDRESS + "/company/get/list",
      { withCredentials: true }
    );
    if (data.success) {
      context.commit("SET_COMPANY_LIST", data.data);
    }
  },
  GET_COMPANY: async (
    context: ActionContext<companyState, null>,
    payload: { [k: string]: unknown }
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
