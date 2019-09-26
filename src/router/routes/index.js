import PasswordReset from "@/views/Auth/PasswordReset/Form";
import Login from "@/views/Auth/Login/Form";
import Register from "@/views/Auth/Register/Form";
import Logs from "@/views/Logs/List";
import LogsDetail from "@/views/Logs/Detail";
import Triggers from "@/views/Triggers/List";

export default [
  {
    path: '*',
    redirect: '/login'
  },  
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: "/password-reset",
    name: "password-reset",
    component: PasswordReset
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/logs",
    name: "logs-list",
    component: Logs
  },
  {
    path: "/logs/:id",
    props: true,
    name: "logs-detail",
    component: LogsDetail
  },
  {
    path: "/triggers",
    name: "triggers",
    component: Triggers
  }
]
