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
                  <b-form-input v-model="user.login"></b-form-input>
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
                    type="password"
                    v-model="user.password"
                  ></b-form-input>
                </b-col> </b-row
            ></b-list-group-item>
            <b-list-group-item>
              <b-row align-v="center" class="m-1">
                <b-col>
                  <label>First Name: </label>
                </b-col>
                <b-col>
                  <b-form-input v-model="user.firstName"></b-form-input>
                </b-col> </b-row
            ></b-list-group-item>
            <b-list-group-item>
              <b-row align-v="center" class="m-1">
                <b-col>
                  <label>Last Name: </label>
                </b-col>
                <b-col>
                  <b-form-input v-model="user.lastName"></b-form-input>
                </b-col> </b-row
            ></b-list-group-item>
            <b-list-group-item>
              <b-row align-v="center" class="m-1">
                <b-col>
                  <label>Middle Name: </label>
                </b-col>
                <b-col>
                  <b-form-input v-model="user.middleName"></b-form-input>
                </b-col> </b-row
            ></b-list-group-item>
            <b-list-group-item>
              <b-row align-v="center" class="m-1">
                <b-col>
                  <label>E-mail: </label>
                </b-col>
                <b-col>
                  <b-form-input
                    type="email"
                    v-model="user.email"
                  ></b-form-input>
                </b-col> </b-row
            ></b-list-group-item>
            <b-list-group-item>
              <b-row align-v="center" class="m-1">
                <b-col>
                  <label>Birthday: </label>
                </b-col>
                <b-col>
                  <b-form-input v-model="user.birthday"></b-form-input>
                </b-col>
              </b-row>
            </b-list-group-item>
            <b-list-group-item>
              <b-row align-v="center" class="m-1">
                <b-col>
                  <label>Phone Number: </label>
                </b-col>
                <b-col>
                  <b-form-input v-model="user.phone"></b-form-input>
                </b-col> </b-row
            ></b-list-group-item>
            <b-list-group-item>
              <b-row align-v="center" class="m-1">
                <b-col>
                  <label>Personal Discount: </label>
                </b-col>
                <b-col>
                  <b-form-input v-model="user.personalDiscount"></b-form-input>
                </b-col> </b-row
            ></b-list-group-item>
          </b-list-group>
        </b-tab>
        <b-tab title="My Orders">
          <b-list-group v-if="userOrderList.length !== 0" class="m-3">
            <b-list-group-item variant="primary">
              <b-row align-v="center" class="m-1">
                <b-col>
                  <label> Order №: </label>
                </b-col>
                <b-col>
                  <label>Company Name: </label>
                </b-col>
                <b-col>
                  <label>Status: </label>
                </b-col>
                <b-col>
                  <label>Created At: </label>
                </b-col>
                <b-col>
                  <label>Completed At: </label>
                </b-col>
                <b-col>
                  <label>Address: </label>
                </b-col>
                <b-col>
                  <label>Total Price:</label>
                </b-col>
              </b-row></b-list-group-item
            >
          </b-list-group>
          <b-list-group
            class="m-3"
            v-for="order in userOrderList"
            :key="order.id"
          >
            <b-list-group-item>
              <b-row align-v="center" class="m-1">
                <b-col>
                  <label>{{ order.id }} </label>
                </b-col>
                <b-col>
                  <label>{{ getCompanyName(order.companyId) || "-" }} </label>
                </b-col>
                <b-col>
                  <label
                    >{{ getOrderStatusName(order.statusId) || "-" }}
                  </label>
                </b-col>
                <b-col>
                  <label>{{ order.createdAt || "-" }} </label>
                </b-col>
                <b-col>
                  <label>{{ order.completedAt || "-" }} </label>
                </b-col>
                <b-col>
                  <label>{{ getShopAddress(order.shopId) || "-" }} </label>
                </b-col>
                <b-col>
                  <label>{{ countOrderPrice(order) / 100 }} ₽</label>
                </b-col>
              </b-row></b-list-group-item
            >
          </b-list-group>
          <p v-if="userOrderList.length === 0">
            Oops! You don't have any placed orders yet :(
          </p>
        </b-tab>
        <b-tab title="My Companies">
          <b-list-group class="m-3">
            <b-list-group-item variant="primary">
              <b-row align-v="center" class="m-1">
                <b-col>
                  <label>Name: </label>
                </b-col>
                <b-col>
                  <label>KPP: </label>
                </b-col>
                <b-col>
                  <label>INN: </label>
                </b-col>
                <b-col>
                  <label>Address: </label>
                </b-col>
                <b-col>
                  <label>Action:</label>
                </b-col>
              </b-row></b-list-group-item
            >
          </b-list-group>
          <b-list-group class="m-3">
            <b-list-group-item>
              <b-row align-v="center" class="m-1">
                <b-col>
                  <label><b-form-input></b-form-input></label>
                </b-col>
                <b-col>
                  <label> <b-form-input></b-form-input></label>
                </b-col>
                <b-col>
                  <label><b-form-input></b-form-input></label>
                </b-col>
                <b-col>
                  <label><b-form-input></b-form-input></label>
                </b-col>
                <b-col
                  ><b-button><b-icon-plus></b-icon-plus></b-button
                ></b-col> </b-row
            ></b-list-group-item>
          </b-list-group>
          <b-list-group
            class="m-3"
            v-for="company in userCompanyList"
            :key="company.id"
          >
            <b-list-group-item>
              <b-row align-v="center" class="m-1">
                <b-col>
                  <label>{{ company.name || "-" }}</label>
                </b-col>
                <b-col>
                  <label> {{ company.KPP || "-" }}</label>
                </b-col>
                <b-col>
                  <label>{{ company.INN || "-" }} </label>
                </b-col>
                <b-col>
                  <label>{{ company.address || "-" }} </label>
                </b-col>
                <b-col
                  ><b-button><b-icon-trash></b-icon-trash></b-button
                ></b-col> </b-row
            ></b-list-group-item>
          </b-list-group>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import {
  BListGroup,
  BButton,
  BIconTrash,
  BIconPlus,
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
    BButton,
    BIconTrash,
    BIconPlus,
    BListGroupItem,
    BCard,
    BTabs,
    BTab,
    BRow,
    BCol,
    BFormInput,
  },
  computed: {
    userId() {
      // ы
      return 5;
    },
    user() {
      return this.$store.getters["user/USER"];
    },
    userOrderList() {
      return this.$store.getters["user/USER_ORDER_LIST"];
    },
    userCompanyList() {
      return this.$store.getters["user/USER_COMPANY_LIST"];
    },
    companyList() {
      return this.$store.getters["company/COMPANY_LIST"];
    },
    orderStatusList() {
      return this.$store.getters["orderStatus/ORDER_STATUS_LIST"];
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
      this.$store.dispatch("user/GET_USER_ORDER_LIST", { userId: this.userId }),
      this.$store.dispatch("company/GET_COMPANY_LIST"),
      this.$store.dispatch("orderStatus/GET_ORDER_STATUS_LIST"),
      this.$store.dispatch("shop/GET_SHOP_LIST"),
    ]);
  },
  data() {
    return {};
  },
  methods: {
    // переименовать orderStatus везде в status (в бд наверн тоже)
    getOrderStatusName(id) {
      return this.orderStatusList.find((orderStatus) => orderStatus.id === id)
        ?.name;
    },
    getCompanyName(id) {
      return this.companyList.find((company) => company.id === id)?.name;
    },
    getShopAddress(id) {
      return this.shopList.find((shop) => shop.id === id)?.address;
    },
    countOrderPrice(order) {
      let price = 0;
      order.itemList.forEach((item) => {
        price += item.product.initialPrice * item.quantity;
      });
      return price;
    },
  },
};
</script>
