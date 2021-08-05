import axios from "axios";
import Vue from "vue";
import { SERVER_URL } from "./constants.js";

const state = {
  // Registro de comidas diarias
  meals: {
    // Formato
    // "2021-7-28": { meal1: [1], meal2:[1], meal3: [1], meal4: [], meal5: [1] },
    // "2021-8-6": { meal1: [], meal5: [] },
  },
};

const getters = {
  getMealKeys: (state) => () => {
    return ["meal1", "meal2", "meal3", "meal4", "meal5"];
  },
  getMealName: (state) => (mealIndex) => {
    return state.settings.meals[mealIndex].name;
  },
  getMealsFromDate: (state, getters) => (date) => {
    let meals = state.meals[date];
    if (typeof meals === "undefined") {
      return { id: null, userId: null, date, meal1:[], meal2:[], meal3:[], meal4:[], meal5:[] };
    }

    return meals;
  },
  // Cuenta las calorias de una comida determinada (desayuno o almuerzo etc ...)
  mealKcal: (state, getters, rootState, rootGetters) => (meal) => {
    // Array con los id de las comidas
    if (!Array.isArray(meal)) {
      return 0;
    }
    
    let kcals = 0;
    meal.forEach((foodId) => {
      const food = rootGetters["food/getFood"](foodId);
      // Si no se encuentra la comida buscada
      if (typeof food === "undefined") {
        // pasamos a la siguiente
        return;
      }
      kcals += rootGetters["food/foodKcals"](food);
    });

    return kcals;
  },
  // Devuelve las kcal de las 5 comidas del dia (desayuno, comida ...)
  mealsKcal: (state, getters, rootState, rootGetters) => (date) => {
    const meals = getters.getMealsFromDate(date);
    let kcals = 0;

    Object.keys(meals).forEach((mealKey) => {
      kcals += getters.mealKcal(meals[mealKey]);
    });

    return kcals;
  },
};

const mutations = {
  SET_MEALS(state, meals) {
    Vue.set(state, "meals", meals);
  },
  SET_MEAL(state, meal) {
    Vue.set(state.meals, meal.date, meal);
  },
};

const actions = {
  async updateMeal({ commit }, meal) {
    return await axios
      .post(SERVER_URL + "/api/v1/user/meal", meal)
      .then(function (response) {
        // Si el request tuvo exito (codigo 200)
        if (response.status == 200) {
          commit("SET_MEAL", response.data);
        }
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true,
};
