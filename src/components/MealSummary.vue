<template>
  <b-col cols="12" class="text-center">
    <b-row>
      <b-col cols="4"> Objetivo </b-col>
      <b-col cols="4"> Consumidas </b-col>
      <b-col cols="4"> Restante </b-col>
    </b-row>
    <b-row>
      <b-col cols="4">{{ goalKcal }}</b-col>
      <b-col cols="4"> {{ consumedKcal }} </b-col>
      <b-col cols="4">
        <span v-if="diff < 0" class="text-danger">{{ diff }}</span>
        <span v-if="diff > 0">{{ diff }}</span>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { mapGetters } from "vuex";
const props = { date: Date };
const methods = {
  dateToString() {
    let day = this.date.getDate();
    let month = this.date.getMonth() + 1;
    let year = this.date.getFullYear();
    return day + "-" + month + "-" + year;
  },
};
const computed = {
  ...mapGetters({
    getGoals: "getGoals",
    getFood: "getFood",
    getMealFoods: "getMealFoods",
    getMealsKcal: "getMealsKcal",
    getIngredient: "getIngredient",
    calculateKcals: "calculateKcals",
    setting: "getSetting",
  }),

  consumedKcal: function () {
    let kcals = 0;
    let meals = this.getMealFoods(this.dateToString());

    if (typeof meals === "undefined") {
      return kcals;
    }

    Object.keys(meals).forEach((meal) => {
      let foods = meals[meal];
      foods.forEach((foodId) => {
        let ingredients = this.getFood(foodId).ingredients;
        ingredients.forEach((ingredientId) => {
          let ingredient = this.getIngredient(ingredientId);
          kcals += ingredient.kcals;
        });
      });
    });

    return kcals;
  },
  goalKcal: function () {
    return this.getGoals.kcal;
  },
  diff: function () {
    return this.goalKcal - this.consumedKcal;
  },
};

export default { computed, props, methods };
</script>

<style>
</style>