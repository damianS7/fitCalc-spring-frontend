import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const SERVER_URL = "http://192.168.0.21:8888";
const FATS_MULTIPLIER = 9;
const PROTEINS_MULTIPLIER = 4;
const CARBOHYDRATES_MULTIPLIER = 4;
const KCAL_GRAMS_RATIO = 100;

const state = {
  // Datos del usuario logeado en la aplicacion
  user: { id: null, username: null, email: null, token: null },

  // Datos personales
  profile: {
    // Edad del usuario
    age: 0,

    // Altura en cm
    height: 0,

    // Historial de pesos del usuario
    weights: {
      // Formato
      "2021-7-28": { weight: 71 },
      "2021-7-29": { weight: 68 },
    },

    // Objetivos del usuario (kcal) y distribucion de sus macros
    goals: {
      kcal: 3000,
      proteins: 30,
      fats: 30,
      carbohydrates: 40,
    },

    // Registro de comidas diarias
    meals: {
      // Formato
      // "2021-7-29": { 0: [1], 1:[1], 2: [1], 3: [1], 4: [1] },
      "2021-7-28": { meal1: [1], meal2:[1], meal3: [1], meal4: [1], meal5: [1] },
      "2021-7-29": { meal1: [1], meal2:[], meal3: [1], meal4: [1], meal5: [1] },
      "2021-7-30": { meal1: [1], meal2:[1], meal3: [], meal4: [], meal5: [] },
      "2021-7-31": { meal1: [1], meal2:[2], meal3: [], meal4: [], meal5: [] },
      "2021-8-1": { meal1: [1], meal2:[1], meal3: [1], meal4: [1], meal5: [1] },
      "2021-8-2": { meal1: [1], meal2:[1], meal3: [1], meal4: [1], meal5: [1] },
      "2021-8-3": { meal1: [1], meal2:[1], meal3: [1], meal4: [1], meal5: [1] },
      "2021-8-4": { meal1: [], meal2:[], meal3: [], meal4: [], meal5: [] },
      "2021-8-5": { meal1: [1], meal5: [1] },
      "2021-8-6": { meal1: [], meal5: [] },
    },
  },

  // Ingredientes disponibles en la app
  ingredients: {
    // Formato 0: {id:1, name: "Tomate", proteins:5, fats: 5, carbohydrates:8}
  },

  // Comidas formadas a partir de los ingredientes
  foods: {
    // Formato 0: {id:1, name: "Piza 4 Quesos", ingredients: [1, 1, 1, 1]}
  },

  // Opciones de configuracion
  settings: {
    // meals: { 0: { name: "desayuno" } },
  },

  // Flag que determina si la app esta lista, es decir, login + inicializacion de datos.
  appReady: false,
};

const mutations = {
  SET_USER(state, user) {
    Vue.set(state, "user", user);
  },
  SET_READY(state, ready) {
    Vue.set(state, "appReady", ready);
  },
  ADD_INGREDIENT(state, ingredient) {
    Vue.set(state.ingredients, ingredient.id, ingredient);
  },
  UPDATE_INGREDIENT(state, ingredient) {
    Vue.set(state.ingredients, ingredient.id, ingredient);
  },
  DELETE_INGREDIENT(state, ingredientId) {
    Vue.delete(state.ingredients, ingredientId);
  },
  SET_INGREDIENTS(state, ingredients) {
    Vue.set(state, "ingredients", ingredients);
  },
  ADD_FOOD(state, food) {
    Vue.set(state.foods, food.id, food);
  },
  UPDATE_FOOD(state, food) {
    Vue.set(state.foods, food.id, food);
  },
  DELETE_FOOD(state, foodId) {
    Vue.delete(state.foods, foodId);
  },
  SET_FOODS(state, foods) {
    Vue.set(state, "foods", foods);
  },
  SET_SETTINGS(state, settings) {
    Vue.set(state, "settings", settings);
  },
  SET_PROFILE(state, profile) {
    Vue.set(state, "profile", profile);
  },
  SET_SETTING(state, { key, value }) {
    Vue.set(state.settings, key, value);
  },
  SET_TOKEN(state, token) {
    Vue.set(state.user, "token", token);
  },
  // Agrega un peso al historial
  ADD_WEIGHT(state, { date, weight }) {
    Vue.set(state.profile.weights, date, { weight } );
    // Vue.set(state.profile.weights, obj.date, { weight: obj.weight });
  },
  // Borra un peso de una fecha especificada
  DELETE_WEIGHT(state, date) {
    Vue.delete(state.profile.weights, date);
  },
  // .... A partir de aqui pendiente de revision !
  SET_GOAL(state, { goal, value }) {
    Vue.set(state.profile.goals, goal, value);
  },
  SET_GOALS(state, goals) {
    // esto no funciona creo ...
    Vue.set(state.profile, "goals", goals);
  },
  
  
  ADD_INGREDIENT_TO_FOOD(state, payload) {
    state.foods[payload.foodId].ingredients.push(payload.ingredientId);
  },
  REMOVE_INGREDIENT_FROM_FOOD(state, payload) {
    state.foods[payload.foodId].ingredients.pop(payload.ingredientId);
  },
  
  ADD_FOOD_TO_MEAL(state, { mealKey, mealDate, foodId }) {
    let meals = state.profile.meals;
    
    // Si no existe ningun objeto para la fecha indicada se crea
    if (typeof meals[mealDate] === "undefined") {
      Vue.set(state.profile.meals, mealDate, {} ); 
    }

    let meal = meals[mealDate];
    // Si no existe la comida indicada en dentro de la fecha, se crea
    if(typeof meal[mealKey] === "undefined") {
      Vue.set(state.profile.meals[mealDate], mealKey, [] );  
    }

    // Finalmente se agrega
    meal[mealKey].push(foodId);
  },
  DELETE_FOOD_FROM_MEAL(state, { mealKey, mealDate, foodIndex }) {
    Vue.delete(state.profile.meals[mealDate][mealKey], foodIndex );
  },
};

const getters = {
  isLogged() {
    if (state.user.token !== null) {
      return true;
    }
    return false;
  },
  isAppReady() {
    return state.appReady;
  },
  getIngredient: (state) => (ingredientId) => {
    return state.ingredients[ingredientId];
  },
  getIngredients: (state) => () => {
    return Object.values(state.ingredients);
  },
  getFood: (state) => (foodId) => {
    return state.foods[foodId];
  },
  getFoods: (state) => () => {
    return Object.values(state.foods);
  },
  getSetting: (state) => (settingName) => {
    return state.settings[settingName];
  },
  getSettings: (state) => () => {
    return state.settings;
  },
  dateToString: () => (date) => {
    return date.toISOString().split('T')[0];
  },
  foodKcals: (state, getters) => (food) => {
    // Si meals contiene un ID de comida que fue eliminado ...
    if (typeof food === "undefined") {
      return 0;
    }

    let kcals = 0;
    food.ingredients.forEach((id) => {
      const ingredient = getters.getIngredient(id);
      kcals += getters.ingredientKcals(ingredient);
    });
    return kcals;
  },
  ingredientKcals: () => (ingredient) => {
    if (typeof ingredient === "undefined") {
      return 0;
    }

    let kcals = 0;
    kcals += ingredient.fats * FATS_MULTIPLIER;
    kcals += ingredient.proteins * PROTEINS_MULTIPLIER;
    kcals += ingredient.carbohydrates * CARBOHYDRATES_MULTIPLIER;
    return kcals;
  },
  // .... comprobar a partir de aqui
  getMealName: (state) => (mealIndex) => {
    return state.settings.meals[mealIndex].name;
  },
  getGoals() {
    return state.profile.goals;
  },
  getGoal: (state) => (goalName) => {
    return state.profile.goals[goalName];
  },
  getMealsFromDate: (state, getters) => (date) => {
    // date = getters.dateToString(date);
    let meals = state.profile.meals[date];
    if(typeof meals === 'undefined') {
      return {};
    }

    return meals;
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

    dates.forEach((date) => {
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
  },
  
};

const actions = {
  async init(context) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + context.state.user.token;
    
    // Obtenemos los ingredientes disponibles
    await axios.get(SERVER_URL + "/api/v1/ingredients")
      .then(function(response){
        // response.data.forEach((ingredient) => {
          // context.commit("ADD_INGREDIENT", ingredient);
        // });
        let ingredients = {};
        response.data.forEach((ingredient) => {
          ingredient.kcals = context.getters.ingredientKcals(ingredient);
          ingredients[ingredient.id] = ingredient;
        });
        context.commit("SET_INGREDIENTS", ingredients);
      });

    await axios.get(SERVER_URL + "/api/v1/foods")
      .then(function(response){
        let foods = {};
        response.data.map((food) => {
          // Recuerda convertirlo a string al almacenar foods!
          return foods[food.id] = food;
        });
        context.commit("SET_FOODS", foods);
      });

      await axios.get(SERVER_URL + "/api/v1/users/profile")
      .then(function(response){
        if(response.status == 200) {
          context.commit("SET_PROFILE", response.data);
        }
      });
    
      await axios.get(SERVER_URL + "/api/v1/settings")
      .then(function(response){
        let settings = {};
        response.data.map((setting) => {
          // food.ingredients = JSON.parse(food.ingredients);
          if(setting.key == "meals") {
            setting.value = JSON.parse(setting.value);
          }
          return settings[setting.key] = setting.value;
        });

        context.commit("SET_SETTINGS", settings);
      });

    await new Promise(r => setTimeout(r, 1000));
    context.commit("SET_READY", true);
    // console.log("La app esta lista.");
  },
  async login(context, { username, password }) {
    let data = { username: username, password: password };
    return await axios
      .post(SERVER_URL + "/api/users/login", data)
      .then(function (response) {
        // Si el request tuvo exito (codigo 200)
        if (response.status == 200) {
          // Cargar los datos de usuario
          return {
            status: response.status,
            data: response.data,
          };
        }
      })
      .catch(function (error) {
        // Si no se puede alcanzar el servidor ...
        // Ponemos el codigo y mensaje nosotros ya que si no estara vacio.
        if (typeof error.response === "undefined") {
          return {
            status: -1,
            message: "Network error",
          };
        }
        if (error.response.status) {
          return {
            status: error.response.status,
            message: error.response.data.message,
          };
        }
      });
  },
  async register(context, { username, password, email }) {
    let data = { username: username, password: password, email: email };
    return await axios
      .post("http://localhost:8888/api/users/registration", data)
      .then(function (response) {
        return {
          status: response.status,
          data: response.data,
        };
      })
      .catch(function (error) {
        return {
          status: error.response.status,
          message: error.response.data.message,
        };
      });
  },
  async logout(context) {
    context.commit("SET_TOKEN", null);
  },
  async saveSetting(context, setting) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + context.state.user.token;
    return await axios
      .put(SERVER_URL + "/api/v1/settings/" + setting.key, setting)
      .then(function (response) {
        let rSetting = {key: response.data.key, value: JSON.parse(response.data.value)};
        context.commit("SET_SETTING", rSetting);
        return response.status;
      }).catch( (error) => {
        return error.response.status;
      });
  },
  async addWeight(context, weight) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + context.state.user.token;
    const date = context.getters.dateToString(new Date());
    context.commit("ADD_WEIGHT", { date, weight });
    return await axios.post(SERVER_URL + "/api/v1/users/profile/weight", weight)
    .then(function (response) {
      // Si el request tuvo exito (codigo 200)
      if (response.status == 200) {
          // context.commit("ADD_WEIGHT", { date, weight });
          context.commit("ADD_WEIGHT", response.data);
        }
        return response.status;
      }).catch(function (response){
        return response.status;
      });
  },
  async deleteWeight(context, weightDate) {
    context.commit("DELETE_WEIGHT", weightDate);
  },
  async newIngredient(context, ingredient) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + context.state.user.token;
    return await axios.post(SERVER_URL + "/api/v1/ingredients", ingredient)
      .then(function (response) {
        // Si el request tuvo exito (codigo 200)
        if (response.status == 200) {
          response.data.kcals = context.getters.ingredientKcals(response.data);
          context.commit("ADD_INGREDIENT", response.data);
        }
        return response.status;
      }).catch(function (response){
        return response.status;
      });
  },
  async updateIngredient(context, ingredient) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + context.state.user.token;
    return await axios.put(SERVER_URL + "/api/v1/ingredients/" + ingredient.id, ingredient)
      .then(function (response) {
        // Si el request tuvo exito (codigo 200)
        if (response.status == 200) {
          response.data.kcals = context.getters.ingredientKcals(response.data);
          context.commit("UPDATE_INGREDIENT", response.data);
        }
        return response.status;
      }).catch(function (response){
        return response.status;
      });
  },
  async deleteIngredient(context, ingredientId) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + context.state.user.token;
    
    return await axios.delete(SERVER_URL + "/api/v1/ingredients/" + ingredientId)
      .then(function (response) {
        // Si el request tuvo exito (codigo 200)
        if (response.status == 200) {
          context.commit("DELETE_INGREDIENT", response.data.id);
        }
        return response.status;
      }).catch(function (response){
        return response.status;
      });
  },
  async newFood(context, food) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + context.state.user.token;
    return await axios.post(SERVER_URL + "/api/v1/foods", food)
      .then(function (response) {
        // Si el request tuvo exito (codigo 200)
        if (response.status == 200) {
          // response.data.kcals = context.getters.ingredientKcals(response.data);
          context.commit("ADD_FOOD", response.data);
        }
        return response.status;
      }).catch(function (response){
        return response.status;
      });
  },
  async updateFood(context, food) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + context.state.user.token;
    return await axios.put(SERVER_URL + "/api/v1/foods/" + food.id, food)
      .then(function (response) {
        // Si el request tuvo exito (codigo 200)
        if (response.status == 200) {
          // response.data.kcals = context.getters.ingredientKcals(response.data);
          context.commit("UPDATE_FOOD", response.data);
        }
        return response.status;
      }).catch(function (response){
        return response.status;
      });
  },
  async deleteFood(context, foodId) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + context.state.user.token;
    
    return await axios.delete(SERVER_URL + "/api/v1/foods/" + foodId)
      .then(function (response) {
        // Si el request tuvo exito (codigo 200)
        if (response.status == 200) {
          context.commit("DELETE_FOOD", response.data.id);
        }
        return response.status;
      }).catch(function (response){
        return response.status;
      });
  },
  // ............
  async updateGoal(context, { goal, value }) {
    context.commit("SET_GOAL", { goal, value });
  },
  async addIngredientToFood(context, payload) {
    context.commit("ADD_INGREDIENT_TO_FOOD", payload);
  },
  async removeIngredientFromFood(context, payload) {
    context.commit("REMOVE_INGREDIENT_FROM_FOOD", payload);
  },
  async addFoodToMeal(context, { mealKey, mealDate, foodId }) {
    mealDate = context.getters.dateToString(mealDate);
    context.commit("ADD_FOOD_TO_MEAL", {
      mealKey, 
      mealDate, 
      foodId 
    });
  },
  async deleteMealFood(context, { mealKey, mealDate, foodIndex }) {
    mealDate = context.getters.dateToString(mealDate);
    context.commit("DELETE_FOOD_FROM_MEAL", { mealKey, mealDate, foodIndex });
  },
  
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
