import axios from "axios";
import Vue from "vue";
import { SERVER_URL } from "./constants.js";

const state = {
  // Datos personales
    // Edad del usuario
    age: 0,

    // Altura en cm
    height: 0,

    avatarPath: ''
};

const mutations = {
  SET_PROFILE(state, profile) {
    // Object.assign(state, profile);
    Vue.set(state, "age", profile.age);
    Vue.set(state, "height", profile.height);
  },
  UPDATE_PROFILE(state, { key, value }) {
    Vue.set(state, key, value);
  },
};

const getters = {
  getAge: (state) => () => {
    if (typeof state.age !== "undefined") {
      return state.age;
    }
    return 0;
  },
  getHeight: (state) => () => {
    if (typeof state.height !== "undefined") {
      return state.height;
    }
    return 0;
  },
};

const actions = {
  async updateProfile({ commit, rootGetters }, payload) {
    return await axios
      .put(SERVER_URL + "/api/v1/users/profile", payload)
      .then(function (response) {
        // Si el request tuvo exito (codigo 200)
        if (response.status == 200) {
          commit("UPDATE_PROFILE", { key: "age", value: response.data.age });
          commit("UPDATE_PROFILE", { key: "height", value: response.data.height });
        }
        return response.status;
      })
      .catch(function (response) {
        return response.status;
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
