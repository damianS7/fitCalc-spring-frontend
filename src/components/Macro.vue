<template>
  <b-col>
    <b-row>
      <b-col cols="3"></b-col>
      <b-col cols="3" class="p-0">Consumida</b-col>
      <b-col cols="3" class="p-0">Objetivo</b-col>
      <b-col cols="3" class="p-0">Restante</b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-row>
          <b-col cols="3" class="pr-0">Proteinas</b-col>
          <b-col cols="3" class="p-0">{{ consumedProteinsGrams }}</b-col>
          <b-col cols="3" class="p-0">{{ maxProteinsGrams }}</b-col>
          <b-col cols="3" class="p-0"
            >{{ maxProteinsGrams - consumedProteinsGrams }}gr</b-col
          >
        </b-row>
        <b-row>
          <b-col>
            <b-progress
              :max="maxProteinsGrams"
              :value="consumedProteinsGrams"
              :variant="
                consumedProteinsGrams > maxProteinsGrams ? 'danger' : 'primary'
              "
              height="2px"
            >
            </b-progress>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-row>
          <b-col cols="3" class="pr-0">Hidratos</b-col>
          <b-col cols="3" class="p-0">{{ consumedCarbosGrams }}</b-col>
          <b-col cols="3" class="p-0">{{ maxCarbosGrams }}</b-col>
          <b-col cols="3" class="p-0"
            >{{ maxCarbosGrams - consumedCarbosGrams }}gr</b-col
          >
        </b-row>
        <b-row>
          <b-col>
            <b-progress
              :max="maxCarbosGrams"
              :value="consumedCarbosGrams"
              height="2px"
              :variant="
                consumedCarbosGrams > maxCarbosGrams ? 'danger' : 'primary'
              "
            >
            </b-progress>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-row>
          <b-col cols="3" class="pr-0">Grasas</b-col>
          <b-col cols="3" class="p-0">{{ consumedFatsGrams }}</b-col>
          <b-col cols="3" class="p-0">{{ maxFatsGrams }}</b-col>
          <b-col cols="3" class="p-0"
            >{{ maxFatsGrams - consumedFatsGrams }}gr</b-col
          >
        </b-row>
        <b-row>
          <b-col>
            <b-progress
              :max="maxFatsGrams"
              :value="consumedFatsGrams"
              height="2px"
              :variant="consumedFatsGrams > maxFatsGrams ? 'danger' : 'primary'"
            >
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
  consumed(macro) {
    let grams = 0;

    // Obtenemos todos las meals de la fecha (desayuno, merienda etc ...)
    const meals = this.getMealsFromDate(this.date);

    this.mealKeys().forEach((mealKey) => {
      const foodIds = meals[mealKey];
      foodIds.forEach((foodId) => {
        // Buscamos la comida con el id ...
        const food = this.getFood(foodId);

        // Si la comida existe ...
        if (typeof food !== "undefined") {
          food.ingredients.forEach((ingredientId) => {
            // Buscamos el ingrediente con el id ...
            const ingredient = this.getIngredient(ingredientId);

            // Si el ingrediente existe ...
            if (typeof ingredient !== "undefined") {
              grams += ingredient[macro];
            }
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
    return Math.round(this.consumed("proteins"));
  },
  maxProteinsGrams: function () {
    return Math.round(
      (this.getGoals.kcal / 4) * (this.getGoals.proteins / 100)
    );
  },
  consumedCarbosGrams: function () {
    return Math.round(this.consumed("carbohydrates"));
  },
  maxCarbosGrams: function () {
    return Math.round(
      (this.getGoals.kcal / 4) * (this.getGoals.carbohydrates / 100)
    );
  },
  consumedFatsGrams: function () {
    return Math.round(this.consumed("fats"));
  },
  maxFatsGrams: function () {
    return Math.round((this.getGoals.kcal / 9) * (this.getGoals.fats / 100));
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