<template>
  <b-col cols="12">
    <b-row align-v="center">
      <b-col cols="12">
        <h1>Ingredientes</h1>
      </b-col>
    </b-row>
    <b-row class="mb-2">
      <b-col cols="12">
        <b-form-input
          v-model="searchFilter"
          placeholder="Busca un ingrediente"
        ></b-form-input>
      </b-col>
    </b-row>
    <b-row>
      <ingredient-list :ingredients="ingredients"></ingredient-list>
    </b-row>
  </b-col>
</template>
<script>
import { mapGetters } from "vuex";
import IngredientList from "@/views/ingredients/IngredientList.vue";
const components = { "ingredient-list": IngredientList };
const data = function () {
  return {
    searchFilter: "",
  };
};
const computed = {
  ...mapGetters({ getIngredients: "getIngredients" }),
  ingredients: function () {
    return this.getIngredients.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(this.searchFilter.toLowerCase())
    );
  },
};

export default { computed, components, data };
</script>

<style>
</style>