import axios from "axios";
import Vue from "vue";
import { SERVER_URL } from "./constants.js";

const state = {
  // Formato
  // "2021-7-28": { weight: 71 },
};

const mutations = {
  SET_WEIGHTS(state, weights) {
    Object.assign(state, weights);
  },
  // Agrega un peso al historial
  ADD_WEIGHT(state, weight) {
    Vue.set(state, weight.date, weight);
  },
  // Borra un peso de una fecha especificada
  DELETE_WEIGHT(state, date) {
    Vue.delete(state, date);
  },
};

const getters = {
  getLastWeightDate: (state, getters) => () => {
    const weights = getters.getWeights();
    const totalWeights = Object.keys(weights).length - 1;
    return Object.keys(weights)[totalWeights];
  },
  getLastWeight: (state, getters) => () => {
    const date = getters.getLastWeightDate();
    return getters.getWeight(date);
  },
  getWeights: (state) => () => {
    return state;
  },
  getWeightsDates: (state) => () => {
    return Object.keys(state);
  },
  getWeight: (state) => (date) => {
    const weight = state[date];
    if (typeof weight !== "undefined") {
      return state[date].weight;
    }
    return 0;
  },
  getChartDataWeights: (state, getters) => () => {
    // const dates = Object.keys(getters.getWeights());
    let sortedWeighs = Object.values(getters.getWeights()).sort(function (weightA, weightB) {
      const dateA = new Date(weightA.date);
      const dateB = new Date(weightB.date);

      return dateA - dateB;
    });
    let weights = [];
    let dates = [];

    sortedWeighs.forEach((weight) => {
      dates.push(weight.date);
      weights.push(weight.weight);
    });

    return {
      labels: dates,
      datasets: [
        {
          label: "Peso (kg)",
          backgroundColor: "#6495ED",
          data: weights,
        },
      ],
    };
  },
};

const actions = {
  async addWeight({ commit, getters, rootGetters }, weight) {
    const date = rootGetters["app/dateToString"](new Date());
    return await axios
      .post(SERVER_URL + "/api/v1/user/weight", { date, weight })
      .then(function (response) {
        // Si el request tuvo exito (codigo 200)
        if (response.status == 200) {
          commit("ADD_WEIGHT", response.data);
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
