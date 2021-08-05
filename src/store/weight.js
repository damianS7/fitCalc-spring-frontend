import axios from "axios";
import Vue from "vue";
import { SERVER_URL } from "./constants.js";

const state = {
  weights: {
    // Formato
    // "2021-7-28": { weight: 71 },
  },
};

const getters = {
  getLastWeightDate: (state, getters) => () => {
    const weights = getters.sortedWeights();
    const lastIndex = weights.length - 1;
    return weights[lastIndex].date;
  },
  getLastWeight: (state, getters) => () => {
    const date = getters.getLastWeightDate();
    return getters.getWeight(date);
  },
  getWeights: (state) => () => {
    return state.weights;
  },
  getWeightsDates: (state, getters) => () => {
    return Object.keys(getters.getWeights());
  },
  getWeight: (state) => (date) => {
    const weight = state.weights[date];
    if (typeof weight !== "undefined") {
      return state.weights[date].weight;
    }
    return 0;
  },
  sortedWeights: (state, getters) => () => {
    let sortedWeights = Object.values(getters.getWeights()).sort(function (weightA, weightB) {
      const dateA = new Date(weightA.date);
      const dateB = new Date(weightB.date);
      return dateA - dateB;
    });
    return sortedWeights;
  },
  chartData: (state, getters) => () => {
    const sortedWeights = getters.sortedWeights();
    let weights = [];
    let dates = [];

    sortedWeights.forEach((weight) => {
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
      options: {
        parsing: {
          xAxisKey: "weight",
          yAxisKey: "date",
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
      },
    };
  },
};

const mutations = {
  SET_WEIGHTS(state, weights) {
    Vue.set(state, "weights", weights);
  },
  // Agrega un peso al historial
  ADD_WEIGHT(state, weight) {
    Vue.set(state.weights, weight.date, weight);
  },
  // Borra un peso de una fecha especificada
  DELETE_WEIGHT(state, date) {
    Vue.delete(state.weights, date);
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
