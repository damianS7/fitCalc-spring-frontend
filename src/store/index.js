import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import app from "./app";
import foods from "./foods";
import profile from "./profile";
import settings from "./settings";
import meals from "./meals";
import ingredients from "./ingredients";
import weights from "./weights";
import goals from "./goals";

Vue.use(Vuex);

const modules = {
  app, user, profile, ingredients, foods, meals, settings, weights, goals
};

export default new Vuex.Store({
  modules
});
