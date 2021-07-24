<template>
  <b-col cols="12">
    <b-row align-v="center">
      <b-col cols="12">
        <h1>Objetivos</h1>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col cols="9"> Calorias diarias </b-col>
      <b-col>
        <b-form-input
          v-model="dailyKcal"
          type="number"
          step="100"
          min="0"
          max="6000"
          size="sm"
        ></b-form-input>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col cols="9"> Carbohidratos ({{ carbohydrates }}%) </b-col>
      <b-col>
        <b-form-input
          v-model="carbohydrates"
          type="number"
          step="5"
          min="0"
          max="100"
          size="sm"
        ></b-form-input>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col cols="9"> Proteinas ({{ proteins }}%) </b-col>
      <b-col>
        <b-form-input
          v-model="proteins"
          type="number"
          step="5"
          min="0"
          max="100"
          size="sm"
        ></b-form-input>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col cols="9"> Grasas ({{ fats }}%) </b-col>
      <b-col>
        <b-form-input
          v-model="fats"
          type="number"
          step="5"
          min="0"
          max="100"
          size="sm"
        ></b-form-input>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col cols="12">
        <b-button
          @click="saveChanges()"
          type="submit"
          variant="primary"
          class="w-100"
          >Actualizar</b-button
        >
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
const methods = {
  ...mapActions({ updateGoal: "updateGoal" }),
  saveChanges() {},
};

const computed = {
  ...mapGetters({ getGoal: "getGoal" }),
  dailyKcal: {
    get() {
      return this.getGoal("kcal");
    },
    set(value) {
      this.updateGoal({
        goal: "kcal",
        value,
      });
    },
  },
  proteins: {
    get() {
      return this.getGoal("proteins");
    },
    set(value) {
      this.updateGoal({
        goal: "proteins",
        value,
      });
    },
  },
  carbohydrates: {
    get() {
      return this.getGoal("carbohydrates");
    },
    set(value) {
      this.updateGoal({
        goal: "carbohydrates",
        value,
      });
    },
  },
  fats: {
    get() {
      return this.getGoal("fats");
    },
    set(value) {
      this.updateGoal({
        goal: "fats",
        value,
      });
    },
  },
};

export default { methods, computed };
</script>

<style>
</style>