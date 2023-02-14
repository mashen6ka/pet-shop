<template>
  <b-container>
    <b-card no-body class="m-3">
      <b-tabs card>
        <b-tab title="My Profile" content-class="m-3">
          <b-list-group>
            <b-list-group-item>
              <b-row align-v="center" class="m-1">
                <b-col class="text-left">
                  <label>Login: </label>
                </b-col>
                <b-col>
                  <b-form-input v-model="user.login" disabled></b-form-input>
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
                    v-model="form.password"
                    placeholder="●●●●●"
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
                    v-model="form.firstName"
                    :placeholder="user.firstName"
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
                    v-model="form.lastName"
                    :placeholder="user.lastName"
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
                    required
                    v-model="form.middleName"
                    :placeholder="user.middleName"
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
                    type="email"
                    v-model="form.email"
                    :placeholder="user.email"
                  ></b-form-input>
                </b-col> </b-row
            ></b-list-group-item>
            <b-list-group-item>
              <b-row align-v="center" class="m-1">
                <b-col>
                  <label>Birthday: </label>
                </b-col>
                <b-col>
                  <b-input-group>
                    <b-form-input
                      v-model="form.birthday"
                      :placeholder="user.birthday"
                    ></b-form-input>
                    <b-input-group-append>
                      <b-form-datepicker
                        v-model="birthdayRaw"
                        button-only
                        right
                        @context="onContextBirthday"
                      ></b-form-datepicker>
                    </b-input-group-append>
                  </b-input-group>
                </b-col>
              </b-row>
            </b-list-group-item>
            <b-list-group-item>
              <b-row align-v="center" class="m-1">
                <b-col>
                  <label>Phone Number: </label>
                </b-col>
                <b-col>
                  <b-form-input
                    type="text"
                    v-model="form.phone"
                    :placeholder="user.phone"
                  ></b-form-input>
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
                    v-model="user.personalDiscount"
                  ></b-form-input>
                </b-col> </b-row
            ></b-list-group-item>
          </b-list-group>
          <b-list-group>
            <b-row align-v="center" class="m-1">
              <b-col></b-col>
              <b-col class="d-flex justify-content-end">
                <b-button @click="submitAccountChanges">Save</b-button>
              </b-col>
            </b-row>
          </b-list-group>
        </b-tab>
        <b-tab title="My Orders">
          <b-list-group v-if="userOrderList.length !== 0">
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
                <b-col>
                  <label></label>
                </b-col> </b-row
            ></b-list-group-item>
          </b-list-group>
          <b-list-group class="m-3">
            <b-list-group-item v-for="order in userOrderList" :key="order.id">
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
                  <label
                    >{{
                      order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "-"
                    }}
                  </label>
                </b-col>
                <b-col>
                  <label
                    >{{
                      order.completedAt
                        ? new Date(order.completedAt).toLocaleDateString()
                        : "-"
                    }}
                  </label>
                </b-col>
                <b-col>
                  <label>{{ getShopAddress(order.shopId) || "-" }} </label>
                </b-col>
                <b-col>
                  <label>{{ countOrderPrice(order) / 100 }} ₽</label>
                </b-col>
                <b-col>
                  <b-button @click="showOrderModal(order)"
                    ><b-icon-search></b-icon-search
                  ></b-button>
                </b-col> </b-row
            ></b-list-group-item>
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
                  <label></label>
                </b-col> </b-row
            ></b-list-group-item>
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
          <b-list-group class="m-3">
            <b-list-group-item
              v-for="company in userCompanyList"
              :key="company.id"
            >
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

    <b-modal v-model="isOrderModal" size="xl" hide-footer ok-variant="primary">
      <b-list-group class="m-3">
        <b-list-group-item variant="primary">
          <b-row align-v="center" class="m-1">
            <b-col class="text-left">
              <label>Name:</label>
            </b-col>
            <b-col class="text-center">
              <label>Price:</label>
            </b-col>
            <b-col class="text-center">
              <label>Quantity:</label>
            </b-col>
            <b-col class="text-right">
              <label>Total:</label>
            </b-col>
          </b-row>
        </b-list-group-item>
      </b-list-group>
      <b-list-group
        class="m-3"
        v-for="item in currOrder.itemList"
        :key="item.product.id"
      >
        <b-list-group-item>
          <b-row align-v="center" class="m-1">
            <b-col class="text-left">
              {{ item.product.name }}
            </b-col>
            <b-col class="text-center">
              {{ item.product.initialPrice / 100 }} ₽
            </b-col>
            <b-col class="text-center">
              {{ item.quantity }}
            </b-col>
            <b-col class="text-right">
              {{ (item.product.initialPrice * item.quantity) / 100 }} ₽
            </b-col>
          </b-row>
        </b-list-group-item>
      </b-list-group>
    </b-modal>
  </b-container>
</template>

<script>
// наверное стоит разбить табы на отдельные компоненты

// добавить время в даты completedAt и createdAt
import {
  BListGroup,
  BButton,
  BIconTrash,
  BIconPlus,
  BIconSearch,
  BListGroupItem,
  BCard,
  BTabs,
  BTab,
  BRow,
  BCol,
  BFormInput,
  BFormDatepicker,
  BInputGroup,
  BInputGroupAppend,
  BModal,
} from "bootstrap-vue";

import { validationMixin } from "vuelidate";
import { minLength, maxLength, email, alpha } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  components: {
    BListGroup,
    BButton,
    BIconTrash,
    BIconPlus,
    BIconSearch,
    BListGroupItem,
    BCard,
    BTabs,
    BTab,
    BRow,
    BCol,
    BFormInput,
    BFormDatepicker,
    BInputGroup,
    BInputGroupAppend,
    BModal,
  },
  computed: {
    // надо норм проверку на авторизацию сделать везде, чтобы в консоль ошибки не летели
    user() {
      return this.$store.getters["user/USER"] ?? {};
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
    const token = this.$cookies.get(process.env.VUE_APP_AUTH_COOKIE_NAME);
    if (!token) {
      this.$router.push("/login");
    }

    // мб юзера сохранять в локал сторэдж?
    Promise.all([
      this.$store.dispatch("user/GET_USER"),
      this.$store.dispatch("user/GET_USER_COMPANY_LIST"),
      this.$store.dispatch("user/GET_USER_ORDER_LIST"),
      this.$store.dispatch("company/GET_COMPANY_LIST"),
      this.$store.dispatch("orderStatus/GET_ORDER_STATUS_LIST"),
      this.$store.dispatch("shop/GET_SHOP_LIST"),
    ]);
  },
  data() {
    return {
      isOrderModal: false,
      currOrder: {},
      birthdayRaw: "",
      form: {
        password: "",
        firstName: "",
        lastName: "",
        middleName: "",
        email: "",
        birthday: "",
        phone: "",
      },
      // валидация пока не юзается, надо потом сделать
      validations: {
        form: {
          password: {
            minLength: minLength(4),
          },
          firstName: { alpha, minLength: minLength(1) },
          lastName: { alpha, minLength: minLength(1) },
          middleName: { alpha, minLength: minLength(1) },
          email: { email },
          birthday: {
            minValue(val) {
              return new Date(val) > new Date();
            },
            maxValue(val) {
              return new Date(val) > new Date();
            },
          },
          // сделать норм проверку телефона
          phone: {
            minLength: minLength(12),
            maxLength: maxLength(12),
          },
        },
      },
    };
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
    showOrderModal(order) {
      this.currOrder = order;
      this.isOrderModal = true;
    },
    closeOrderModal() {
      this.currOrder = {};
      this.isOrderModal = false;
    },
    formatDate(value) {
      const date = new Date(value);
      return date.toLocaleDateString();
    },
    onContextBirthday(context) {
      if (context.selectedDate) {
        const date = new Date(context.selectedDate);
        this.form.birthday = date.toLocaleDateString();
      } else {
        this.form.birthday = "";
      }
    },
    submitAccountChanges() {
      // потом чето сделаю
      // console.log();
    },
  },
};
</script>
