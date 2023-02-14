<template>
  <div>
    <b-card class="m-3" v-if="shopList.length !== 0">
      <b-list-group class="mb-3">
        <b-list-group-item variant="primary">
          <b-row align-v="center" class="m-1" cols="1" cols-sm="3">
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
        <b-list-group-item v-for="shop in shopList" :key="shop.id">
          <b-row align-v="center" class="m-1" cols="1" cols-sm="3">
            <b-col>
              <label>{{ shop.address || "-" }} </label>
            </b-col>
            <b-col>
              <label>
                {{ shop.workingHours.from }}.00 - {{ shop.workingHours.to }}.00
              </label>
            </b-col>
            <b-col>
              <label>{{ shop.phone || "-" }} </label>
            </b-col>
          </b-row>
        </b-list-group-item>
      </b-list-group>
    </b-card>
    <p v-if="shopList.length === 0">Oops! No shops available</p>
  </div>
</template>

<script>
import { BListGroup, BListGroupItem, BRow, BCol, BCard } from "bootstrap-vue";

export default {
  components: {
    BListGroup,
    BListGroupItem,
    BRow,
    BCol,
    BCard,
  },
  computed: {
    shopList() {
      return this.$store.getters["shop/SHOP_LIST"];
    },
  },
  mounted() {
    Promise.all([this.$store.dispatch("shop/GET_SHOP_LIST")]);
  },
  data() {
    return {};
  },
  methods: {
    // добавить сортировку рабочий часов по дням недели (пока не успеваю)
  },
};
</script>
