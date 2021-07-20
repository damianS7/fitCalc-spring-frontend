import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const state = {
  user: { id: 5, username: "DamianS7", email: "damian@gmail.com", token: null},
  profile: {
    age: 27,
    lenght: 177,
    weights: {
      "01-01-2021": { weight: 61},
      "04-01-2021": { weight: 62},
      "07-01-2021": { weight: 63},
      "09-01-2021": { weight: 64},
      "11-01-2021": { weight: 65},
      "13-01-2021": { weight: 66},
      "14-01-2021": { weight: 67},
      "17-01-2021": { weight: 71},
      "21-01-2021": { weight: 77}
    },
    
    // Objetivos del usuario (subir/bajar/mantener peso)
    // Distribucion de calorias
    goals: {

    },

    // Registro de comidas
    meals: {
      "18-7-2021": { breakfast: [0, 3], supper:[1, 2], lunch: [3], dinner: [1], snacks: [1] },
      "19-7-2021": { breakfast: [4], supper:[], lunch: [1], dinner: [2], snacks: [0] },
      "20-7-2021": { breakfast: [4, 1], supper:[], lunch: [0, 2], dinner: [4], snacks: [0, 3] },
    }
  },

  ingredients: {
    0: { id: 0, name: 'Queso', proteins: 1, carbohydrates: 1, fats: 1, weight: 100 },
    1: { id: 1, name: 'Leche', proteins: 1, carbohydrates: 1, fats: 1 },
    2: { id: 2, name: 'Harina Trigo', proteins: 1, carbohydrates: 1, fats: 1 },
    3: { id: 3, name: 'Jamon Cocido', proteins: 1, carbohydrates: 1, fats: 1 },
    4: { id: 4, name: 'Pan de molde', proteins: 1, carbohydrates: 1, fats: 1 },
    5: { id: 5, name: 'Tomate', proteins: 1, carbohydrates: 1, fats: 1 },
    6: { id: 6, name: 'Atun', proteins: 1, carbohydrates: 1, fats: 1 },
    7: { id: 7, name: 'Whey Protein', proteins: 1, carbohydrates: 1, fats: 1 },
    8: { id: 8, name: 'Queso fresco batido', proteins: 1, carbohydrates: 1, fats: 1 },
    9: { id: 9, name: 'Spaghetti', proteins: 1, carbohydrates: 1, fats: 1 },
    10: { id: 10, name: 'Lenteja', proteins: 1, carbohydrates: 1, fats: 1 },
    11: { id: 11, name: 'Guisante', proteins: 1, carbohydrates: 1, fats: 1 },
    12: { id: 12, name: 'Helado nueces de macadamia', proteins: 10, carbohydrates: 46, fats: 44, weight: 100 },
  },
  foods: {
    0: { id: 0, name: "Pizza 4 Quesos", ingredients: [ 0, 3, 5 ]},
    1: { id: 1, name: "Pizza Barbacoa", ingredients: [ 0, 3, 5 ]},
    2: { id: 2, name: "Pizza Hawaiana", ingredients: [ 0, 3, 5 ]},
    3: { id: 3, name: "Pizza Napolitana", ingredients: [ 0, 3, 5 ]},
    4: { id: 4, name: "Sandwich de queso", ingredients: [ 0, 4 ]}
  },
  diary: {
    0: { date: "01-01-2021", breakfast: [], dinner: []}
  },
  settings: {},
  isLogged: true,
  appReady: false
};

const mutations = {
  ADD_WEIGHT(state, obj) {
    Vue.set(state.profile.weights, obj.date, { weight: obj.weight });
  },
  DELETE_WEIGHT(state, weightDate) {
    Vue.delete(state.profile.weights, weightDate);
  },
  NEW_INGREDIENT(state, ingredient) {
    Vue.set(state.ingredients, ingredient.id, ingredient);
  },
  DELETE_INGREDIENT(state, ingredientId) {
    Vue.delete(state.ingredients, ingredientId);
  },
  ADD_INGREDIENT_TO_FOOD(state, payload) {
    state.foods[payload.foodId].ingredients.push(payload.ingredientId);
  },
  REMOVE_INGREDIENT_FROM_FOOD(state, payload) {
    state.foods[payload.foodId].ingredients.pop(payload.ingredientId);
  },
  DELETE_FOOD_FROM_MEAL(state, { mealName, mealDate, foodId }) {
    state.profile.meals[mealDate][mealName].pop(foodId);
  }
};

const getters = {
  //KCAL_PER_PROTEIN: 4,
  //KCAL_PER_CARBOHYDRATE: 4,
  //KCAL_PER_FAT: 9,
  isLogged() {
    return state.isLogged;
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

    dates.forEach(date => {
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
  }
};

const actions = {
  async addWeight(context, weight) {
    context.commit("ADD_WEIGHT", weight);
  },
  async deleteWeight(context, weightDate) {
    context.commit("DELETE_WEIGHT", weightDate);
  },
  async newIngredient(context, payload ) {
    context.commit("ADD_INGREDIENT", payload);
  },
  async deleteIngredient(context, ingredientId) {
    context.commit("DELETE_INGREDIENT", ingredientId);
  },
  async addIngredientToFood(context, payload ) {
    context.commit("ADD_INGREDIENT_TO_FOOD", payload);
  },
  async removeIngredientFromFood(context, payload ) {
    context.commit("REMOVE_INGREDIENT_FROM_FOOD", payload);
  },
  async deleteMealFood(context, { mealName, mealDate, foodId }) {
    context.commit("DELETE_FOOD_FROM_MEAL", { mealName, mealDate, foodId });
  },
};

export default new Vuex.Store({
  state, mutations, actions, getters
});
