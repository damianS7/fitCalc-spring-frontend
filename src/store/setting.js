import axios from "axios";
import Vue from "vue";
import { SERVER_URL } from "./constants.js";

const state = {
  // Opciones de configuracion
  settings: {
    // meals: { meal1: { name: "desayuno" } },

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
    // Object.assign(state, settings);
    Vue.set(state, "settings", settings);
  },
  
  SET_SETTING(state, { key, value }) {
    Vue.set(state.settings, key, value);
  },
};

const actions = {
  async saveSetting({ commit }, setting) {
    return await axios
      .put(SERVER_URL + "/api/v1/user/setting/" + setting.key, setting)
      .then(function (response) {
        if(response.status == 200) {
          let rSetting = {key: response.data.key, value: JSON.parse(response.data.value)};
          commit("SET_SETTING", rSetting);
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
  