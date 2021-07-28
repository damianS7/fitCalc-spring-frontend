<template>
  <b-col cols="12">
    <b-row align-v="center" class="widget mb-2">
      <b-col cols="8">
        <b>{{ food.name }}</b>
      </b-col>
      <b-col cols="4" class="text-right">
        <span> Atras </span>
        <router-link to="/foods">
          <font-awesome-icon icon="arrow-circle-left" />
        </router-link>
      </b-col>
    </b-row>
    <b-row class="widget mb-2">
      <b-col cols="10">
        <b-form-select
          text-field="name"
          value-field="id"
          v-model="selectedIngredientId"
          :options="ingredients()"
        >
          <template #first>
            <b-form-select-option :value="null" disabled>
              Selecciona un ingrediente para agregar
            </b-form-select-option>
          </template>
        </b-form-select>
      </b-col>
      <b-col cols="2">
        <b-button @click="addIngredient" class="btn-block" variant="primary"
          >+</b-button
        >
      </b-col>
    </b-row>
    <b-row class="widget mb-2">
      <b-col>
        <b-row
          class="mb-2"
          v-for="(ingredientId, index) of food.ingredients"
          :key="index"
        >
          <b-col cols="10">
            {{ getIngredient(ingredientId).name }}
          </b-col>
          <b-col cols="2">
            <b-button
              @click="removeIngredient(ingredientId)"
              class="btn-block"
              variant="danger"
              >-</b-button
            >
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-row class="widget mb-1">
      <b-col cols="12">
        <b-button type="submit" variant="primary" class="w-100"
          >Actualizar</b-button
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
    getFood: "getFood",
    getIngredient: "getIngredient",
    ingredients: "getIngredients",
  }),
  food: function () {
    const foodId = this.$route.params.foodId;
    return this.getFood(foodId);
  },
};

const methods = {
  addIngredient() {
    if (this.selectedIngredientId == null) {
      return;
    }

    this.$store.dispatch("addIngredientToFood", {
      ingredientId: this.selectedIngredientId,
      foodId: this.food.id,
    });
  },
  removeIngredient(ingredientId) {
    this.$store.dispatch("removeIngredientFromFood", {
      ingredientId,
      foodId: this.food.id,
    });
  },
};
export default { computed, methods, data };
</script>

<style>
</style>