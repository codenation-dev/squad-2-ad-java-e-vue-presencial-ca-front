import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import axios from "axios";
import interceptor from "@/utils/interceptor";

import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";

axios.interceptors.request.use(interceptor);

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
