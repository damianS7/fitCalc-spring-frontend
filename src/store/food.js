import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import { SERVER_URL } from "./constants.js";

const state = {
  // Comidas formadas a partir de los ingredientes
  foods: {
    // Formato 0: {id:1, name: "Piza 4 Quesos", ingredients: [1, 1, 1, 1]}
  },
};

const mutations = {
  SET_FOODS(state, foods) {
    Vue.set(state, "foods", foods);
    // Object.assing
  },
  ADD_FOOD(state, food) {
    Vue.set(state.foods, food.id, food);
  },
  UPDATE_FOOD(state, food) {
    Vue.set(state.foods, food.id, food);
  },
  DELETE_FOOD(state, foodId) {
    Vue.delete(state.foods, foodId);
  },
  ADD_INGREDIENT_TO_FOOD(state, payload) {
    state.foods[payload.foodId].ingredients.push(payload.ingredientId);
  },
  REMOVE_INGREDIENT_FROM_FOOD(state, payload) {
    state.foods[payload.foodId].ingredients.pop(payload.ingredientId);
  },
};
const getters = {
  getFood: (state) => (foodId) => {
    return state.foods[foodId];
  },
  getFoods: (state) => () => {
    return Object.values(state.foods);
  },
  foodKcals: (state, getters, rootState, rootGetters) => (food) => {
    // Si meals contiene un ID de comida que fue eliminado ...
    if (typeof food === "undefined") {
      return 0;
    }

    let kcals = 0;
    food.ingredients.forEach((id) => {
      // const ingredient = this.store.getters['ingredients/getIngredient'](id);
      const ingredient = rootGetters["ingredient/getIngredient"](id);
      kcals += rootGetters['ingredient/ingredientKcals'](ingredient);
    });
    return kcals;
  },
};
const actions = {
  async addFood( { commit }, food) {
    return await axios
      .post(SERVER_URL + "/api/v1/foods", food)
      .then(function (response) {
        // Si el request tuvo exito (codigo 200)
        if (response.status == 200) {
          // response.data.kcals = context.getters.ingredientKcals(response.data);
          commit("ADD_FOOD", response.data);
        }
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
  },
  async updateFood({ commit }, food) {
    return await axios
      .put(SERVER_URL + "/api/v1/foods/" + food.id, food)
      .then(function (response) {
        // Si el request tuvo exito (codigo 200)
        if (response.status == 200) {
          // response.data.kcals = context.getters.ingredientKcals(response.data);
          commit("UPDATE_FOOD", response.data);
        }
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
  },
  async deleteFood({ commit }, foodId) {
    return await axios
      .delete(SERVER_URL + "/api/v1/foods/" + foodId)
      .then(function (response) {
        // Si el request tuvo exito (codigo 200)
        if (response.status == 200) {
          commit("DELETE_FOOD", response.data.id);
        }
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
  },
  async addIngredientToFood(context, payload) {
    context.commit("ADD_INGREDIENT_TO_FOOD", payload);
  },
  async removeIngredientFromFood(context, payload) {
    context.commit("REMOVE_INGREDIENT_FROM_FOOD", payload);
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true,
};
