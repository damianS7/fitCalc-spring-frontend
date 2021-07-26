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
    <b-row class="widget">
      <b-col>
        <b-row class="mt-2 mb-2">
          <b-col cols="12">
            <b-form-input
              type="text"
              v-model="ingredient.name"
              placeholder="Nombre del ingrediente"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col cols="12">
            <b-form-input
              type="number"
              v-model="ingredient.fats"
              placeholder="Grasas por 100g"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mb-2">
          <b-col cols="12">
            <b-form-input
              type="number"
              v-model="ingredient.proteins"
              placeholder="Proteinas por 100g"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mb-3">
          <b-col cols="12">
            <b-form-input
              type="number"
              v-model="ingredient.carbohydrates"
              placeholder="Carbohidratos por 100g"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mb-1">
          <b-col>
            <b-button
              @click="updateIngredient"
              type="submit"
              variant="primary"
              class="w-100"
              >Actualizar</b-button
            >
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { mapGetters } from "vuex";

const data = function () {
  return {
    name: "",
    fats: 0,
    proteins: 0,
    carbohydrates: 0,
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
  updateIngredient() {
    //const ingredientId = this.$route.params.ingredientId;
    //this.$store.dispatch("deleteIngredient", ingredientId);
  },
};
export default { computed, methods, data };
</script>

<style>
</style>