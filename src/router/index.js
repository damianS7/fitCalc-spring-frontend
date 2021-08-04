import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Food from "@/views/foods/Food.vue";
import Foods from "@/views/foods/Foods.vue";
import Ingredient from "@/views/ingredients/Ingredient.vue";
import Ingredients from "@/views/ingredients/Ingredients.vue";
import MealsRecord from "@/views/meals/MealsRecord.vue";
import Weight from "@/views/Weight.vue";
import Settings from "@/views/Settings.vue";
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
    path: "/ingredients/new",
    name: "NUEVO INGREDIENTE",
    component: Ingredient
  },
  {
    path: "/ingredients/:ingredientId",
    name: "EDITAR INGREDIENTE",
    component: Ingredient
  },
  {
    path: "/ingredients",
    name: "INGREDIENTES",
    component: Ingredients
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
    component: Foods
  },
  {
    path: "/meals",
    name: "DIARIO COMIDAS",
    component: MealsRecord
  
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
