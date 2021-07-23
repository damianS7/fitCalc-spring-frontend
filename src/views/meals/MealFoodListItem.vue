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
//const props = ["food", "mealDate", "mealName", "addKcal"];
const props = {
  food: Object,
  mealDate: String,
  mealName: String,
  addKcal: Function,
};
const computed = {
  ...mapGetters({
    ingredients: "getIngredients",
    ingredient: "getIngredient",
  }),

  kcal: function () {
    let foodKcal = 0;
    const ingredientsIds = this.food.ingredients;
    console.log("Ingredientes de: " + this.food.name);
    ingredientsIds.forEach((id) => {
      const i = this.ingredient(id);
      const ingredientKcal = i.fats * 9 + i.proteins * 4 + i.carbohydrates * 4;
      console.log(id + " -> " + i.name + " kcals: " + ingredientKcal);

      // foodKcal += ingredientKcal;
      this.addKcal(ingredientKcal);
    });
    return foodKcal;
  },
};
const methods = {
  ...mapActions(["deleteMealFood"]),
  deleteFoodFromMeal() {
    /*this.$store.dispatch("deleteMealFood", {
      mealName: this.mealName,
      mealDate: this.mealDate,
      foodId: this.food.id,
    });*/
    this.deleteMealFood({
      mealName: this.mealName,
      mealDate: this.mealDate,
      foodId: this.food.id,
    });
  },
  foodId() {
    return this.food.id.toString();
  },
};
export default { computed, props, methods };
</script>

<style>
</style>