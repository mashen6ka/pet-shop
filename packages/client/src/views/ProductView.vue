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

    <b-card no-body class="m-3">
      <b-tabs card>
        <b-tab title="Info" content-class="m-3">
          <b-card border-variant="none" class="p-0">
            <b-row cols="1" cols-sm="2" cols-md="2" cols-lg="2">
              <b-col style="min-width: 50%">
                <b-card-img
                  :src="serverAddress + this.product.imgUrl"
                  style="min-height: 80%"
                ></b-card-img>
              </b-col>
              <b-col>
                <b-card-text align="left">
                  <p><b>Name:</b> {{ this.product.name }}</p>
                  <p><b>Price:</b> {{ this.product.initialPrice / 100 }} ₽</p>
                  <p>
                    <b>Country:</b>
                    {{ this.productCountry ? this.productCountry.name : "-" }}
                  </p>
                  <p>
                    <b>Manufacturer:</b>
                    {{
                      this.productManufacturer
                        ? this.productManufacturer.name
                        : "-"
                    }}
                  </p>
                  <p><b>Description:</b> {{ this.product.description }}</p>
                  <b-row class="my-3 justify-content-center" cols="2">
                    <b-input-group style="max-width: 10rem">
                      <b-input-group-prepend>
                        <b-button
                          @click="
                            quantity === 1 ? (quantity = 1) : (quantity -= 1)
                          "
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

                    <b-button
                      @click="addProductToCart(product)"
                      class="ml-1"
                      style="max-width: 4rem"
                      ><b-icon-cart></b-icon-cart>
                    </b-button>
                  </b-row>
                </b-card-text>
              </b-col>
            </b-row>
          </b-card>
        </b-tab>
        <b-tab title="Avaliability" content-class="m-3">
          <b-card v-if="productShopList.length !== 0">
            <b-list-group class="mb-3">
              <b-list-group-item variant="primary">
                <b-row align-v="center" class="m-1">
                  <b-col>
                    <label> Address: </label>
                  </b-col>
                  <b-col>
                    <label> Working hours: </label>
                  </b-col>
                  <b-col>
                    <label> Phone: </label>
                  </b-col>
                </b-row>
              </b-list-group-item>
            </b-list-group>
            <b-list-group>
              <b-list-group-item v-for="shop in productShopList" :key="shop.id">
                <b-row align-v="center" class="m-1">
                  <b-col>
                    <label>{{ shop.address || "-" }} </label>
                  </b-col>
                  <b-col>
                    <label>
                      {{ shop.workingHours.from }}.00 -
                      {{ shop.workingHours.to }}.00
                    </label>
                  </b-col>
                  <b-col>
                    <label>{{ shop.phone || "-" }} </label>
                  </b-col>
                </b-row>
              </b-list-group-item>
            </b-list-group>
          </b-card>
          <p v-if="productShopList.length === 0">
            Oops! This product is not available in offline shops :(
          </p>
        </b-tab>
      </b-tabs>
    </b-card>
  </b-container>
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
  BTabs,
  BTab,
  BListGroup,
  BListGroupItem,
  BContainer,
  BCardImg,
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
    BTabs,
    BTab,
    BListGroup,
    BListGroupItem,
    BContainer,
    BCardImg,
  },
  computed: {
    serverAddress() {
      return process.env.VUE_APP_SERVER_ADDRESS;
    },
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
      return this.$store.getters["product/PRODUCT"] ?? {};
    },
    productShopList() {
      return this.$store.getters["product/PRODUCT_SHOP_LIST"];
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
      this.$store.dispatch("product/GET_PRODUCT_SHOP_LIST", {
        productId: this.productId,
      }),
      this.$store.dispatch("manufacturer/GET_MANUFACTURER_LIST"),
      this.$store.dispatch("country/GET_COUNTRY_LIST"),
      this.$store.dispatch("cart/SET_CART", JSON.parse(localStorage.cart)),
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

      // синхронизируем localStorage и vuex
      const cartCurrent = this.$store.getters["cart/CART"];
      localStorage.setItem("cart", JSON.stringify(cartCurrent));

      this.showAddedProductToCart = true;
    },
  },
};
</script>
