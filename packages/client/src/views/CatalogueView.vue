<template>
  <div>
    <div class="fixed-top" align="right">
      <b-alert
        style="max-width: 25%"
        variant="success"
        dismissible
        fade
        v-model="showAddedProductToCart"
      >
        Successfully added product to cart!
      </b-alert>
    </div>

    <div>
      <b-card-group
        deck
        class="m-1"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <b-form-input
          v-model="searchValue"
          placeholder="Type something"
          class="m-3"
        ></b-form-input>
        <b-card
          v-for="product in productListByPage"
          :key="product.id"
          class="text-center mx-auto my-2"
          img-top
          img-height="250"
          style="max-width: 15rem; min-width: 15rem"
          :img-src="product.imgUrl"
        >
          <b-card-text style="max-height: 8rem; min-height: 8rem"
            ><b-link :to="{ name: 'product', params: { id: product.id } }">{{
              product.name
            }}</b-link></b-card-text
          >
          <b-button @click="addProductToCart(product)">
            {{ product.initialPrice / 100 }} ₽
            <b-icon-cart></b-icon-cart>
          </b-button>
        </b-card>
      </b-card-group>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        align="center"
      ></b-pagination>
    </div>
  </div>
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
  },
  computed: {
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
    Promise.all([
      this.$store.dispatch("product/GET_PRODUCT_LIST"),
      this.$store.dispatch("cart/SET_CART", JSON.parse(localStorage.cart)),
    ]);
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
