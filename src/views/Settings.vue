<template>
  <b-col cols="12">
    <b-row class="mb-1">
      <b-col cols="12">
        <h1>Configuracion</h1>
      </b-col>
    </b-row>

    <b-row class="mb-1">
      <b-col> <h6>Comidas del dia:</h6> </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col cols="10">
        <b-form-select
          text-field="name"
          value-field="id"
          v-model="selectedMeal"
          :options="meals"
        >
          <template #first>
            <b-form-select-option :value="null" disabled>
            </b-form-select-option>
          </template>
        </b-form-select>
      </b-col>
      <b-col cols="2">
        <b-button @click="deleteMeal()" class="btn-block" variant="danger"
          >-</b-button
        >
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col cols="10">
        <b-form-input type="text" v-model="newMealName"> </b-form-input>
      </b-col>
      <b-col cols="2">
        <b-button @click="addMeal()" class="btn-block" variant="primary"
          >+</b-button
        >
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-button type="submit" variant="primary" class="w-100"
          >Actualizar</b-button
        >
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

const data = function () {
  return {
    selectedMeal: null,
    meal: "",
    newMealName: "",
  };
};
const methods = {
  ...mapActions({
    addMealToSettings: "addMealToSettings",
    deleteMealFromSettings: "deleteMealFromSettings",
  }),
  addMeal() {
    if (this.newMealName.length > 0) {
      this.addMealToSettings(this.newMealName);
    }
  },
  deleteMeal() {
    if (this.selectedMeal == null) {
      return;
    }
    this.deleteMealFromSettings(this.newMealName);
  },
};

const computed = {
  ...mapGetters({
    setting: "getSetting",
  }),
  meals: function () {
    return this.setting("mealNames");
  },
};

const components = {};

export default {
  components,
  computed,
  data,
  methods,
};
</script>
<style>
</style>