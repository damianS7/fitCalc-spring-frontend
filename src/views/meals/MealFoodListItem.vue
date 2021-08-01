<template>
  <b-row class="food">
    <b-col cols="12">
      <b-button class="btn-sm" variant="danger" @click="deleteFoodFromMeal">
        <font-awesome-icon icon="trash" />
      </b-button>
      {{ food.name }}
      <b-badge pill variant="primary"> {{ kcal }} kcal </b-badge>
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
  mealDate: String,
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
    // Mostrar modal YES OR NO para borrar
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
.meal .food {
  margin: 0;
  padding: 5px 0;
}
</style>