import FormPasswordReset from "@/views/User/PasswordReset/Form";
import FormLogin from "@/views/User/Login/Form";
import FormRegister from "@/views/User/Register/Form";

export default [
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
];
