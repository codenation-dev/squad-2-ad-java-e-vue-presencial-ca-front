import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import error from "@/store/error";
import user from "@/store/user";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    new VuexPersistence({ storage: global.localStorage, key: "state" }).plugin
  ],
  modules: { error, user }
});
