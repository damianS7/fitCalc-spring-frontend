<template>
  <b-col cols="12">
    <b-row align-v="center" class="widget mb-2">
      <b-col>
        <b>{{ name }} </b>
        <small> ( {{ kcals }} kcal ) </small>
      </b-col>
      <b-col class="text-right">
        <span> Atras </span>
        <router-link to="/foods">
          <font-awesome-icon icon="arrow-circle-left" />
        </router-link>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-row class="widget mb-2">
          <b-col cols="12">
            <b-form-input
              type="text"
              v-model="name"
              placeholder="Nombre del ingrediente"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="widget mb-2">
          <b-col cols="10">
            <b-form-select
              text-field="name"
              value-field="id"
              v-model="selectedIngredientId"
              :options="getIngredients()"
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
              v-for="(ingredientId, index) of ingredients"
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
          <b-col>
            <b-button
              @click="createFood"
              type="submit"
              variant="primary"
              class="w-100"
              >Crear</b-button
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
    name: "Food",
    ingredients: [],
    selectedIngredientId: null,
  };
};

const computed = {
  ...mapGetters({
    getIngredients: "getIngredients",
    getIngredient: "getIngredient",
    getFood: "getFood",
    getFoods: "getFoods",
  }),
  kcals: function () {
    return 0;
  },
};

const methods = {
  makeToast(msg, variant) {
    this.$bvToast.toast(msg, {
      title: "Food",
      autoHideDelay: 5000,
      appendToast: true,
      solid: true,
      toaster: "b-toaster-bottom-right",
      variant: variant,
    });
  },
  addIngredient() {
    this.ingredients.push(this.selectedIngredientId);
  },
  removeIngredient(ingredientId) {
    this.ingredients.pop(ingredientId);
  },
  async createFood() {
    if (this.name.length == 0) {
      return;
    }

    let responseStatus = await this.$store.dispatch("newFood", {
      id: null,
      name: this.name,
      ingredients: this.ingredients,
    });

    if (responseStatus == 200) {
      this.makeToast("Agregado con exito.", "success");
    } else {
      this.makeToast("No se pudo agregar la comida.", "danger");
    }
  },
};
export default { methods, data, computed };
</script>

<style>
</style>