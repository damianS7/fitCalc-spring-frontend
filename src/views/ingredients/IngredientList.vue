<template>
  <!-- agregar de busqueda filtro -->
  <b-col cols="12">
    <b-row>
      <h1>Ingredients</h1>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-form-input
          v-model="searchFilter"
          placeholder="Busca un ingrediente"
        ></b-form-input>
      </b-col>
    </b-row>
    <ingredient-item
      v-for="ingredient of ingredients"
      v-bind:key="ingredient.id"
      :ingredient="ingredient"
    ></ingredient-item>
  </b-col>
</template>
<script>
import { mapGetters } from "vuex";
import IngredientListItem from "@/views/ingredients/IngredientListItem.vue";
const components = { "ingredient-item": IngredientListItem };
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