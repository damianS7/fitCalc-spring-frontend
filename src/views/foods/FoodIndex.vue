<template>
  <b-col cols="12">
    <b-row align-v="center" class="widget mb-2">
      <b-col cols="10">
        <b>Comidas</b>
      </b-col>
      <b-col cols="2" class="text-right">
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
import { mapGetters, mapActions } from "vuex";
import FoodList from "@/views/foods/FoodList.vue";
const components = { "food-list": FoodList };
const data = function () {
  return {
    searchFilter: "",
  };
};

const computed = {
  ...mapGetters({ getFoods: "foods/getFoods" }),
  foods: function () {
    return this.getFoods().filter((food) =>
      food.name.toLowerCase().includes(this.searchFilter.toLowerCase())
    );
  },
};

const methods = {
  ...mapActions({
    confirmDialog: "app/confirmDialog",
    makeToast: "app/makeToast",
  }),

  async deleteFood(food) {
    const confirmed = await this.confirmDialog({
      vm: this,
      msg: "Deseas eliminar " + food.name,
    });

    if (confirmed) {
      let response = await this.$store.dispatch("foods/deleteFood", food.id);
      if (response.status != 200) {
        this.makeToast({
          vm: this,
          msg: "No se pudo eliminar la comida.",
          title: "Comidas",
          variant: "danger",
        });
      }
    }
  },
};

export default { computed, components, data, methods };
</script>

<style>
</style>