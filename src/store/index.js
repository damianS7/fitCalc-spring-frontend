import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import app from "./app";
import food from "./food";
import profile from "./profile";
import setting from "./setting";
import meal from "./meal";
import ingredient from "./ingredient";
import weight from "./weight";
import goal from "./goal";

Vue.use(Vuex);

const modules = {
  app, user, profile, ingredient, food, meal, setting, weight, goal
};

export default new Vuex.Store({
  modules
});
