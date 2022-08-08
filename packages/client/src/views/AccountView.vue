<template>
  <div>
    <b-card no-body class="m-3">
      <b-tabs card>
        <b-tab title="My Profile" content-class="m-3">
          <b-list-group class="m-3">
            <b-list-group-item>
              <b-row align-v="center" class="m-1">
                <b-col>
                  <label>Login: </label>
                </b-col>
                <b-col>
                  <b-form-input disabled v-model="client.login"></b-form-input>
                </b-col>
              </b-row>
            </b-list-group-item>
            <b-list-group-item>
              <b-row align-v="center" class="m-1">
                <b-col>
                  <label>Password: </label>
                </b-col>
                <b-col>
                  <b-form-input
                    disabled
                    type="password"
                    v-model="client.password"
                  ></b-form-input>
                </b-col> </b-row
            ></b-list-group-item>
            <b-list-group-item>
              <b-row align-v="center" class="m-1">
                <b-col>
                  <label>First Name: </label>
                </b-col>
                <b-col>
                  <b-form-input
                    disabled
                    v-model="client.firstName"
                  ></b-form-input>
                </b-col> </b-row
            ></b-list-group-item>
            <b-list-group-item>
              <b-row align-v="center" class="m-1">
                <b-col>
                  <label>Last Name: </label>
                </b-col>
                <b-col>
                  <b-form-input
                    disabled
                    v-model="client.lastName"
                  ></b-form-input>
                </b-col> </b-row
            ></b-list-group-item>
            <b-list-group-item>
              <b-row align-v="center" class="m-1">
                <b-col>
                  <label>Middle Name: </label>
                </b-col>
                <b-col>
                  <b-form-input
                    disabled
                    v-model="client.middleName"
                  ></b-form-input>
                </b-col> </b-row
            ></b-list-group-item>
            <b-list-group-item>
              <b-row align-v="center" class="m-1">
                <b-col>
                  <label>E-mail: </label>
                </b-col>
                <b-col>
                  <b-form-input
                    disabled
                    type="email"
                    v-model="client.email"
                  ></b-form-input>
                </b-col> </b-row
            ></b-list-group-item>
            <b-list-group-item>
              <b-row align-v="center" class="m-1">
                <b-col>
                  <label>Birthday: </label>
                </b-col>
                <b-col>
                  <b-form-input
                    disabled
                    v-model="client.birthday"
                  ></b-form-input>
                </b-col>
              </b-row>
            </b-list-group-item>
            <b-list-group-item>
              <b-row align-v="center" class="m-1">
                <b-col>
                  <label>Phone Number: </label>
                </b-col>
                <b-col>
                  <b-form-input disabled v-model="client.phone"></b-form-input>
                </b-col> </b-row
            ></b-list-group-item>
            <b-list-group-item>
              <b-row align-v="center" class="m-1">
                <b-col>
                  <label>Personal Discount: </label>
                </b-col>
                <b-col>
                  <b-form-input
                    disabled
                    v-model="client.personalDiscount"
                  ></b-form-input>
                </b-col> </b-row
            ></b-list-group-item>
          </b-list-group>
        </b-tab>
        <b-tab title="My Orders">
          <b-list-group class="m-3" v-for="order in orders" :key="order.id">
            <b-list-group-item> </b-list-group-item>
          </b-list-group>
          <p v-if="orders.length === 0">
            Oops! You don't have any placed orders yet :(
          </p>
        </b-tab>
        <b-tab title="My Companies">
          <b-list-group>
            <b-list-group-item>
              <b-row align-v="center" class="m-1">
                <b-col>
                  <label>Login: </label>
                </b-col>
                <b-col>
                  <b-form-input disabled v-model="client.login"></b-form-input>
                </b-col>
                <b-col>
                  <b-button>Add</b-button>
                </b-col>
              </b-row>
            </b-list-group-item>
          </b-list-group>
          <b-list-group
            class="m-3"
            v-for="company in companies"
            :key="company.id"
          >
            <b-list-group-item>
              <b-row align-v="center" class="m-1">
                <b-col>
                  <label>Login: </label>
                </b-col>
                <b-col>
                  <b-form-input disabled v-model="client.login"></b-form-input>
                </b-col>
              </b-row>
            </b-list-group-item>
          </b-list-group>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import {
  BListGroup,
  BListGroupItem,
  BCard,
  BTabs,
  BTab,
  BRow,
  BCol,
  BFormInput,
} from "bootstrap-vue";

export default {
  components: {
    BListGroup,
    BListGroupItem,
    BCard,
    BTabs,
    BTab,
    BRow,
    BCol,
    BFormInput,
  },
  computed: {
    client() {
      return this.$store.getters["authClient/CLIENT"];
    },
    orders() {
      return this.$store.getters["authClient/CLIENT_ORDER_LIST"];
    },
    companies() {
      return this.$store.getters["authClient/CLIENT_COMPANY_LIST"];
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
