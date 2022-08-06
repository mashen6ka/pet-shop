import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import CatalogueView from "../views/CatalogueView.vue";
import ContactsView from "../views/ContactsView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  // {
  //   path: "/",
  //   name: "home",
  //   component: HomeView,
  // },
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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
