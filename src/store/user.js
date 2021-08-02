import axios from "axios";
import Vue from "vue";
import { SERVER_URL } from "./constants.js";

const state = {
  // Datos del usuario logeado en la aplicacion
  id: null, username: null, email: null, token: null
};

const mutations = {
  SET_USER(state, user) {
    Vue.set(state, "id", user.id);
    Vue.set(state, "username", user.username);
    Vue.set(state, "email", user.email);
    Vue.set(state, "token", user.token);
  },
  SET_TOKEN(state, token) {
    Vue.set(state, "token", token);
  },
  SET_LOGIN_DETAILS(state, { username, email }) {
    Vue.set(state, "username", username);
    Vue.set(state, "email", email);
  },
};

const getters = {
  isLogged: (state) => () => {
    if (state.token !== null) {
      return true;
    }
    return false;
  },
  getToken: (state) => () => {
    return state.token;
  },
};

const actions = {
  async login({ commit }, { username, password }) {
    return await axios
      .post(SERVER_URL + "/api/users/login", { username, password })
      .then(function (response) {
        if(response.status == 200) {
          let user = {
            id: response.data.id,
            username: response.data.username,
            email: response.data.email,
            token: response.data.token,
          };
          commit("SET_USER", response.data);
        }
        return response;
      })
      .catch(function (error) {
        // Si no se puede alcanzar el servidor ...
        // Ponemos el codigo y mensaje nosotros ya que si no estara vacio.
        if (typeof error.response === "undefined") {
          return {
            status: -1,
            data: "Network error",
          };
        }
        return error.response;
      });
  },
  async register({ commit }, { username, password, email }) {
    let data = { username: username, password: password, email: email };
    return await axios
      .post(SERVER_URL + "/api/users/registration", data)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
  },
  async updateLoginDetails({ commit }, details) {
    return await axios
      .put(SERVER_URL + "/api/v1/users", details)
      .then(function (response) {
        // Si el request tuvo exito (codigo 200)
        if (response.status == 200) {
          commit("SET_LOGIN_DETAILS", response.data);
        }
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
  },
  async logout({ commit }) {
    commit("SET_TOKEN", null);
    commit("app/SET_READY", false, { root: true });
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true,
};
