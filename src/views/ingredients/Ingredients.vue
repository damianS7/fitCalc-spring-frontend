<template>
  <b-col cols="12">
    <b-row align-v="center" class="widget mb-2">
      <b-col cols="10">
        <b>Ingredientes</b>
      </b-col>
      <b-col cols="2" class="text-right">
        <router-link :to="{ path: '/ingredients/new' }">
          <b-button class="btn-sm" variant="primary">
            <font-awesome-icon icon="plus-square"></font-awesome-icon>
          </b-button>
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
  ...mapActions({
    confirmDialog: "app/confirmDialog",
    makeToast: "app/makeToast",
  }),
  async deleteIngredient(ingredient) {
    // Se muestra un dialogo para confirmar el borrado
    const confirmed = await this.confirmDialog({
      vm: this,
      msg: "Deseas eliminar " + ingredient.name,
    });

    // Si el usuario confirma el borrado ...
    if (confirmed) {
      const response = await this.$store.dispatch(
        "ingredient/deleteIngredient",
        ingredient.id
      );

      // Si el servidor no elimina el ingrediente, mostramos un mensaje
      if (response.status != 200) {
        this.makeToast({
          vm: this,
          title: "Ingredientes",
          msg: "No se pudo eliminar el ingrediente.",
        });
      }
    }
  },
};

const computed = {
  ...mapGetters({ getIngredients: "ingredient/getIngredients" }),
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