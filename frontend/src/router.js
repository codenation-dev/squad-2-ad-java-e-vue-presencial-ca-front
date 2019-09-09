import Vue from "vue";
import Router from "vue-router";

import List from "@/views/Errors/List";

import FormLogin from "@/views/User/Login/Form";
import FormRegister from "@/views/User/Register/Form";
import FormPasswordReset from "@/views/User/PasswordReset/Form";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: List
    },
    {
      path: "/password",
      name: "pass-reset",
      component: FormPasswordReset
    },
    {
      path: "/login",
      name: "login",
      component: FormLogin
    },
    {
      path: "/register",
      name: "register",
      component: FormRegister
    }
  ]
});
