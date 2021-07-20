<template>
  <b-col cols="12">
    <food-item
      v-for="foodId of foodIdList"
      :key="foodId"
      :food="food(foodId)"
      :mealName="mealName"
      :mealDate="mealDate"
    ></food-item>
  </b-col>
</template>
<script>
import { mapGetters } from "vuex";
import DiaryMealFoodListItem from "@/views/diary/DiaryMealFoodListItem.vue";
const components = { "food-item": DiaryMealFoodListItem };
const props = ["foodIdList", "mealDate", "mealName"];
const computed = {
  ...mapGetters({ food: "getFood" }),
};
export default { components, props, computed };
</script>
<style>
</style>