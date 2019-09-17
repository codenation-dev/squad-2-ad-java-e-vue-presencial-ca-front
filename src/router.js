import Vue from "vue";
import Router from "vue-router";

import UserRoutes from "@/routes/user";
import ErrorRoutes from "@/routes/error";

Vue.use(Router);

let routes = UserRoutes.concat(ErrorRoutes);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
