<template>
  <b-col cols="12">
    <b-row align-v="center">
      <b-col cols="12">
        <h1>Foods</h1>
      </b-col>
    </b-row>
    <b-row class="mb-2">
      <b-col cols="12">
        <b-form-input
          v-model="searchFilter"
          placeholder="Busca una comida"
        ></b-form-input>
      </b-col>
    </b-row>
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
const data = function () {
  return {
    searchFilter: "",
  };
};
const computed = {
  ...mapGetters({ getFoods: "getFoods" }),
  foods: function () {
    return this.getFoods.filter((food) =>
      food.name.toLowerCase().includes(this.searchFilter.toLowerCase())
    );
  },
};

export default { computed, components, data };
</script>

<style>
</style>