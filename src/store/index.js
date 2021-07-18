import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const state = {
  user: { id: 5, username: "DamianS7", email: "damian@gmail.com", token: null},
  profile: {
    age: 27,
    lenght: 177,
    weights: [
      { weight: 62, date: "01-01-2021" },
      { weight: 66, date: "03-01-2021" },
      { weight: 64, date: "06-01-2021" },
      { weight: 66, date: "07-01-2021" },
      { weight: 71, date: "12-01-2021" },
      { weight: 72, date: "13-01-2021" },
      { weight: 75, date: "18-01-2021" },
      { weight: 77, date: "21-01-2021" },
      { weight: 80, date: "23-01-2021" },
      { weight: 78, date: "24-01-2021" },
      { weight: 77, date: "25-01-2021" },
      { weight: 72, date: "28-01-2021" },
    ]
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
  ADD_WEIGHT(state, weight) {
    state.profile.weights.push(weight);
  },
  DELETE_WEIGHT(state, weightDate) {
    state.profile.weights.forEach((obj, index) => {
      if(obj.date == weightDate) {
        Vue.delete(state.profile.weights, index);
      }
    });
  },
};

const actions = {
  async addWeight(context, weight) {
    context.commit("ADD_WEIGHT", weight);
  },
  async deleteWeight(context, weightDate) {
    context.commit("DELETE_WEIGHT", weightDate);
  }
};

const getters = {
  isLogged() {
    return state.isLogged;
  },
  getLastWeight() {
    return 66;
  },
  getWeights() {
    return state.profile.weights;
  }
};

export default new Vuex.Store({
  state, mutations, actions, getters
});
