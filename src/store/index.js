import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const state = {
  // Datos del usuario logeado en la aplicacion
  user: { id: null, username: null, email: null, token: null },

  // Datos personales
  profile: {
    // Edad del usuari
    age: 27,

    // Altura en cm
    lenght: 177,

    // Historial de pesos del usuario
    weights: {
      "01-01-2021": { weight: 61 },
      "04-01-2021": { weight: 62 },
      "07-01-2021": { weight: 63 },
      "09-01-2021": { weight: 64 },
      "11-01-2021": { weight: 65 },
      "13-01-2021": { weight: 66 },
      "14-01-2021": { weight: 67 },
      "17-01-2021": { weight: 71 },
      "21-01-2021": { weight: 77 },
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
      // "26-7-2021": { desayuno: [4, 1], merienda:[3], comida: [0, 2], cena: [4], aperitivo: [0, 3] },
    },
  },

  // Ingredientes disponibles en la app
  ingredients: {},

  // Comidas formadas a partir de los ingredientes
  foods: {},

  // Opciones de configuracion
  settings: {
    mealNames: ["desayuno", "almuerzo", "merienda", "cena", "aperitivos"],
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
  SET_GOAL(state, { goal, value }) {
    Vue.set(state.profile.goals, goal, value);
  },
  SET_GOALS(state, goals) {
    // esto no funciona creo ...
    Vue.set(state.profile, "goals", goals);
  },
  // ADD_WEIGHT_TO_HISTORY?
  ADD_WEIGHT(state, obj) {
    Vue.set(state.profile.weights, obj.date, { weight: obj.weight });
  },
  DELETE_WEIGHT(state, weightDate) {
    Vue.delete(state.profile.weights, weightDate);
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
  ADD_INGREDIENT_TO_FOOD(state, payload) {
    state.foods[payload.foodId].ingredients.push(payload.ingredientId);
  },
  REMOVE_INGREDIENT_FROM_FOOD(state, payload) {
    state.foods[payload.foodId].ingredients.pop(payload.ingredientId);
  },
  SET_FOODS(state, foods) {
    Vue.set(state, "foods", foods);
  },
  ADD_FOOD_TO_MEAL(state, { mealName, mealDate, foodId }) {
    state.profile.meals[mealDate][mealName].push(foodId);
  },
  DELETE_FOOD_FROM_MEAL(state, { mealName, mealDate, foodId }) {
    state.profile.meals[mealDate][mealName].pop(foodId);
  },
  ADD_MEAL_SETTING(state, meal) {
    state.settings.mealNames.push(meal);
  },
  DELETE_MEAL_SETTING(state, meal) {
    state.settings.mealNames.pop(meal);
  },
  SET_SETTINGS(state, settings) {
    Vue.set(state, "settings", settings);
  },
  LOGOUT(state) {
    Vue.set(state.user, "token", null);
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
  getGoals() {
    return state.profile.goals;
  },
  getGoal: () => (goalName) => {
    return state.profile.goals[goalName];
  },
  getSetting: () => (settingName) => {
    return state.settings[settingName];
  },
  getIngredients() {
    return Object.values(state.ingredients);
  },
  getIngredient: () => (ingredientId) => {
    return state.ingredients[ingredientId];
  },
  getFoods() {
    return Object.values(state.foods);
  },
  getFood: () => (foodId) => {
    return state.foods[foodId];
  },
  getMealFoods: () => (date) => {
    // if(typeof state.profile.meals[date] === 'undefined') {
    // return null;
    // }
    return state.profile.meals[date];
  },
  getIngredientKcal: (getters) => (ingredientId) => {
    const ingredient = getters.getIngredient(ingredientId);
    let totalKcals =
      ingredient.fats * 9 +
      ingredient.carbohydrates * 4 +
      ingredient.proteins * 4;
    return totalKcals;
  },
  getFoodKcal: (getters) => (foodId) => {
    let totalKcals = 0;
    const food = getters.getFood(foodId);
    food.forEach((ingredientId) => {
      totalKcals += getters.getIngredientKcal(ingredientId);
    });
    return totalKcals;
  },
  getMealsKcal: (getters) => (date) => {
    let totalKcals = 0;
    const meals = state.profile.meals[date];

    Object.keys(meals).forEach((meal) => {
      meals[meal].forEach((foodId) => {
        totalKcals += getters.getFoodKcal(foodId);
      });
    });

    return totalKcals;
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
    await axios.get("http://localhost:8888/api/user/ingredients")
      .then(function(response){
        // response.data.forEach((ingredient) => {
          // context.commit("ADD_INGREDIENT", ingredient);
        // });
        let ingredients = {};
        response.data.forEach((ingredient) => {
          ingredients[ingredient.id] = ingredient;
        });
        context.commit("SET_INGREDIENTS", ingredients);
      });

    await axios.get("http://localhost:8888/api/user/foods")
      .then(function(response){
        let foods = {};
        response.data.map((food) => {
          // Recuerda convertirlo a string al almacenar foods!
          food.ingredients = JSON.parse(food.ingredients);
          return foods[food.id] = food;
        });
        context.commit("SET_FOODS", foods);
      });
    
      await axios.get("http://localhost:8888/api/user/settings")
      .then(function(response){
        let settings = {};
        response.data.map((setting) => {
          // food.ingredients = JSON.parse(food.ingredients);
          if(setting.key == "mealNames") {
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
      .post("http://localhost:8888/api/users/login", data)
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
    context.commit("LOGOUT");
  },
  async updateGoal(context, { goal, value }) {
    context.commit("SET_GOAL", { goal, value });
  },
  async addMealToSettings(context, meal) {
    context.commit("ADD_MEAL_SETTING", meal);
  },
  async deleteMealFromSettings(context, meal) {
    context.commit("DELETE_MEAL_SETTING", meal);
  },
  async addWeight(context, weight) {
    context.commit("ADD_WEIGHT", weight);
  },
  async deleteWeight(context, weightDate) {
    context.commit("DELETE_WEIGHT", weightDate);
  },
  async newIngredient(context, ingredient) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + context.state.user.token;
    await axios.post("http://localhost:8888/api/user/ingredients", ingredient)
      .then(function (response) {
        // Si el request tuvo exito (codigo 200)
        if (response.status == 200) {
          context.commit("ADD_INGREDIENT", response.data);
        }
      })
  },
  async updateIngredient(context, ingredient) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + context.state.user.token;
    await axios.put("http://localhost:8888/api/user/ingredients", ingredient)
      .then(function (response) {
        if (response.status == 200) {
          context.commit("UPDATE_INGREDIENT", response.data);
        }
      })
  },
  async deleteIngredient(context, ingredientId) {
    context.commit("DELETE_INGREDIENT", ingredientId);
  },
  async addIngredientToFood(context, payload) {
    context.commit("ADD_INGREDIENT_TO_FOOD", payload);
  },
  async removeIngredientFromFood(context, payload) {
    context.commit("REMOVE_INGREDIENT_FROM_FOOD", payload);
  },
  async addFoodToMeal(context, { mealName, mealDate, foodId }) {
    context.commit("ADD_FOOD_TO_MEAL", { mealName, mealDate, foodId });
  },
  async deleteMealFood(context, { mealName, mealDate, foodId }) {
    context.commit("DELETE_FOOD_FROM_MEAL", { mealName, mealDate, foodId });
  },
  
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
