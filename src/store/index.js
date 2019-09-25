import Vue from "vue";
import Vuex from "vuex";

import application from './modules/application'
import authentication from './modules/authentication'

Vue.use(Vuex);

const modules = {
  application,
  authentication
}

export default new Vuex.Store({
  namespace: true,
  modules
});
