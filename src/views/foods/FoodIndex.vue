<template>
  <b-col cols="12">
    <b-row align-v="center" class="widget mb-2">
      <b-col cols="10">
        <b>Comidas</b>
      </b-col>
      <b-col class="text-right">
        <router-link :to="{ path: '/foods/new' }">
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
          placeholder="Busca una comida"
        ></b-form-input>
      </b-col>
    </b-row>
    <b-row class="widget">
      <food-list :foods="foods" :deleteFood="deleteFood"></food-list>
    </b-row>
  </b-col>
</template>
<script>
import { mapGetters } from "vuex";
import FoodList from "@/views/foods/FoodList.vue";
const components = { "food-list": FoodList };
const data = function () {
  return {
    searchFilter: "",
  };
};

const computed = {
  ...mapGetters({ getFoods: "getFoods" }),
  foods: function () {
    return this.getFoods().filter((food) =>
      food.name.toLowerCase().includes(this.searchFilter.toLowerCase())
    );
  },
};

const methods = {
  // ...mapActions({ deleteIngredient: "deleteIngredient" }),
  makeToast(msg, variant) {
    this.$bvToast.toast(msg, {
      title: "Comida",
      autoHideDelay: 5000,
      appendToast: true,
      solid: true,
      toaster: "b-toaster-bottom-right",
      variant: variant,
    });
  },
  async deleteFood(food) {
    let confirmed = await this.deleteFoodConfirm(food);
    if (confirmed) {
      let responseStatus = await this.$store.dispatch("deleteFood", food.id);
      if (responseStatus == 200) {
        this.makeToast("Eliminado con exito.", "success");
      } else {
        this.makeToast("No se pudo eliminar la comida.", "danger");
      }
    }
  },
  async deleteFoodConfirm(food) {
    return await this.$bvModal.msgBoxConfirm("Deseas borrar: " + food.name, {
      title: "Borrar Comida.",
      size: "sm",
      buttonSize: "sm",
      okVariant: "danger",
      okTitle: "YES",
      cancelTitle: "NO",
      hideHeaderClose: true,
      centered: true,
    });
  },
};

export default { computed, components, data, methods };
</script>

<style>
</style>