<template>
  <div>
    <b-card no-body class="m-3">
      <b-tabs card>
        <b-tab
          title="Orders"
          content-class="m-3"
          v-if="orderList.length !== 0"
          no-body
          class="m-3"
        >
          <b-list-group class="m-3">
            <b-list-group-item variant="primary">
              <b-row align-v="center" class="m-1">
                <b-col>
                  <label> Order №: </label>
                </b-col>
                <b-col>
                  <label> Name: </label>
                </b-col>
                <b-col>
                  <label> Phone: </label>
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
            <b-list-group-item v-for="order in orderList" :key="order.id">
              <b-row align-v="center" class="m-1">
                <b-col>
                  <label>{{ order.id }} </label>
                </b-col>
                <b-col>
                  <label>{{ getUser(order.userId)?.firstName || "-" }} </label>
                </b-col>
                <b-col>
                  <label>{{ getUser(order.userId)?.phone || "-" }} </label>
                </b-col>
                <b-col>
                  <b-form-group>
                    <b-form-select
                      v-model="order.statusId"
                      @change="changeOrderStatus(order)"
                    >
                      <b-form-select-option
                        v-for="orderStatus in orderStatusList"
                        :key="orderStatus.id"
                        :value="orderStatus.id"
                        >{{ orderStatus.name }}</b-form-select-option
                      >
                    </b-form-select>
                  </b-form-group>
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
        </b-tab>
      </b-tabs>
    </b-card>
    <p v-if="orderList.length === 0">Oops! No orders available</p>
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
  </div>
</template>

<script>
import {
  BListGroup,
  BButton,
  BIconSearch,
  BListGroupItem,
  BRow,
  BCol,
  BFormInput,
  BModal,
  BTabs,
  BTab,
  BCard,
} from "bootstrap-vue";

export default {
  components: {
    BListGroup,
    BButton,
    BIconSearch,
    BListGroupItem,
    BRow,
    BCol,
    // BFormInput,
    BModal,
    BTabs,
    BTab,
    BCard,
  },
  computed: {
    orderList() {
      return this.$store.getters["order/ORDER_LIST"];
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
    userList() {
      return this.$store.getters["user/USER_LIST"];
    },
  },
  mounted() {
    Promise.all([
      this.$store.dispatch("order/GET_ORDER_LIST"),
      this.$store.dispatch("company/GET_COMPANY_LIST"),
      this.$store.dispatch("orderStatus/GET_ORDER_STATUS_LIST"),
      this.$store.dispatch("shop/GET_SHOP_LIST"),
      this.$store.dispatch("user/GET_USER_LIST"),
    ]);
  },
  data() {
    return {
      currOrder: {},
      isOrderModal: false,
    };
  },
  methods: {
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
    showOrderModal(order) {
      this.currOrder = order;
      this.isOrderModal = true;
    },
    closeOrderModal() {
      this.currOrder = {};
      this.isOrderModal = false;
    },
    getUser(id) {
      return this.userList.find((user) => user.id === id);
    },
    changeOrderStatus(order) {
      const orderStatusId = Number(event.target.value);
      let completedAt;
      if (orderStatusId === 6 || orderStatusId === 7) {
        completedAt = new Date(Date.now()).toISOString();
      } else {
        completedAt = null;
      }

      const orderNew = {
        id: order.id,
        userId: order.userId,
        companyId: order.companyId,
        statusId: orderStatusId,
        createdAt: order.createdAt,
        completedAt: completedAt,
        shopId: order.shopId,
        itemList: order.itemList,
      };
      this.$store.dispatch("order/UPDATE_ORDER", orderNew);
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
