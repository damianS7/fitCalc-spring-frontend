<template>
  <b-col cols="12">
    <ingredient
      v-for="ingredient of ingredients"
      :key="ingredient.id"
      :ingredient="ingredient"
      :deleteIngredient="deleteIngredient"
    >
    </ingredient>
  </b-col>
</template>
<script>
import IngredientItem from "@/views/ingredients/IngredientListItem.vue";
const props = { ingredients: Array, deleteIngredient: Function };
const components = { ingredient: IngredientItem };
export default {
  components,
  props,
};
</script>

<style>
</style>