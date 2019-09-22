import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import axios from "axios";
import interceptor from "@/utils/interceptor";

import vuetify from "./plugins/vuetify";

import Vuelidate from "vuelidate";

import { Table, Select, Field } from "buefy";
import "buefy/dist/buefy.css";

Vue.use(Table);
Vue.use(Select);
Vue.use(Field);

Vue.use(Vuelidate);

axios.interceptors.request.use(interceptor);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,

  render: function(h) {
    return h(App);
  }
}).$mount("#app");
