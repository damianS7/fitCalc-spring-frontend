<template>
  <b-col cols="12">
    <food-item
      v-for="food of foodList"
      v-bind:key="food.id"
      :food="food"
    ></food-item>
  </b-col>
</template>
<script>
import FoodListItem from "@/views/foods/FoodListItem.vue";
const components = { "food-item": FoodListItem };
const props = ["foodList"];
export default { components, props };
</script>
<style>
</style>