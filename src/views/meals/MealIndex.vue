<template>
  <b-col cols="12">
    <b-row class="mb-3 widget">
      <meal-summary :date="selectedDate"></meal-summary>
    </b-row>
    <b-row class="text-center widget mb-3" align-v="center">
      <b-col cols="2">
        <font-awesome-icon icon="arrow-left" @click="prevDay" />
      </b-col>
      <b-col cols="8">
        <b-form-datepicker
          today-button
          reset-button
          close-button
          :date-format-options="{
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
          }"
          v-model="selectedDate"
          value-as-date
          locale="es"
        ></b-form-datepicker>
      </b-col>
      <b-col cols="2">
        <font-awesome-icon icon="arrow-right" @click="nextDay" />
      </b-col>
    </b-row>
    <b-row class="widget mb-3">
      <b-col cols="12">
        <meal
          v-for="(meal, index) of meals"
          :key="index"
          :mealKey="index"
          :meal="meal.name"
          :date="selectedDate"
        ></meal>
      </b-col>
    </b-row>
  </b-col>
</template>
<script>
import { mapGetters } from "vuex";
import Meal from "@/views/meals/Meal.vue";
import MealSummary from "@/components/MealSummary.vue";
const components = { meal: Meal, "meal-summary": MealSummary };
const data = function () {
  return {
    selectedDate: this.today(),
  };
};
const methods = {
  today() {
    return new Date();
  },
  prevDay() {
    let prevDayDate = new Date();
    prevDayDate.setDate(this.selectedDate.getDate() - 1);
    this.selectedDate = prevDayDate;
  },
  nextDay() {
    let nextDayDate = new Date();
    nextDayDate.setDate(this.selectedDate.getDate() + 1);
    this.selectedDate = nextDayDate;
  },
};
const computed = {
  ...mapGetters({ foods: "getFoods", getSetting: "getSetting" }),
  meals: function () {
    // console.log(Object.keys(this.getSetting("meals")));
    // console.log(Object.entries(this.getSetting("meals")));
    // console.log(Object.values(this.getSetting("meals")));
    return Object.values(this.getSetting("meals"));
    // return Object.entries(this.getSetting("meals"));
  },
};

export default {
  methods,
  components,
  computed,
  data,
};
</script>
