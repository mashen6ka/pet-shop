import { ActionContext } from "vuex";
import { OrderItem, Product } from "../types";

type cartState = {
  cart: OrderItem[];
};

const state: cartState = {
  cart: [],
};

const getters = {
  CART: (state: cartState) => state.cart,
};

const mutations = {
  SET_CART: (state: cartState, cart: OrderItem[]) => (state.cart = cart || []),
  ADD_CART_ITEM: (state: cartState, itemNew: OrderItem) => {
    let isInCart = false;
    state.cart = state.cart.map(
      (item: { product: Product; quantity: number }) => {
        if (item.product.id === itemNew.product.id) {
          item.quantity += itemNew.quantity;
          isInCart = true;
        }
        return item;
      }
    );
    if (!isInCart) {
      state.cart.push(itemNew);
    }
  },
  REMOVE_CART_ITEM: (state: cartState, itemOld: OrderItem) => {
    state.cart = state.cart
      .map((item: { product: Product; quantity: number }) => {
        if (item.product.id === itemOld.product.id) {
          item.quantity -= itemOld.quantity;
        }
        return item;
      })
      .filter((item) => item.quantity !== 0);
  },
  UPDATE_CART_ITEM: (
    state: cartState,
    { itemId, quantity }: { itemId: number; quantity: number }
  ) => {
    state.cart = state.cart
      .map((item: { product: Product; quantity: number }) => {
        if (item.product.id === itemId) {
          item.quantity = quantity;
        }
        return item;
      })
      .filter((item) => item.quantity !== 0);
  },
};

const actions = {
  SET_CART: (context: ActionContext<cartState, null>, cart: OrderItem[]) => {
    context.commit("SET_CART", cart);
  },
  CLEAR_CART: (context: ActionContext<cartState, null>) => {
    context.commit("SET_CART", []);
  },
  ADD_CART_ITEM: (context: ActionContext<cartState, null>, item: OrderItem) => {
    context.commit("ADD_CART_ITEM", item);
  },
  REMOVE_CART_ITEM: (
    context: ActionContext<cartState, null>,
    itemId: number
  ) => {
    context.commit("REMOVE_CART_ITEM", itemId);
  },
  UPDATE_CART_ITEM: (
    context: ActionContext<cartState, null>,
    { itemId, quantity }: { itemId: number; quantity: number }
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
