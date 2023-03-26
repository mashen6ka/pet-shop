<template>
  <b-container>
    <b-container class="fixed-top" align="right">
      <b-alert
        style="width: fit-content"
        variant="success"
        dismissible
        fade
        v-model="showAddedProductToCart"
      >
        Successfully added product to cart!
      </b-alert>
    </b-container>

    <b-container class="justify-content-center">
      <b-form-input
        type="search"
        v-model="searchValue"
        placeholder="Type something"
      ></b-form-input>
      <b-card-group
        deck
        :per-page="perPage"
        :current-page="currentPage"
        class="justify-content-between my-2"
      >
        <b-card
          v-for="product in productListByPage"
          :key="product.id"
          class="text-between my-2"
          style="min-width: 20%; max-height: 30rem"
          img-top
          img-height="60%"
          :img-src="product.imgUrl"
        >
          <b-card-text style="max-height: 30%" class="mb-4"
            ><b-link :to="{ name: 'product', params: { id: product.id } }">{{
              product.name
            }}</b-link></b-card-text
          >
          <template #footer>
            <b-button @click="addProductToCart(product)">
              {{ product.initialPrice / 100 }} ₽
              <b-icon-cart></b-icon-cart>
            </b-button>
          </template>
        </b-card>
      </b-card-group>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        align="center"
      ></b-pagination>
    </b-container>
  </b-container>
</template>

<script>
import {
  BCardGroup,
  BCard,
  BCardText,
  BButton,
  BIconCart,
  BAlert,
  BLink,
  BPagination,
  BFormInput,
  BContainer,
  BCol,
} from "bootstrap-vue";

export default {
  components: {
    BCardGroup,
    BCard,
    BCardText,
    BButton,
    BIconCart,
    BAlert,
    BLink,
    BPagination,
    BFormInput,
    BContainer,
  },
  computed: {
    serverAddress() {
      return process.env.VUE_APP_SERVER_ADDRESS;
    },
    productList() {
      return this.$store.getters["product/PRODUCT_LIST"];
    },
    rows() {
      return this.productListFiltered.length;
    },
    productListByPage() {
      const end = this.perPage * this.currentPage;
      const start = end - this.perPage;

      return this.productListFiltered.slice(start, end);
    },
    productListFiltered() {
      if (this.searchValue !== "") {
        return this.productList.filter((product) =>
          product.name.toLowerCase().includes(this.searchValue.toLowerCase())
        );
      } else {
        return this.productList;
      }
    },
  },
  mounted() {
    Promise.all([this.$store.dispatch("product/GET_PRODUCT_LIST")]);
    const cart = localStorage.cart;
    if (cart) {
      Promise.all([this.$store.dispatch("cart/SET_CART", JSON.parse(cart))]);
    }
  },
  data() {
    return {
      perPage: 20,
      currentPage: 1,
      showAddedProductToCart: false,
      searchValue: "",
    };
  },
  methods: {
    addProductToCart(product) {
      this.$store.dispatch("cart/ADD_CART_ITEM", {
        product: product,
        quantity: 1,
      });

      // синхронизируем localStorage и vuex
      const cartCurrent = this.$store.getters["cart/CART"];
      localStorage.setItem("cart", JSON.stringify(cartCurrent));

      this.showAddedProductToCart = true;
    },
  },
};
</script>
