import FormPasswordReset from "@/views/Users/PasswordReset/Form";
import FormLogin from "@/views/Users/Login/Form";
import FormRegister from "@/views/Users/Register/Form";
import LogsList from "@/views/Logs/List";
import LogsDetail from "@/views/Logs/Detail";
import TriggersList from "@/views/Triggers/List";

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
  },
  {
    path: "/logs",
    name: "logs-list",
    component: LogsList
  },
  {
    path: "/logs/:id/detail",
    props: true,
    name: "logs-detail",
    component: LogsDetail
  },
  {
    path: "/triggers",
    name: "triggers",
    component: TriggersList
  }
]
