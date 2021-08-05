import axios from "axios";
import Vue from "vue";
import { SERVER_URL } from "./constants.js";

const state = {
  // Opciones de configuracion
  settings: {
    // meal1: "desayuno"
  }
};

const getters = {
  getSetting: (state) => (settingName) => {
    return state.settings[settingName];
  },
  getSettings: (state) => () => {
    return state.settings;
  },
};

const mutations = {
  SET_SETTINGS(state, settings) {
    Vue.set(state, "settings", settings);
  },  
  SET_SETTING(state, setting) {
    Vue.set(state.settings, setting.key, setting.value);
  },
};

const actions = {
  async updateSetting({ commit }, setting) {
    return await axios
      .put(SERVER_URL + "/api/v1/user/setting/" + setting.key, setting)
      .then(function (response) {
        if(response.status == 200) {
          commit("SET_SETTING", response.data);
        }
        return response;
      }).catch( (error) => {
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
  