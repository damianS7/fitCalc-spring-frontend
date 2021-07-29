<template>
  <b-row>
    <b-col cols="12">
      <food-item
        v-for="(food, index) of foods"
        :key="index"
        :food="food"
        :mealKey="mealKey"
        :mealName="mealName"
        :mealDate="mealDate"
      ></food-item>
    </b-col>
  </b-row>
</template>
<script>
import { mapGetters } from "vuex";
import MealFoodListItem from "@/views/meals/MealFoodListItem.vue";
const components = { "food-item": MealFoodListItem };
const props = {
  foods: Array,
  mealKey: String,
  mealName: String,
  mealDate: Date,
};
const computed = {};
const mounted = function () {};
export default { components, props, computed, mounted };
</script>
<style>
</style>