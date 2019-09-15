import List from "@/views/Errors/List";
import Detail from "@/views/Errors/Detail";

export default [
  {
    path: "/",
    name: "home",
    component: List
  },
  {
    path: "/detail",
    name: "error-detail",
    component: Detail
  }
];
