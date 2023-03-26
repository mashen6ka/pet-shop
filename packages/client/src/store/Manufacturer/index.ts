import axios from "axios";
import { ActionContext } from "vuex";
import buildAuthHeader from "../build-auth-header";
import { Manufacturer } from "../types";

type manufacturerState = {
  manufacturerList: Manufacturer[];
};

const state: manufacturerState = {
  manufacturerList: [],
};

const getters = {
  MANUFACTURER_LIST: (state: manufacturerState) => state.manufacturerList,
};

const mutations = {
  SET_MANUFACTURER_LIST: (
    state: manufacturerState,
    manufacturerList: Manufacturer[]
  ) => (state.manufacturerList = manufacturerList),
};

const actions = {
  GET_MANUFACTURER_LIST: async (
    context: ActionContext<manufacturerState, null>
  ) => {
    const authHeader = buildAuthHeader();
    const { data } = await axios.get(
      process.env.VUE_APP_SERVER_ADDRESS + "/manufacturers",
      { withCredentials: true, headers: { Authorization: authHeader } }
    );
    if (data.success) {
      context.commit("SET_MANUFACTURER_LIST", data.data);
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
