<template>
  <b-row class="food">
    <b-col cols="12">
      <b-button class="btn-sm" variant="danger" @click="removeFood(food)">
        <font-awesome-icon icon="trash" />
      </b-button>
      {{ food.name }}
      <b-badge pill variant="primary"> {{ getFoodKcals(food) }} kcal </b-badge>
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
const methods = {
  ...mapActions(["deleteFoodFromMeal", "confirmDialog"]),
  async removeFood(food) {
    // Antes de borrar la comida, se requiere confirmacion
    if (
      !(await this.confirmDialog({
        vm: this,
        msg: "Desea borrar: " + food.name,
      }))
    ) {
      return;
    }

    this.deleteFoodFromMeal({
      mealKey: this.mealKey,
      mealDate: this.mealDate,
      foodId: this.foodIndex,
    });
  },
};
const computed = {
  ...mapGetters({
    getFoodKcals: "foodKcals",
  }),
};

export default { computed, props, methods };
</script>

<style>
.meal .food {
  margin: 0;
  padding: 5px 0;
}
</style>