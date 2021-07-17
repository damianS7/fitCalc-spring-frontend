import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const state = {
  user: { id: 5, username: "DamianS7", email: "damian@gmail.com", token: null},
  profile: {
    age: 27,
    size: 177,
    weights: [
      {weight: 62, date: '01-01-2021'},
      {weight: 66, date: '01-02-2021'},
      {weight: 64, date: '01-03-2021'}
    ]
  },
  foods: {
    0: {id: 0, name: 'Pizza', ingredients:[
      { id:0, name: 'cheese', proteins: 21, carbohydrates: 11, fat: 11 }
    ]}
  },
  diary: {
    0: { date: '01-01-2021', breakfast: [], dinner: []}
  },
  settings: {},
  isLogged: true,
  appReady: false
};

const mutations = {

};

const actions = {

};

const getters = {
  isLogged() {
    return state.isLogged;
  },
  getLastWeight() {
    return 66;
  }
};

export default new Vuex.Store({
  state, mutations, actions, getters
});
