import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import FoodIndex from "@/views/foods/FoodIndex.vue";
import Food from "@/views/foods/Food.vue";
import IngredientIndex from "@/views/ingredients/IngredientIndex.vue";
import IngredientCreate from "@/views/ingredients/Ingredient.vue";
import IngredientEdit from "@/views/ingredients/Ingredient.vue";
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
    name: "SEGUIMIENTO",
    component: Weight,
  },
  {
    path: "/macros",
    name: "MACROS",
    component: Macros,
  },
  {
    path: "/goals",
    name: "OBJETIVOS",
    component: Goals,
  },
  {
    path: "/ingredients/new",
    name: "NUEVO INGREDIENTE",
    component: IngredientCreate
  },
  {
    path: "/ingredients/:ingredientId",
    name: "EDITAR INGREDIENTE",
    component: IngredientEdit
  },
  {
    path: "/ingredients",
    name: "INGREDIENTES",
    component: IngredientIndex
  },
  {
    path: "/foods/new",
    name: "CREAR COMIDA",
    component: Food
  },
  {
    path: "/foods/:foodId",
    name: "EDITAR COMIDA",
    component: Food
  },
  {
    path: "/foods",
    name: "COMIDAS",
    component: FoodIndex
  },
  {
    path: "/meals",
    name: "DIARIO COMIDAS",
    component: MealIndex
  },
  {
    path: "/profile",
    name: "PERFIL",
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
