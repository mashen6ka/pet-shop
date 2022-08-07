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
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        align="center"
      ></b-pagination>
      <b-card-group
        deck
        class="m-1"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <b-card
          v-for="product in productsByPage"
          :key="product.id"
          class="text-center mx-auto my-2"
          img-top
          style="max-width: 20rem; min-width: 20rem"
          img-src="https://placekitten.com/600/600"
        >
          <b-card-title
            ><b-link :to="{ name: 'product', params: { id: product.id } }">{{
              product.name
            }}</b-link></b-card-title
          >
          <b-card-text>
            <b-button @click="addProductToCart(product)">
              {{ product.initialPrice / 100 }} ₽
              <b-icon-cart></b-icon-cart>
            </b-button>
          </b-card-text>
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
  BCardTitle,
  BPagination,
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
    BCardTitle,
    BPagination,
  },
  computed: {
    rows() {
      return this.products.length;
    },
    productsByPage() {
      const end = this.perPage * this.currentPage;
      const start = end - this.perPage;

      return this.products.slice(start, end);
    },
  },
  data() {
    return {
      products: this.getProductList(100),
      perPage: 20,
      currentPage: 1,
      showAddedProductToCart: false,
    };
  },
  methods: {
    getProductList(count) {
      const productList = [];
      for (let i = 0; i < count; i++) {
        productList.push({
          id: i,
          name: `Puk-${i}`,
          description: `pupupu-${i}`,
          countryId: 1,
          initialPrice: 10000,
          discount: 15,
        });
      }
      return productList;
    },

    addProductToCart(product) {
      this.$store.dispatch("cart/ADD_CART_ITEM", {
        product: product,
        quantity: 1,
      });
      this.showAddedProductToCart = true;
    },
  },
};
</script>
