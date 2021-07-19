<template>
  <b-col cols="12">
    <b-row align-v="center">
      <b-col cols="8">
        <h1>{{ ingredient.name }}</h1>
      </b-col>
      <b-col cols="2">Atras</b-col>
      <b-col cols="2">
        <router-link to="/ingredients">
          <font-awesome-icon icon="arrow-circle-left" />
        </router-link>
      </b-col>
    </b-row>
    <b-row class="m-1">
      <b-col cols="12">
        <b-form>
          <b-form-group label="Nombre:">
            <b-form-input
              type="text"
              v-model="ingredient.name"
              placeholder="Nombre del ingrediente"
            ></b-form-input>
          </b-form-group>

          <b-form-group label=" ">
            <b-button type="submit" variant="primary" class="w-100"
              >Actualizar</b-button
            >
          </b-form-group>
        </b-form>
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