<template>
  <!-- agregar de busqueda filtro -->
  <b-col cols="12">
    <food-item
      v-for="food of foods"
      v-bind:key="food.id"
      :food="food"
    ></food-item>
  </b-col>
</template>
<script>
import { mapGetters } from "vuex";
import FoodListItem from "@/views/food/FoodListItem.vue";
const components = { "food-item": FoodListItem };
const computed = {
  ...mapGetters({ foods: "getFoods" }),
};

export default { computed, components };
</script>

<style>
</style>