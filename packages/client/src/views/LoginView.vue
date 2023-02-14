<template>
  <div>
    <b-modal
      align-v="center"
      v-model="modalShow"
      no-close-on-backdrop
      no-close-on-esc
      style="max-width: 35rem; min-width: 35rem"
    >
      <template #modal-header>
        <div style="max-width: 30rem; min-width: 30rem">
          <b-row class="m-1">
            <b-col>
              <h3>Welcome!</h3>
            </b-col>
          </b-row>
        </div>
      </template>
      <b-row class="m-1">
        <b-col>
          <b-form-input v-model="login" placeholder="Login"></b-form-input>
        </b-col>
      </b-row>

      <b-row class="m-1">
        <b-col>
          <b-form-input
            v-model="password"
            type="password"
            placeholder="Password"
          ></b-form-input>
        </b-col>
      </b-row>

      <template #modal-footer>
        <div style="width: 100%">
          <b-row class="m-1">
            <b-col>
              <span v-if="errorMessage" class="text-danger">
                {{ errorMessage }}</span
              >
            </b-col>
          </b-row>
          <b-row class="m-1">
            <b-col>
              <b-button @click="authorize" size="sm" variant="primary">
                Confirm
              </b-button>
            </b-col>
          </b-row>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { BFormInput, BRow, BCol, BModal } from "bootstrap-vue";

export default {
  components: {
    BFormInput,
    BRow,
    BCol,
    BModal,
  },
  computed: {
    errorMessage() {
      return this.$store.getters["user/USER_ERROR"];
    },
  },
  data() {
    return {
      modalShow: true,
      login: "",
      password: "",
    };
  },
  methods: {
    authorize() {
      if (this.login === "" || this.password == "") {
        // сделать норм валидацию
        this.$store.commit("user/SET_USER_ERROR", "Empty fields");
        return;
      }
      this.$store.dispatch("user/AUTHORIZE_USER", {
        login: this.login,
        password: this.password,
      });
      const token = this.$store.getters["user/USER_TOKEN"];

      // const token = this.$cookies.get(process.env.VUE_APP_AUTH_COOKIE_NAME);
      if (token) {
        this.$cookies.set(process.env.VUE_APP_AUTH_COOKIE_NAME, token);
        this.$router.push("/account");
      }
    },
  },
};
</script>
