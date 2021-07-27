<template>
  <b-col cols="12">
    <ingredient-item
      v-for="ingredient of ingredients"
      :key="ingredient.id"
      :ingredient="ingredient"
      :deleteIngredient="deleteIngredient"
    ></ingredient-item>
  </b-col>
</template>
<script>
import IngredientListItem from "@/views/ingredients/IngredientListItem.vue";
const props = { ingredients: Array, deleteIngredient: Function };
const components = { "ingredient-item": IngredientListItem };
export default { components, props };
</script>

<style>
</style>