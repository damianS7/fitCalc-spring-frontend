<template>
  <b-col cols="12">
    <b-row align-v="center" class="widget mb-2">
      <b-col>
        <b-form-input type="text" v-model="food.name"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="widget mb-2" align-v="center">
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
      <b-col cols="2" class="text-right">
        <b-button @click="addIngredient" class="btn-sm" variant="primary"
          ><font-awesome-icon icon="plus-square"
        /></b-button>
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
          <b-col cols="2" class="text-right">
            <b-button
              @click="removeIngredient(ingredientId)"
              class="btn-sm"
              variant="danger"
            >
              <font-awesome-icon icon="trash" />
            </b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row class="widget mb-1">
      <b-col cols="12">
        <b-button
          v-if="isEditing()"
          @click="updateFood"
          type="submit"
          variant="primary"
          class="w-100"
          >Actualizar</b-button
        >
        <b-button
          v-if="!isEditing()"
          @click="createFood"
          type="submit"
          variant="primary"
          class="w-100"
          >Crear</b-button
        >
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

const data = function () {
  return {
    selectedIngredientId: null,
    food: { id: null, name: "Sin nombre", ingredients: [] },
  };
};

const methods = {
  ...mapActions({ makeToast: "app/makeToast" }),
  isEditing() {
    if (this.food.id == null) {
      return false;
    }
    return true;
  },
  foodIdFromUrl() {
    const foodId = this.$route.params.foodId;
    if (typeof foodId === "undefined") {
      return null;
    }
    return foodId;
  },
  addIngredient() {
    if (this.selectedIngredientId == null) {
      return;
    }

    this.food.ingredients.push(this.selectedIngredientId);
  },
  removeIngredient(ingredientId) {
    this.food.ingredients.pop(ingredientId);
  },
  async createFood() {
    if (this.food.name.length == 0) {
      return;
    }

    const response = await this.$store.dispatch("food/addFood", this.food);

    if (response.status != 200) {
      this.makeToast({
        vm: this,
        msg: "No se pudo agregar la comida.",
        title: "Comidas",
        variant: "danger",
      });
    }
  },
  async updateFood() {
    const response = await this.$store.dispatch("food/updateFood", this.food);

    if (response.status != 200) {
      this.makeToast({
        vm: this,
        msg: "No se pudo actualizar la comida.",
        title: "Comidas",
        variant: "danger",
      });
    }
  },
};

const computed = {
  ...mapGetters({
    getFood: "food/getFood",
    getIngredient: "ingredient/getIngredient",
    getIngredients: "ingredient/getIngredients",
  }),
};

const mounted = function () {
  this.food.id = this.foodIdFromUrl();
  if (this.food.id != null) {
    const food = this.getFood(this.food.id);
    // Clonado de objeto para evitar reactividad no deseada ya que la modificacion se hace
    // a traves de updateIngredient y el objeto enviado por el servidor
    Object.assign(this.food, food);
  }
};

export default { computed, methods, data, mounted };
</script>

<style>
</style>