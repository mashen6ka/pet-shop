<template>
  <div id="app">
    <nav>
      <router-link to="/catalogue">Catalogue</router-link> |
      <router-link to="/contacts">Contacts</router-link> |
      <router-link to="/cart"
        >Cart
        <b-badge
          v-if="totalQuantity !== 0"
          class="pt-1"
          variant="primary"
          pill
          >{{ totalQuantity }}</b-badge
        ></router-link
      >
      |
      <router-link to="/account">Account</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { BBadge } from "bootstrap-vue";

export default {
  components: {
    BBadge,
  },
  computed: {
    totalQuantity() {
      let quantity = 0;
      this.$store.getters["cart/CART"].forEach(
        (item) => (quantity += item.quantity)
      );
      return quantity;
    },
  },
  data() {
    return {};
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
