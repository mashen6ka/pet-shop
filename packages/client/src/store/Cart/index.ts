const state = {
  cart: [],
};

const getters = {
  CART: (state: { cart: { data: any } }) => state.cart,
};

const mutations = {
  SET_CART: (state: { cart: any }, cart: any) => (state.cart = cart),
  ADD_CART_ITEM: (state: { cart: any[] }, itemNew: any) => {
    let isInCart = false;
    state.cart = state.cart.map((item: { product: any; quantity: any }) => {
      if (item.product.id === itemNew.product.id) {
        item.quantity += itemNew.quantity;
        isInCart = true;
      }
      return item;
    });
    if (!isInCart) {
      state.cart.push(itemNew);
    }
  },
  REMOVE_CART_ITEM: (state: { cart: any[] }, itemOld: any) => {
    state.cart = state.cart
      .map((item: { product: any; quantity: any }) => {
        if (item.product.id === itemOld.product.id) {
          item.quantity -= itemOld.quantity;
        }
        return item;
      })
      .filter((item) => item.quantity !== 0);
  },
  UPDATE_CART_ITEM: (state: { cart: any[] }, { itemId, quantity }: any) => {
    state.cart = state.cart
      .map((item: { product: any; quantity: any }) => {
        if (item.product.id === itemId) {
          item.quantity = quantity;
        }
        return item;
      })
      .filter((item) => item.quantity !== 0);
  },
};

const actions = {
  CLEAR_CART: (context: { commit: (arg0: string, arg1: never[]) => void }) => {
    context.commit("SET_CART", []);
  },
  ADD_CART_ITEM: (
    context: { commit: (arg0: string, arg1: any) => void },
    item: any
  ) => {
    context.commit("ADD_CART_ITEM", item);
  },
  REMOVE_CART_ITEM: (
    context: { commit: (arg0: string, arg1: any) => void },
    itemId: any
  ) => {
    context.commit("REMOVE_CART_ITEM", itemId);
  },
  UPDATE_CART_ITEM: (
    context: {
      commit: (arg0: string, arg1: { itemId: any; quantity: any }) => void;
    },
    { itemId, quantity }: any
  ) => {
    context.commit("UPDATE_CART_ITEM", { itemId: itemId, quantity: quantity });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
