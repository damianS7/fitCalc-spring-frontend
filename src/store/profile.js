import axios from "axios";
import Vue from "vue";
import { SERVER_URL } from "./constants.js";

const state = {
    // Datos personales
    profile: {
      // Edad del usuario
      age: 0,
  
      // Altura en cm
      height: 0,
  
      avatarPath: ''
    }
};

const mutations = {
  SET_PROFILE(state, profile) {
    // Object.assign(state, profile);
    Vue.set(state, "profile", profile);
  },
  UPDATE_PROFILE(state, { key, value }) {
    Vue.set(state.profile, key, value);
  },
};

const getters = {
  getProfile() {
    return state.profile;
  }
};

const actions = {
  async updateProfile({ commit }, payload) {
    return await axios
      .put(SERVER_URL + "/api/v1/user/profile", payload)
      .then(function (response) {
        // Si el request tuvo exito (codigo 200)
        if (response.status == 200) {
          commit("UPDATE_PROFILE", { key: "age", value: response.data.age });
          commit("UPDATE_PROFILE", { key: "height", value: response.data.height });
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
