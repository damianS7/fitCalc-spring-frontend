<template>
  <b-col>
    <b-row class="mb-1">
      <b-col>
        <b-row class="mb-1" align-v="center">
          <b-col cols="4">Carbos</b-col>
          <b-col cols="8">
            <b-progress :max="maxCarbosGrams" show-value>
              <b-progress-bar :value="consumedCarbosGrams">
                <span>
                  <strong
                    >{{ consumedCarbosGrams }}gr /
                    {{ maxCarbosGrams }}gr</strong
                  >
                </span>
              </b-progress-bar>
            </b-progress>
          </b-col>
        </b-row>
        <b-row class="mb-1" align-v="center">
          <b-col cols="4"> Proteinas </b-col>
          <b-col cols="8">
            <b-progress :max="maxProteinsGrams" show-value>
              <b-progress-bar :value="consumedProteinsGrams">
                <span>
                  <strong
                    >{{ consumedProteinsGrams }}gr /
                    {{ maxProteinsGrams }}gr</strong
                  >
                </span>
              </b-progress-bar>
            </b-progress>
          </b-col>
        </b-row>
        <b-row class="mb-0" align-v="center">
          <b-col cols="4">Grasas</b-col>
          <b-col cols="8">
            <b-progress :max="maxFatsGrams" show-value>
              <b-progress-bar :value="consumedFatsGrams">
                <span>
                  <strong
                    >{{ consumedFatsGrams }}gr / {{ maxFatsGrams }}gr</strong
                  >
                </span>
              </b-progress-bar>
            </b-progress>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
const data = function () {
  return {
    maxProteins: 1000,
    maxCarbos: 1000,
    maxFats: 1000,
  };
};
const props = {
  date: String,
};
const methods = {
  ...mapActions({
    confirmDialog: "app/confirmDialog",
    makeToast: "app/makeToast",
  }),
  consumed(x) {
    let grams = 0;

    // Obtenemos todos las meals de la fecha (desayuno, merienda etc ...)
    let meals = this.getMealsFromDate(this.date);

    this.mealKeys().forEach((mealKey) => {
      let foodIds = meals[mealKey];
      foodIds.forEach((foodId) => {
        const food = this.getFood(foodId);

        if (typeof food !== "undefined") {
          food.ingredients.forEach((ingredientId) => {
            const ingredient = this.getIngredient(ingredientId);
            grams += ingredient[x];
          });
        }
      });
    });

    return grams;
  },
};
const computed = {
  ...mapGetters({
    getGoals: "goal/getGoals",
    getMealsFromDate: "meal/getMealsFromDate",
    mealKeys: "meal/getMealKeys",
    getFood: "food/getFood",
    getIngredient: "ingredient/getIngredient",
  }),
  consumedProteinsGrams: function () {
    return this.consumed("proteins");
  },
  maxProteinsGrams: function () {
    return (this.getGoals.kcal / 4) * (this.getGoals.proteins / 100);
  },
  consumedCarbosGrams: function () {
    return this.consumed("carbohydrates");
  },
  maxCarbosGrams: function () {
    return (this.getGoals.kcal / 4) * (this.getGoals.carbohydrates / 100);
  },
  consumedFatsGrams: function () {
    return this.consumed("fats");
  },
  maxFatsGrams: function () {
    return (this.getGoals.kcal / 4) * (this.getGoals.fats / 100);
  },
};
export default {
  data,
  props,
  computed,
  methods,
};
</script>

<style>
</style>