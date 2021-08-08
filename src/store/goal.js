import axios from "axios";
import Vue from "vue";
import { SERVER_URL } from "./constants.js";

const state = {
  goals: {
    // Objetivos del usuario (kcal) y distribucion de sus macros
    kcal: 0,
    proteins: 0,
    fats: 0,
    carbohydrates: 0,

  }
};

const mutations = {
  SET_GOALS(state, goals) {
    Vue.set(state, "goals", goals);
  },
  UPDATE_GOALS(state, goals) {
    Vue.set(state, "goals", goals);
  },
};

const getters = {
  getGoals() {
    return state.goals;
  },
  getGoal: (state) => (goalName) => {
    return state.goals[goalName];
  },
};

const actions = {
  async updateGoals({ commit, rootGetters }, goal) {
    return await axios
      .put(SERVER_URL + "/api/v1/user/goal", goal)
      .then(function (response) {
        // Si el request tuvo exito (codigo 200)
        if (response.status == 200) {
          commit("UPDATE_GOALS", response.data);
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
