import axios from "axios";
import { ActionContext } from "vuex";
import buildAuthHeader from "../build-auth-header";
import { Country } from "../types";

type countryState = {
  countryList: Country[];
};

const state: countryState = {
  countryList: [],
};

const getters = {
  COUNTRY_LIST: (state: countryState) => state.countryList,
};

const mutations = {
  SET_COUNTRY_LIST: (state: countryState, countryList: Country[]) =>
    (state.countryList = countryList),
};

const actions = {
  GET_COUNTRY_LIST: async (context: ActionContext<countryState, null>) => {
    const authHeader = buildAuthHeader();
    const { data } = await axios.get(
      process.env.VUE_APP_SERVER_ADDRESS + "/countries",
      { withCredentials: true, headers: { Authorization: authHeader } }
    );
    if (data.success) {
      context.commit("SET_COUNTRY_LIST", data.data);
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
