import axios from "axios";
import { ActionContext } from "vuex";
import { Country } from "../types";

type countryState = {
  countryList: Country[];
  country: Country | null;
};

const state: countryState = {
  countryList: [],
  country: null,
};

const getters = {
  COUNTRY_LIST: (state: countryState) => state.countryList,
  COUNTRY: (state: countryState) => state.country,
};

const mutations = {
  SET_COUNTRY_LIST: (state: countryState, countryList: Country[]) =>
    (state.countryList = countryList),
  SET_COUNTRY: (state: countryState, country: Country) =>
    (state.country = country),
};

const actions = {
  GET_COUNTRY_LIST: async (context: ActionContext<countryState, null>) => {
    const { data } = await axios.get(
      process.env.VUE_APP_SERVER_ADDRESS + "/country/get/list",
      { withCredentials: true }
    );
    if (data.success) {
      context.commit("SET_COUNTRY_LIST", data.data);
    }
  },
  GET_COUNTRY: async (
    context: ActionContext<countryState, null>,
    payload: { [k: string]: unknown }
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
