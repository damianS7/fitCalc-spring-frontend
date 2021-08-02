<template>
  <b-col cols="12">
    <b-row align-v="center" class="widget mb-2">
      <b-col>
        <b>{{ ingredient.name }} </b>
        <small> ( {{ ingredient.kcals }} kcals )</small>
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
            <b>Proteinas: </b>
          </b-col>
          <b-col cols="12">
            <b-form-input
              type="number"
              v-model="ingredient.proteins"
              @update="recalculateKcals(ingredient)"
              placeholder="Proteinas por 100g"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mb-2">
          <b-col cols="12">
            <b>Carbohidratos</b>
          </b-col>
          <b-col cols="12">
            <b-form-input
              type="number"
              v-model="ingredient.carbohydrates"
              @update="recalculateKcals(ingredient)"
              placeholder="Carbohidratos por 100g"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col cols="12">
            <b>Grasas</b>
          </b-col>
          <b-col cols="12">
            <b-form-input
              type="number"
              v-model="ingredient.fats"
              @update="recalculateKcals(ingredient)"
              placeholder="Grasas por 100g"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-1 mb-1">
          <b-col>
            <b-button
              v-if="isEditing()"
              @click="updateIngredient"
              type="submit"
              variant="primary"
              class="w-100"
              >Actualizar</b-button
            >
            <b-button
              v-if="!isEditing()"
              @click="createIngredient"
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
import { mapActions, mapGetters } from "vuex";

const data = function () {
  return {
    ingredient: {
      id: null,
      name: "Sin nombre",
      fats: 0,
      proteins: 0,
      carbohydrates: 0,
      kcals: 0,
    },
  };
};

const computed = {
  ...mapGetters({
    getIngredient: "ingredients/getIngredient",
    calculateKcals: "ingredients/ingredientKcals",
  }),
};

const methods = {
  ...mapActions({
    addIngredient: "ingredients/addIngredient",
    makeToast: "app/makeToast",
  }),
  isEditing() {
    if (this.ingredient.id == null) {
      return false;
    }
    return true;
  },
  recalculateKcals() {
    this.ingredient.kcals = this.calculateKcals(this.ingredient);
  },
  ingredientIdFromUrl() {
    const ingredientId = this.$route.params.ingredientId;
    if (typeof ingredientId === "undefined") {
      return null;
    }
    return ingredientId;
  },
  async createIngredient() {
    let response = await this.addIngredient(this.ingredient);
    if (response.status != 200) {
      this.makeToast({
        vm: this,
        msg: "No se pudo crear el ingrediente.",
        title: "Ingredients",
        variant: "danger",
      });
    }
  },
  async updateIngredient() {
    let response = await this.$store.dispatch(
      "ingredients/updateIngredient",
      this.ingredient
    );

    if (response.status != 200) {
      this.makeToast({
        vm: this,
        msg: "No se pudo modificar el ingrediente.",
        title: "Ingredients",
        variant: "danger",
      });
    }
  },
};

const mounted = function () {
  this.ingredient.id = this.ingredientIdFromUrl();
  if (this.ingredient.id != null) {
    // Obtenemos el ingrediente
    const ingredient = this.getIngredient(this.ingredient.id);
    // Clonado de objeto para evitar reactividad no deseada ya que la modificacion se hace
    // a traves de updateIngredient y el objeto enviado por el servidor
    Object.assign(this.ingredient, ingredient);
  }
};
export default { computed, methods, data, mounted };
</script>

<style>
</style>