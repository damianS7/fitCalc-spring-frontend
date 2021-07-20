import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Food from "@/views/food/Food.vue";
import FoodList from "@/views/food/FoodList.vue";
import Ingredient from "@/views/ingredients/Ingredient.vue";
import IngredientList from "@/views/ingredients/IngredientList.vue";
import MealRecords from "@/views/MealRecords.vue";
import Weight from "@/views/Weight.vue";
import Goals from "@/views/Goals.vue";
import MacroStats from "@/views/MacroStats.vue";
import Profile from "@/views/profile/Profile.vue";

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
    name: "IngredientList",
    component: IngredientList
  },
  {
    path: "/foods/:foodId",
    name: "Food",
    component: Food
  },
  {
    path: "/foods",
    name: "FoodList",
    component: FoodList
  },
  {
    path: "/meal-records",
    name: "MealRecords",
    component: MealRecords
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
