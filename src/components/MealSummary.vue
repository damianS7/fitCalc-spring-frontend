<template>
  <b-col cols="12" class="text-center">
    <b-row>
      <b-col cols="4">Objetivo</b-col>
      <b-col cols="4" class="p-0">Consumidas</b-col>
      <b-col cols="4">Restante</b-col>
    </b-row>
    <b-row>
      <b-col cols="4">{{ goalKcal }}</b-col>
      <b-col cols="4">{{ consumedKcal }}</b-col>
      <b-col cols="4">
        <span v-if="diff < 0" class="text-danger">{{ diff }}</span>
        <span v-if="diff > 0">{{ diff }}</span>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { mapGetters } from "vuex";
const props = { date: String };
const methods = {};
const computed = {
  ...mapGetters({
    getGoals: "goals/getGoals",
    getFood: "foods/getFood",
    getMealsFromDate: "meals/getMealsFromDate",
    foodKcals: "app/foodKcals",
  }),

  consumedKcal: function () {
    let kcals = 0;
    let meals = this.getMealsFromDate(this.date);

    Object.keys(meals).forEach((meal) => {
      let foods = meals[meal];
      if (!Array.isArray(foods)) {
        return;
      }

      foods.forEach((foodId) => {
        const food = this.getFood(foodId);
        kcals += this.foodKcals(food);
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