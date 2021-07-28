<template>
  <b-col cols="12">
    <food-item
      v-for="food of foods"
      v-bind:key="food.id"
      :food="food"
      :deleteFood="deleteFood"
    ></food-item>
  </b-col>
</template>
<script>
import FoodListItem from "@/views/foods/FoodListItem.vue";
const components = { "food-item": FoodListItem };
const props = { foods: Array, deleteFood: Function };
export default { components, props };
</script>
<style>
</style>