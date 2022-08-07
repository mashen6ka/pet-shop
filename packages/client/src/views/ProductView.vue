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
      <b-card
        img-src="https://placekitten.com/300/300"
        img-alt="Card image"
        img-left
        class="m-3"
      >
        <b-card-text align="left">
          <p>Название: {{ this.product.name }}</p>
          <p>Описание: {{ this.product.description }}</p>
          <!-- <p>Страна производства: {{ this.product. }}</p> -->
          <!-- <p>Производитель: {{ this.product. }}</p> -->
          <p>Стоимость: {{ this.product.initialPrice / 100 }} ₽</p>

          <b-row>
            <b-col style="max-width: 12rem; min-width: 12rem">
              <b-input-group>
                <b-input-group-prepend>
                  <b-button
                    @click="quantity === 1 ? (quantity = 1) : (quantity -= 1)"
                    >-</b-button
                  >
                </b-input-group-prepend>

                <b-form-input
                  type="number"
                  min="1"
                  disabled
                  v-model="quantity"
                  class="text-center"
                ></b-form-input>

                <b-input-group-append>
                  <b-button @click="quantity += 1">+</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-col>
            <b-col class="pl-0">
              <b-button @click="addProductToCart(product)"
                ><b-icon-cart></b-icon-cart> </b-button
            ></b-col>
          </b-row>
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>
import {
  BAlert,
  BCard,
  BCardText,
  BButton,
  BFormInput,
  BInputGroup,
  BIconCart,
  BInputGroupAppend,
  BInputGroupPrepend,
  BRow,
  BCol,
} from "bootstrap-vue";

export default {
  components: {
    BAlert,
    BCard,
    BCardText,
    BButton,
    BFormInput,
    BInputGroup,
    BIconCart,
    BInputGroupAppend,
    BInputGroupPrepend,
    BRow,
    BCol,
  },
  computed: {
    productId() {
      return this.$route.params.id;
    },
    product() {
      return this.getProductInfo(this.productId);
    },
  },
  data() {
    return {
      quantity: 1,
      showAddedProductToCart: false,
    };
  },
  methods: {
    getProductInfo(id) {
      //
      return {
        id: id,
        name: `Puk-${id}`,
        description: `pupupu-${id}`,
        countryId: 1,
        initialPrice: 10000,
        discount: 15,
      };
    },
    addProductToCart(product) {
      this.$store.dispatch("cart/ADD_CART_ITEM", {
        product: product,
        quantity: this.quantity,
      });
      this.showAddedProductToCart = true;
    },
  },
};
</script>
