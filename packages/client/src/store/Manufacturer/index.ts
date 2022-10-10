import axios from "axios";
import { ActionContext } from "vuex";
import { Manufacturer } from "../types";

type manufacturerState = {
  manufacturerList: Manufacturer[];
  manufacturer: Manufacturer | null;
};

const state: manufacturerState = {
  manufacturerList: [],
  manufacturer: null,
};

const getters = {
  MANUFACTURER_LIST: (state: manufacturerState) => state.manufacturerList,
  MANUFACTURER: (state: manufacturerState) => state.manufacturer,
};

const mutations = {
  SET_MANUFACTURER_LIST: (
    state: manufacturerState,
    manufacturerList: Manufacturer[]
  ) => (state.manufacturerList = manufacturerList),
  SET_MANUFACTURER: (state: manufacturerState, manufacturer: Manufacturer) =>
    (state.manufacturer = manufacturer),
};

const actions = {
  GET_MANUFACTURER_LIST: async (
    context: ActionContext<manufacturerState, null>
  ) => {
    const { data } = await axios.get(
      process.env.VUE_APP_SERVER_ADDRESS + "/manufacturer/get/list",
      { withCredentials: true }
    );
    if (data.success) {
      context.commit("SET_MANUFACTURER_LIST", data.data);
    }
  },
  GET_MANUFACTURER: async (
    context: ActionContext<manufacturerState, null>,
    payload: { [k: string]: unknown }
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
