<template>
  <b-col cols="12">
    <b-row class="text-center widget mb-2" align-v="center">
      <b-col cols="2">
        <font-awesome-icon icon="arrow-left" @click="prevDay" />
      </b-col>
      <b-col cols="8">
        <b-form-datepicker
          today-button
          close-button
          :date-format-options="{
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }"
          v-model="selectedDate"
        ></b-form-datepicker>
      </b-col>
      <b-col cols="2">
        <font-awesome-icon icon="arrow-right" @click="nextDay" />
      </b-col>
    </b-row>
    <b-row class="mb-2 widget">
      <meal-summary :date="selectedDate"></meal-summary>
    </b-row>
    <b-row class="mb-2 widget">
      <macro-slot :date="selectedDate"></macro-slot>
    </b-row>
    <b-row>
      <b-col cols="12" class="p-0">
        <meal
          v-for="(meal, index) of meals"
          :key="index"
          :mealKey="index"
          :mealName="meals[index].name"
          :mealDate="selectedDate"
          :addFood="addFood"
          :removeFood="removeFood"
        ></meal>
      </b-col>
    </b-row>
  </b-col>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Meal from "@/views/meals/Meal.vue";
import Macro from "@/components/Macro.vue";
import MealSummary from "@/components/MealSummary.vue";

const components = {
  meal: Meal,
  "meal-summary": MealSummary,
  "macro-slot": Macro,
};
const data = function () {
  return {
    selectedDate: this.today(),
  };
};
const methods = {
  ...mapActions({
    confirmDialog: "app/confirmDialog",
    makeToast: "app/makeToast",
  }),
  async addFood(mealDate, mealKey, foodId) {
    let mealsDay = JSON.parse(JSON.stringify(this.getMeal(mealDate)));
    mealsDay[mealKey].push(foodId);
    this.updateMeal(mealsDay);
  },
  async removeFood(mealDate, mealKey, food, foodIndex) {
    // Se muestra un dialogo para confirmar el borrado
    const confirmed = await this.confirmDialog({
      vm: this,
      msg: "Deseas eliminar " + food.name,
    });

    // Si el usuario confirma el borrado ...
    if (!confirmed) {
      return;
    }

    let mealsDay = JSON.parse(JSON.stringify(this.getMeal(mealDate)));
    mealsDay[mealKey].splice(foodIndex, 1);
    this.updateMeal(mealsDay);
  },
  async updateMeal(meal) {
    const response = await this.$store.dispatch("meal/updateMeal", meal);
    if (response.status != 200) {
      this.makeToast({
        vm: this,
        msg: "No se pudo agregar la comida.",
        title: "Comidas",
      });
    }
  },
  today() {
    return new Date().toISOString().split("T")[0];
  },
  prevDay() {
    let prevDayDate = new Date(this.selectedDate);
    prevDayDate.setDate(prevDayDate.getDate() - 1);
    this.selectedDate = this.dateToString(prevDayDate);
  },
  nextDay() {
    let nextDayDate = new Date(this.selectedDate);
    nextDayDate.setDate(nextDayDate.getDate() + 1);
    this.selectedDate = this.dateToString(nextDayDate);
  },
};
const computed = {
  ...mapGetters({
    getSetting: "setting/getSetting",
    dateToString: "app/dateToString",
    getMeal: "meal/getMealsFromDate",
  }),
  meals: function () {
    return this.getSetting("meals");
  },
};
export default {
  methods,
  components,
  computed,
  data,
};
</script>
