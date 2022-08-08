const state = {
  client: {
    id: 1,
    firstName: "Maria",
    lastName: "Slepokurova",
    middleName: "Fedorovna",
    email: "mari@gmail.com",
    phone: "+79998576939",
    personalDiscount: 20,
    birthday: "2001-11-05",
    login: "mashenka",
    password: "qwerty",
  },
  orderList: [],
  companyList: [],
  accessToken: null,
  isAuthorized: false,
};

const getters = {
  CLIENT: (state: { client: any }) => state.client,
  CLIENT_ORDER_LIST: (state: { orderList: any }) => state.orderList,
  CLIENT_COMPANY_LIST: (state: { companyList: any }) => state.companyList,
};

const mutations = {
  SET_CLIENT: (state: { client: any }, client: any) => (state.client = client),
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
