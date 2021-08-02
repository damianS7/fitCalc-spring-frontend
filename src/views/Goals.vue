<template>
  <b-col cols="12">
    <b-row>
      <b-col> <b>Objetivos</b> <font-awesome-icon icon="bullseye" /> </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col cols="8"> Calorias diarias </b-col>
      <b-col cols="4">
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
      <b-col cols="8"> Carbohidratos ({{ carbohydrates }}%) </b-col>
      <b-col cols="4">
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
      <b-col cols="8"> Proteinas ({{ proteins }}%) </b-col>
      <b-col cols="4">
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
      <b-col cols="8"> Grasas ({{ fats }}%) </b-col>
      <b-col cols="4">
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
  </b-col>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
const methods = {
  ...mapActions({
    updateGoals: "goals/updateGoals",
    makeToast: "app/makeToast",
  }),
};

const computed = {
  ...mapGetters({ getGoal: "goals/getGoal" }),
  dailyKcal: {
    get() {
      return this.getGoal("kcal");
    },
    async set(value) {
      const response = await this.updateGoals({
        proteins: this.proteins,
        fats: this.fats,
        carbohydrates: this.carbohydrates,
        kcal: value,
      });

      if (response.status != 200) {
        this.makeToast({
          vm: this,
          msg: "No se pudo actualizar el objetivo.",
          title: "Objetivos",
          variant: "danger",
        });
      }
    },
  },
  proteins: {
    get() {
      return this.getGoal("proteins");
    },
    async set(value) {
      const response = await this.updateGoals({
        proteins: value,
        fats: this.fats,
        carbohydrates: this.carbohydrates,
        kcal: this.dailyKcal,
      });

      if (response.status != 200) {
        this.makeToast({
          vm: this,
          msg: "No se pudo actualizar el objetivo.",
          title: "Objetivos",
          variant: "danger",
        });
      }
    },
  },
  carbohydrates: {
    get() {
      return this.getGoal("carbohydrates");
    },
    async set(value) {
      const response = await this.updateGoals({
        proteins: this.proteins,
        fats: this.fats,
        carbohydrates: value,
        kcal: this.dailyKcal,
      });

      if (response.status != 200) {
        this.makeToast({
          vm: this,
          msg: "No se pudo actualizar el objetivo.",
          title: "Objetivos",
          variant: "danger",
        });
      }
    },
  },
  fats: {
    get() {
      return this.getGoal("fats");
    },
    async set(value) {
      const response = await this.updateGoals({
        proteins: this.proteins,
        fats: value,
        carbohydrates: this.carbohydrates,
        kcal: this.dailyKcal,
      });

      if (response.status != 200) {
        this.makeToast({
          vm: this,
          msg: "No se pudo actualizar el objetivo.",
          title: "Objetivos",
          variant: "danger",
        });
      }
    },
  },
};

export default { methods, computed };
</script>

<style>
</style>