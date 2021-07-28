import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import FoodIndex from "@/views/foods/FoodIndex.vue";
import FoodCreate from "@/views/foods/FoodCreate.vue";
import FoodEdit from "@/views/foods/FoodEdit.vue";
import IngredientIndex from "@/views/ingredients/IngredientIndex.vue";
import IngredientCreate from "@/views/ingredients/IngredientCreate.vue";
import IngredientEdit from "@/views/ingredients/IngredientEdit.vue";
import MealIndex from "@/views/meals/MealIndex.vue";
import Weight from "@/views/Weight.vue";
import Goals from "@/views/Goals.vue";
import Settings from "@/views/Settings.vue";
import Macros from "@/views/Macros.vue";
import Profile from "@/views/Profile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/weight",
    name: "Weight",
    component: Weight,
  },
  {
    path: "/macros",
    name: "Macros",
    component: Macros,
  },
  {
    path: "/goals",
    name: "Goals",
    component: Goals,
  },
  {
    path: "/ingredients/new",
    name: "IngredientCreate",
    component: IngredientCreate
  },
  {
    path: "/ingredients/:ingredientId",
    name: "IngredientEdit",
    component: IngredientEdit
  },
  {
    path: "/ingredients",
    name: "IngredientIndex",
    component: IngredientIndex
  },
  {
    path: "/foods/new",
    name: "FoodCreate",
    component: FoodCreate
  },
  {
    path: "/foods/:foodId",
    name: "FoodEdit",
    component: FoodEdit
  },
  {
    path: "/foods",
    name: "FoodIndex",
    component: FoodIndex
  },
  {
    path: "/meals",
    name: "MealIndex",
    component: MealIndex
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
