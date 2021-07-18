import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const state = {
  user: { id: 5, username: "DamianS7", email: "damian@gmail.com", token: null},
  profile: {
    age: 27,
    lenght: 177,
    weights: {
      "01-01-2021": { weight: 61},
      "04-01-2021": { weight: 62},
      "07-01-2021": { weight: 63},
      "09-01-2021": { weight: 64},
      "11-01-2021": { weight: 65},
      "13-01-2021": { weight: 66},
      "14-01-2021": { weight: 67},
      "17-01-2021": { weight: 71},
      "21-01-2021": { weight: 77}
    },
  },
  foods: {
    0: {id: 0, name: "Pizza", ingredients:[
      { id:0, name: "cheese", proteins: 21, carbohydrates: 11, fat: 11 }
    ]}
  },
  diary: {
    0: { date: "01-01-2021", breakfast: [], dinner: []}
  },
  settings: {},
  isLogged: true,
  appReady: false
};

const mutations = {
  ADD_WEIGHT(state, obj) {
    Vue.set(state.profile.weights, obj.date, { weight: obj.weight });
  },
  DELETE_WEIGHT(state, weightDate) {
    Vue.delete(state.profile.weights, weightDate);
  },
};

const getters = {
  isLogged() {
    return state.isLogged;
  },
  getLastWeightDate() {
    const weights = getters.getWeights();
    const totalWeights = Object.keys(weights).length - 1;
    return Object.keys(weights)[totalWeights];
  },
  getLastWeight() {
    const date = getters.getLastWeightDate();
    return getters.getWeight(date);
  },
  getWeights() {
    return state.profile.weights;
  },
  getWeightsDates() {
    return Object.keys(state.profile.weights);
  },
  getWeight(date) {
    return state.profile.weights[date].weight;
  },
  getChartDataWeights() {
    const dates = Object.keys(getters.getWeights());
    const weights = [];

    dates.forEach(date => {
      weights.push(getters.getWeight(date));
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
  }
};

const actions = {
  async addWeight(context, weight) {
    context.commit("ADD_WEIGHT", weight);
  },
  async deleteWeight(context, weightDate) {
    context.commit("DELETE_WEIGHT", weightDate);
  }
};

export default new Vuex.Store({
  state, mutations, actions, getters
});
