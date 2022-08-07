<template>
  <div>
    <b-list-group v-if="itemsQuantity !== 0" class="m-3">
      <b-list-group-item>
        <b-card
          img-src="https://placekitten.com/100/100"
          img-alt="Card image"
          img-left
          class="m-3"
          v-for="item in items"
          :key="item.product.id"
        >
          <b-card-body align="left" align-v="center">
            <b-row align-v="center">
              <b-col
                ><p class="mb-0">
                  {{ item.product.name }}
                </p></b-col
              >

              <b-col
                style="max-width: 12rem; min-width: 12rem"
                class="text-center"
                ><p class="my-auto">
                  {{ item.product.initialPrice / 100 }} ₽
                </p></b-col
              >

              <b-col
                style="max-width: 12rem; min-width: 12rem"
                class="text-center"
              >
                <b-input-group>
                  <b-input-group-prepend>
                    <b-button
                      @click="
                        updateCartItem(item.product.id, item.quantity - 1)
                      "
                      >-</b-button
                    >
                  </b-input-group-prepend>

                  <b-form-input
                    type="number"
                    min="1"
                    :disabled="disableInput"
                    v-model="item.quantity"
                    class="text-center"
                  ></b-form-input>

                  <b-input-group-append>
                    <b-button
                      @click="
                        updateCartItem(item.product.id, item.quantity + 1)
                      "
                      >+</b-button
                    >
                  </b-input-group-append>
                </b-input-group>
              </b-col>

              <b-col
                style="max-width: 12rem; min-width: 12rem"
                class="text-center"
                ><p class="mb-0">
                  {{ (item.product.initialPrice / 100) * item.quantity }} ₽
                </p></b-col
              >
            </b-row>
          </b-card-body>
        </b-card>
      </b-list-group-item>
    </b-list-group>
    <b-list-group v-if="itemsQuantity !== 0" class="m-3">
      <b-list-group-item>
        <b-row align-v="center" class="m-3">
          <b-col
            ><h3
              style="max-width: 36rem; min-width: 36rem"
              class="p-0 my-auto text-left"
            >
              Total:
            </h3></b-col
          >

          <b-col
            style="max-width: 12rem; min-width: 12rem"
            class="p-0 text-center"
          >
            <h4 class="my-auto text-center">{{ totalQuantity }} item(s)</h4>
          </b-col>

          <b-col
            style="max-width: 12rem; min-width: 12rem"
            class="p-0 text-center"
          >
            <h4 class="mb-0 text-center">{{ totalPrice }} ₽</h4>
          </b-col>

          <b-col
            style="max-width: 12rem; min-width: 12rem"
            class="p-0 text-center"
          >
            <h4 class="my-auto text-center">
              <b-button>Place order</b-button>
            </h4>
          </b-col>
        </b-row>
      </b-list-group-item>
    </b-list-group>
    <p v-if="itemsQuantity === 0">Oops! Your cart is empty for now :(</p>
  </div>
</template>

<script>
import {
  BListGroup,
  BListGroupItem,
  BCard,
  BCardBody,
  BInputGroup,
  BInputGroupAppend,
  BInputGroupPrepend,
  BRow,
  BCol,
} from "bootstrap-vue";

export default {
  components: {
    BListGroup,
    BListGroupItem,
    BCard,
    BCardBody,
    BInputGroup,
    BInputGroupAppend,
    BInputGroupPrepend,
    BRow,
    BCol,
  },
  computed: {
    items() {
      return this.$store.getters["cart/CART"];
    },
    itemsQuantity() {
      return this.items.length;
    },
    totalPrice() {
      let price = 0;
      this.items.forEach(
        (item) => (price += item.product.initialPrice * item.quantity)
      );
      return price;
    },
    totalQuantity() {
      let quantity = 0;
      this.items.forEach((item) => (quantity += item.quantity));
      return quantity;
    },
  },
  data() {
    return {
      disableInput: true,
    };
  },
  methods: {
    updateCartItem(itemId, quantity) {
      this.disableInput = false;
      this.$store.dispatch("cart/UPDATE_CART_ITEM", { itemId, quantity });
      this.disableInput = true;
    },
    placeOrder() {
      //запрос серверу на создание ордера
    },
  },
};
</script>
