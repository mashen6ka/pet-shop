<template>
  <b-container>
    <b-list-group v-if="itemsQuantity !== 0" class="m-3">
      <b-list-group-item>
        <b-card v-for="item in itemList" :key="item.product.id">
          <b-row align-v="center" cols="1" cols-sm="5">
            <b-col style="max-height: 10%">
              <b-card-img :src="item.product.imgUrl"></b-card-img>
            </b-col>
            <b-col
              ><p class="mb-0">
                {{ item.product.name }}
              </p></b-col
            >

            <b-col class="text-center"
              ><p class="my-auto">
                {{ item.product.initialPrice / 100 }} ₽
              </p></b-col
            >

            <b-col class="text-center">
              <b-input-group>
                <b-input-group-prepend>
                  <b-button
                    @click="updateCartItem(item.product.id, item.quantity - 1)"
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
                    @click="updateCartItem(item.product.id, item.quantity + 1)"
                    >+</b-button
                  >
                </b-input-group-append>
              </b-input-group>
            </b-col>

            <b-col class="text-center"
              ><p class="mb-0">
                <b>
                  {{ (item.product.initialPrice / 100) * item.quantity }} ₽
                </b>
              </p></b-col
            >
          </b-row>
        </b-card>
      </b-list-group-item>
    </b-list-group>
    <b-list-group v-if="itemsQuantity !== 0" class="m-3">
      <b-list-group-item>
        <b-row align-v="center" class="m-3" cols="1" cols-sm="4">
          <b-col><h3 class="p-0 my-auto text-center">Total:</h3></b-col>

          <b-col class="p-0 text-center">
            <h4 class="my-auto text-center">{{ totalQuantity }} item(s)</h4>
          </b-col>

          <b-col class="p-0 text-center">
            <h4 class="mb-0 text-center">{{ totalPrice / 100 }} ₽</h4>
          </b-col>

          <b-col class="p-0 text-center">
            <h4 class="my-auto text-center">
              <b-button @click="showOrderModal()">Place order</b-button>
            </h4>
          </b-col>
        </b-row>
      </b-list-group-item>
    </b-list-group>
    <p v-if="itemsQuantity === 0">Oops! Your cart is empty for now :(</p>

    <b-modal v-model="isOrderModal" size="xl" title="Submit Order">
      <b-list-group class="mb-3">
        <b-list-group-item variant="primary">
          <b-row align-v="center" class="m-3" cols="1" cols-sm="2" cols-md="4">
            <b-col class="p-0"><b>E-mail:</b> {{ this.user?.email }}</b-col>
            <b-col class="p-0"><b>Phone:</b> {{ this.user?.phone }}</b-col>
            <b-col class="p-0"><b>Name:</b> {{ this.user?.firstName }}</b-col>
            <b-col class="p-0"
              ><b>Total Price:</b> {{ this.totalPrice / 100 }} ₽</b-col
            >
          </b-row>
        </b-list-group-item>
      </b-list-group>
      <b-list-group>
        <b-list-group-item>
          <b-form>
            <b-form-group label="Shop:">
              <b-form-select required v-model="form.shopId">
                <b-form-select-option
                  v-for="shop of shopList"
                  :key="shop.id"
                  :value="shop.id"
                  >{{ shop.address }}</b-form-select-option
                >
              </b-form-select>
              <b-form-invalid-feedback :state="isValidShopId">
                Please choose a shop to take order from!
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Company (optional):">
              <b-form-select required v-model="form.companyId">
                <b-form-select-option :value="null"
                  >No company</b-form-select-option
                >
                <b-form-select-option
                  v-for="company of userCompanyList"
                  :key="company.id"
                  :value="company.id"
                  >{{ company.name }}</b-form-select-option
                >
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

    <b-container class="fixed-top" align="right">
      <b-alert
        style="width: fit-content"
        variant="success"
        dismissible
        fade
        v-model="showOrderSuccess"
      >
        Successfully created order!
      </b-alert>
    </b-container>

    <b-container class="fixed-top" align="right">
      <b-alert
        style="width: fit-content"
        variant="danger"
        dismissible
        fade
        v-model="showOrderFailure"
      >
        Something went wrong, try again later :(
      </b-alert>
    </b-container>
  </b-container>
</template>

<!-- вынести окно оформления заказа в компоненты -->
<script>
import {
  BListGroup,
  BListGroupItem,
  BCard,
  BInputGroup,
  BInputGroupAppend,
  BInputGroupPrepend,
  BRow,
  BCol,
  BModal,
  BFormInput,
  BForm,
  BAlert,
  BContainer,
} from "bootstrap-vue";

export default {
  components: {
    BListGroup,
    BListGroupItem,
    BCard,
    BInputGroup,
    BInputGroupAppend,
    BInputGroupPrepend,
    BRow,
    BCol,
    BModal,
    BFormInput,
    BForm,
    BAlert,
    BContainer,
  },
  computed: {
    // надо норм проверку на авторизацию сделать везде, чтобы в консоль ошибки не летели
    // еще норм обрабатывать пустой список айтемов (когда 0 заказов сделано)
    // еще поймала баг при релоаде аккаунта слетает бейдж с кол-вом товаров в корзине (мб беды с синхронизацией локалсторэджа и вьюэкса)
    serverAddress() {
      return process.env.VUE_APP_SERVER_ADDRESS;
    },
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
    // const token = this.$cookies.get(process.env.VUE_APP_AUTH_COOKIE_NAME);
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push("/login");
    } else {
      Promise.all([
        this.$store.dispatch("user/GET_USER"),
        this.$store.dispatch("user/GET_USER_COMPANY_LIST"),
        this.$store.dispatch("shop/GET_SHOP_LIST"),
        this.$store.dispatch("cart/SET_CART", JSON.parse(localStorage.cart)),
      ]);
    }
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

      // синхронизируем localStorage и vuex
      const cartCurrent = this.$store.getters["cart/CART"];
      localStorage.setItem("cart", JSON.stringify(cartCurrent));

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

      // синхронизируем localStorage и vuex
      const cartCurrent = this.$store.getters["cart/CART"];
      localStorage.setItem("cart", JSON.stringify(cartCurrent));
    },
  },
};
</script>
