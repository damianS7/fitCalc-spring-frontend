<template>
  <b-col cols="12">
    <b-row align-v="center" class="widget mb-2">
      <b-col cols="8">
        <b>{{ ingredient.name }} </b>
        <small> ( {{ ingredient.kcals }} kcals )</small>
      </b-col>
      <b-col cols="4" class="text-right">
        <span> Atras </span>
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
              @update="recalculateKcals(ingredient)"
              placeholder="Grasas por 100g"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mb-2">
          <b-col cols="12">
            <b-form-input
              type="number"
              v-model="ingredient.proteins"
              @update="recalculateKcals(ingredient)"
              placeholder="Proteinas por 100g"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mb-3">
          <b-col cols="12">
            <b-form-input
              type="number"
              v-model="ingredient.carbohydrates"
              @update="recalculateKcals(ingredient)"
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
  return {};
};

const computed = {
  ...mapGetters({
    getIngredient: "getIngredient",
    calculateKcals: "calculateKcals",
  }),
  ingredient: function () {
    const ingredientId = this.$route.params.ingredientId;
    return this.getIngredient(ingredientId);
  },
};

const methods = {
  recalculateKcals() {
    this.ingredient.kcals = this.calculateKcals(this.ingredient);
  },
  makeToast(msg, variant) {
    this.$bvToast.toast(msg, {
      title: "Ingredient",
      autoHideDelay: 5000,
      appendToast: true,
      solid: true,
      toaster: "b-toaster-bottom-right",
      variant: variant,
    });
  },
  async updateIngredient() {
    let responseStatus = await this.$store.dispatch(
      "updateIngredient",
      this.ingredient
    );

    if (responseStatus == 200) {
      this.makeToast("Modificado con exito.", "success");
    } else {
      this.makeToast("No se pudo modificar el ingredient.", "danger");
    }
  },
};
export default { computed, methods, data };
</script>

<style>
</style>