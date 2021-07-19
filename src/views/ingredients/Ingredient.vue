<template>
  <b-col cols="12">
    <b-row class="m-1">
      <b-col cols="10">
        {{ ingredient.name }}
      </b-col>
      <b-col cols="2">
        <b-button
          @click="deleteIngredient(ingredient.id)"
          class="btn-block"
          variant="danger"
          >-</b-button
        >
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { mapGetters } from "vuex";

const data = function () {
  return {
    selectedIngredientId: null,
  };
};

const computed = {
  ...mapGetters({
    getIngredient: "getIngredient",
  }),
  ingredient: function () {
    const ingredientId = this.$route.params.ingredientId;
    return this.getIngredient(ingredientId);
  },
};

const methods = {
  newIngredient() {
    /*if (this.selectedIngredientId == null) {
      return;
    }

    this.$store.dispatch("newIngredient", {
      ingredientId: this.selectedIngredientId,
      ingredientId: this.ingredient.id,
    });*/
  },
  deleteIngredient() {
    //const ingredientId = this.$route.params.ingredientId;
    //this.$store.dispatch("deleteIngredient", ingredientId);
  },
};
export default { computed, methods, data };
</script>

<style>
</style>