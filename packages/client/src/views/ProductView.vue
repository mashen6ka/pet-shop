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
        :img-src="this.product.imgUrl"
        img-alt="Card image"
        img-left
        class="m-3"
      >
        <b-card-text align="left">
          <p><b>Name:</b> {{ this.product.name }}</p>
          <p><b>Description:</b> {{ this.product.description }}</p>
          <p>
            <b>Country:</b>
            {{ this.productCountry ? this.productCountry.name : "-" }}
          </p>
          <p>
            <b>Manufacturer:</b>
            {{ this.productManufacturer ? this.productManufacturer.name : "-" }}
          </p>
          <p><b>Price:</b> {{ this.product.initialPrice / 100 }} ₽</p>

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
    productManufacturer() {
      return this.manufacturerList.find(
        (manufacturer) => manufacturer.id === this.product.manufacturerId
      );
    },
    productCountry() {
      return this.countryList.find(
        (country) => country.id === this.product.countryId
      );
    },
    productId() {
      return Number(this.$route.params.id);
    },
    product() {
      return this.$store.getters["product/PRODUCT"];
    },
    manufacturerList() {
      return this.$store.getters["manufacturer/MANUFACTURER_LIST"];
    },
    countryList() {
      return this.$store.getters["country/COUNTRY_LIST"];
    },
  },
  mounted() {
    // добавить mapGetters
    Promise.all([
      this.$store.dispatch("product/GET_PRODUCT", {
        id: this.productId,
      }),
      this.$store.dispatch("manufacturer/GET_MANUFACTURER_LIST"),
      this.$store.dispatch("country/GET_COUNTRY_LIST"),
    ]);
  },
  data() {
    return {
      quantity: 1,
      showAddedProductToCart: false,
    };
  },
  methods: {
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
