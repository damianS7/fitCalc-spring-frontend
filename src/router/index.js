import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Food from "@/views/food/Food.vue";
import FoodList from "@/views/food/FoodList.vue";
import FoodRecord from "@/views/FoodRecord.vue";
import Profile from "@/views/profile/Profile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/food/:foodId",
    name: "Food",
    component: Food
  },
  {
    path: "/food",
    name: "FoodList",
    component: FoodList
  },
  {
    path: "/food-record",
    name: "FoodRecord",
    component: FoodRecord
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
