import axios from "axios";
import Vue from "vue";
import { SERVER_URL, FATS_MULTIPLIER, PROTEINS_MULTIPLIER, CARBOHYDRATES_MULTIPLIER } from "./constants.js";

const state = {
  // Ingredientes disponibles en la app
  ingredients: {
    // Formato 0: {id:1, name: "Tomate", proteins:5, fats: 5, carbohydrates:8}
  },
};

const getters = {
  getIngredient: (state) => (ingredientId) => {
    return state.ingredients[ingredientId];
  },
  getIngredients: (state) => () => {
    return Object.values(state.ingredients);
  },
  ingredientKcals: () => (ingredient) => {
    if (typeof ingredient === "undefined") {
      return 0;
    }

    let kcals = 0;
    kcals += ingredient.fats * FATS_MULTIPLIER;
    kcals += ingredient.proteins * PROTEINS_MULTIPLIER;
    kcals += ingredient.carbohydrates * CARBOHYDRATES_MULTIPLIER;
    return kcals;
  },
};

const mutations = {
  SET_INGREDIENTS(state, ingredients) {
    Vue.set(state, "ingredients", ingredients);
  },
  ADD_INGREDIENT(state, ingredient) {
    Vue.set(state.ingredients, ingredient.id, ingredient);
  },
  UPDATE_INGREDIENT(state, ingredient) {
    Vue.set(state.ingredients, ingredient.id, ingredient);
  },
  DELETE_INGREDIENT(state, ingredientId) {
    Vue.delete(state.ingredients, ingredientId);
  },
};

const actions = {
  async addIngredient({ commit, getters }, ingredient) {
    return await axios
      .post(SERVER_URL + "/api/v1/ingredients", ingredient)
      .then(function (response) {
        // Si el request tuvo exito (codigo 200)
        if (response.status == 200) {
          response.data.kcals = getters.ingredientKcals(response.data);
          commit("ADD_INGREDIENT", response.data);
        }
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
  },
  async updateIngredient({ commit, getters }, ingredient) {
    return await axios
      .put(SERVER_URL + "/api/v1/ingredients/" + ingredient.id, ingredient)
      .then(function (response) {
        // Si el request tuvo exito (codigo 200)
        if (response.status == 200) {
          response.data.kcals = getters.ingredientKcals(response.data);
          commit("UPDATE_INGREDIENT", response.data);
        }
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
  },
  async deleteIngredient({ commit }, ingredientId) {
    return await axios
      .delete(SERVER_URL + "/api/v1/ingredients/" + ingredientId)
      .then(function (response) {
        // Si el request tuvo exito (codigo 200)
        if (response.status == 200) {
          commit("DELETE_INGREDIENT", response.data.id);
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
