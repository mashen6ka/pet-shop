import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import CatalogueView from "../views/CatalogueView.vue";
import ContactsView from "../views/ContactsView.vue";
import ProductView from "../views/ProductView.vue";
import CartView from "../views/CartView.vue";
import AccountView from "../views/AccountView.vue";
import WorkerView from "../views/WorkerView.vue";
import LoginView from "../views/LoginView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    redirect: () => {
      return "catalogue";
    },
  },
  {
    path: "/test",
    name: "home",
    redirect: () => {
      return "catalogue";
    },
  },
  {
    path: "/catalogue",
    name: "catalogue",
    component: CatalogueView,
  },
  {
    path: "/contacts",
    name: "contacts",
    component: ContactsView,
  },
  {
    path: "/product/:id",
    name: "product",
    component: ProductView,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
  },
  {
    path: "/account",
    name: "account",
    component: AccountView,
  },
  {
    path: "/worker",
    name: "worker",
    component: WorkerView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
