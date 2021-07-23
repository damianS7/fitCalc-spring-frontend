import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Food from "@/views/foods/Food.vue";
import FoodIndex from "@/views/foods/FoodIndex.vue";
import Ingredient from "@/views/ingredients/Ingredient.vue";
import IngredientIndex from "@/views/ingredients/IngredientIndex.vue";
import MealIndex from "@/views/meals/MealIndex.vue";
import Weight from "@/views/Weight.vue";
import Goals from "@/views/Goals.vue";
import Settings from "@/views/Settings.vue";
import MacroStats from "@/views/MacroStats.vue";
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
    path: "/food-stats",
    name: "MacroStats",
    component: MacroStats,
  },
  {
    path: "/goals",
    name: "Goals",
    component: Goals,
  },
  {
    path: "/ingredients/:ingredientId",
    name: "Ingredient",
    component: Ingredient
  },
  {
    path: "/ingredients",
    name: "IngredientIndex",
    component: IngredientIndex
  },
  {
    path: "/foods/:foodId",
    name: "Food",
    component: Food
  },
  {
    path: "/foods",
    name: "FoodIndex",
    component: FoodIndex
  },
  {
    path: "/meals-record",
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
