import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const state = {
  user: { id: null, username: null, email: null, token: null},
  foods: {},
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
  }
};

export default new Vuex.Store({
  state, mutations, actions, getters
});
