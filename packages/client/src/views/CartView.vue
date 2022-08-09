<template>
  <div>
    <b-list-group v-if="itemsQuantity !== 0" class="m-3">
      <b-list-group-item>
        <b-card
          :img-src="item.product.imgUrl"
          img-alt="Card image"
          img-left
          img-width="150"
          class="m-3"
          v-for="item in itemList"
          :key="item.product.id"
          style="max-height: 8rem; min-height: 8rem"
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
            <h4 class="mb-0 text-center">{{ totalPrice / 100 }} ₽</h4>
          </b-col>

          <b-col
            style="max-width: 12rem; min-width: 12rem"
            class="p-0 text-center"
          >
            <h4 class="my-auto text-center">
              <b-button @click="showOrderModal()">Place order</b-button>
            </h4>
          </b-col>
        </b-row>
      </b-list-group-item>
    </b-list-group>
    <p v-if="itemsQuantity === 0">Oops! Your cart is empty for now :(</p>

    <b-modal v-model="isOrderModal" size="xl" title="Submit Order">
      <b-list-group class="m-3">
        <b-list-group-item variant="primary">
          <b-row align-v="center" class="m-3">
            <b-col class="text-left">E-mail: {{ this.user.email }}</b-col>
            <b-col class="text-center">Phone: {{ this.user.phone }}</b-col>
            <b-col class="text-center"
              >Name: {{ this.user.lastName }} {{ this.user.firstName }}</b-col
            >
            <b-col class="text-right"
              >Total Price: {{ this.totalPrice / 100 }} ₽</b-col
            >
          </b-row>
        </b-list-group-item>
      </b-list-group>
      <b-list-group class="m-3">
        <b-list-group-item>
          <b-form>
            <b-form-group label="Shop:">
              <b-form-select
                required
                v-model="form.shopId"
                v-for="shop of shopList"
                :key="shop.id"
              >
                <b-form-select-option :value="shop.id">{{
                  shop.address
                }}</b-form-select-option>
              </b-form-select>
              <b-form-invalid-feedback :state="isValidShopId">
                Please choose a shop to take order from!
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Company (optional):">
              <b-form-select
                required
                v-model="form.companyId"
                v-for="company of userCompanyList"
                :key="company.id"
              >
                <b-form-select-option :value="null"
                  >No company</b-form-select-option
                >
                <b-form-select-option :value="company.id">{{
                  company.name
                }}</b-form-select-option>
              </b-form-select>
            </b-form-group>
          </b-form>
        </b-list-group-item>
      </b-list-group>

      <template #modal-footer>
        <b-button @click="submitOrder" size="sm" variant="primary">
          Submit
        </b-button>
      </template>
    </b-modal>

    <div class="fixed-top" align="right">
      <b-alert
        style="max-width: 25%"
        variant="success"
        dismissible
        fade
        v-model="showOrderSuccess"
      >
        Successfully created order!
      </b-alert>
    </div>

    <div class="fixed-top" align="right">
      <b-alert
        style="max-width: 25%"
        variant="danger"
        dismissible
        fade
        v-model="showOrderFailure"
      >
        Something went wrong, try again later :(
      </b-alert>
    </div>
  </div>
</template>

<!-- вынести окно оформления заказа в компоненты -->
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
  BModal,
  BFormInput,
  BForm,
  BAlert,
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
    BModal,
    BFormInput,
    BForm,
    BAlert,
  },
  computed: {
    itemList() {
      return this.$store.getters["cart/CART"];
    },
    itemsQuantity() {
      return this.itemList.length;
    },
    totalPrice() {
      let price = 0;
      this.itemList.forEach(
        (item) => (price += item.product.initialPrice * item.quantity)
      );
      return price;
    },
    totalQuantity() {
      let quantity = 0;
      this.itemList.forEach((item) => (quantity += item.quantity));
      return quantity;
    },
    userId() {
      // ы
      return 5;
    },
    user() {
      return this.$store.getters["user/USER"];
    },
    userCompanyList() {
      return this.$store.getters["user/USER_COMPANY_LIST"];
    },
    shopList() {
      return this.$store.getters["shop/SHOP_LIST"];
    },
  },
  mounted() {
    Promise.all([
      this.$store.dispatch("user/GET_USER", { id: this.userId }),
      this.$store.dispatch("user/GET_USER_COMPANY_LIST", {
        userId: this.userId,
      }),
      this.$store.dispatch("shop/GET_SHOP_LIST"),
    ]);
  },
  data() {
    return {
      showOrderSuccess: false,
      showOrderFailure: false,
      disableInput: true,
      isOrderModal: false,
      form: {
        companyId: null,
        shopId: null,
      },
      isValidShopId: true,
    };
  },
  methods: {
    updateCartItem(itemId, quantity) {
      this.disableInput = false;
      this.$store.dispatch("cart/UPDATE_CART_ITEM", { itemId, quantity });
      this.disableInput = true;
    },
    showOrderModal() {
      this.isOrderModal = true;
    },
    closeOrderModal() {
      this.isOrderModal = false;
    },
    submitOrder() {
      if (!this.form.shopId) {
        this.isValidShopId = false;
        return;
      }
      this.$store.dispatch("user/CREATE_ORDER", {
        userId: this.user.id,
        companyId: this.form.companyId,
        statusId: 1, // подгрузить статусы
        createdAt: new Date(Date.now()).toISOString(),
        completedAt: null,
        shopId: this.form.shopId,
        price: this.totalPrice,
        itemList: this.itemList,
      });
      this.isOrderModal = false;
      // обработка ошибок блин
      this.showOrderSuccess = true;
      this.$store.dispatch("cart/CLEAR_CART");
    },
  },
};
</script>
