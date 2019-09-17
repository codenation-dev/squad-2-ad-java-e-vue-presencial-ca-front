import List from "@/views/Error/List";
import Detail from "@/views/Error/Detail";

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
