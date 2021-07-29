<template>
  <b-row>
    <b-col cols="12">
      <b-row class="m-1">
        <b-col cols="10"> {{ food.name }} ({{ kcal }}) </b-col>
        <b-col cols="2">
          <b-button class="btn-sm" variant="danger" @click="deleteFoodFromMeal">
            <font-awesome-icon icon="trash" />
          </b-button>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
const props = {
  food: Object,
  foodIndex: Number,
  mealKey: String,
  mealName: String,
  mealDate: Date,
};
const computed = {
  ...mapGetters({
    ingredients: "getIngredients",
    getIngredient: "getIngredient",
    getFood: "getFood",
  }),
  kcal: function () {
    let kcals = 0;
    // if (this.food != null) {
    this.food.ingredients.forEach((ingredientId) => {
      const ingredient = this.getIngredient(ingredientId);
      kcals += ingredient.kcals;
    });
    // }
    return kcals;
  },
};
const methods = {
  ...mapActions(["deleteMealFood"]),
  deleteFoodFromMeal() {
    this.deleteMealFood({
      mealKey: this.mealKey,
      mealDate: this.mealDate,
      foodIndex: this.foodIndex,
    });
  },
};
export default { computed, props, methods };
</script>

<style>
</style>