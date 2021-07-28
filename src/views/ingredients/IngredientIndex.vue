<template>
  <b-col cols="12">
    <b-row align-v="center" class="widget mb-2">
      <b-col cols="10">
        <b>Ingredientes</b>
      </b-col>
      <b-col class="text-right">
        <router-link :to="{ path: '/ingredients/new' }">
          <b-button class="btn-sm" variant="primary"> + </b-button>
        </router-link>
      </b-col>
    </b-row>
    <b-row class="mb-2 widget">
      <b-col cols="12">
        <b-form-input
          v-model="searchFilter"
          placeholder="Busca un ingrediente"
        ></b-form-input>
      </b-col>
    </b-row>
    <b-row class="widget">
      <ingredient-list
        :ingredients="ingredients"
        :deleteIngredient="deleteIngredient"
      ></ingredient-list>
    </b-row>
  </b-col>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import IngredientList from "@/views/ingredients/IngredientList.vue";
const components = { "ingredient-list": IngredientList };
const data = function () {
  return {
    searchFilter: "",
  };
};

const methods = {
  // ...mapActions({ deleteIngredient: "deleteIngredient" }),
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
  async deleteIngredient(ingredient) {
    let confirmed = await this.deleteIngredientConfirmed(ingredient.name);
    if (confirmed) {
      let responseStatus = await this.$store.dispatch(
        "deleteIngredient",
        ingredient.id
      );
      if (responseStatus == 200) {
        this.makeToast("Eliminado con exito.", "success");
      } else {
        this.makeToast("No se pudo eliminar el ingrediente.", "danger");
      }
    }
  },
  async deleteIngredientConfirmed(ingredientName) {
    return await this.$bvModal.msgBoxConfirm(
      "Deseas borrar el ingrediente: " + ingredientName,
      {
        title: "Borrar Ingrediente.",
        size: "sm",
        buttonSize: "sm",
        okVariant: "danger",
        okTitle: "YES",
        cancelTitle: "NO",
        hideHeaderClose: true,
        centered: true,
      }
    );
  },
};

const computed = {
  ...mapGetters({ getIngredients: "getIngredients" }),
  ingredients: function () {
    return this.getIngredients().filter((ingredient) =>
      ingredient.name.toLowerCase().includes(this.searchFilter.toLowerCase())
    );
  },
};

export default { computed, components, data, methods };
</script>

<style>
</style>