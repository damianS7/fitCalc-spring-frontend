<template>
  <b-col cols="12">
    <food-item
      v-for="foodId of foodIdList"
      :key="foodId"
      :food="food(foodId)"
      :mealName="mealName"
      :mealDate="mealDate"
      :addKcal="addKcal"
    ></food-item>
  </b-col>
</template>
<script>
import { mapGetters } from "vuex";
import MealFoodListItem from "@/views/meals/MealFoodListItem.vue";
const components = { "food-item": MealFoodListItem };
const props = {
  foodIdList: Array,
  mealDate: String,
  mealName: String,
  addKcal: Function,
};

const computed = {
  ...mapGetters({ food: "getFood" }),
};
export default { components, props, computed };
</script>
<style>
</style>