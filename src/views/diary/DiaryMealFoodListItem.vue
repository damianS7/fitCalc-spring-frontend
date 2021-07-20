<template>
  <b-row>
    <b-col cols="12">
      <b-row class="m-1">
        <b-col cols="10"> {{ food.name }} </b-col>
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
const props = ["food", "mealDate", "mealName"];
const computed = {
  ...mapGetters({ ingredients: "getIngredients" }),
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