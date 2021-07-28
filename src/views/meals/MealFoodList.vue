<template>
  <b-col cols="12">
    <food-item
      v-for="foodId of foodIdList"
      :key="foodId"
      :food="food(foodId)"
      :mealName="mealName"
      :mealDate="mealDate"
      :mealKey="mealKey"
    ></food-item>
  </b-col>
</template>
<script>
import { mapGetters } from "vuex";
import MealFoodListItem from "@/views/meals/MealFoodListItem.vue";
const components = { "food-item": MealFoodListItem };
const props = {
  foodIdList: Array,
  mealDate: Date,
  mealKey: Number,
  mealName: String,
};

const computed = {
  ...mapGetters({ food: "getFood" }),
};
export default { components, props, computed };
</script>
<style>
</style>