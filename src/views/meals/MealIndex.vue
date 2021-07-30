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
    <b-row class="widget mb-3">
      <b-col cols="12">
        <meal
          v-for="(meal, index) of meals"
          :key="index"
          :mealKey="index"
          :mealName="meals[index].name"
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
    // return new Date();
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
    foods: "getFoods",
    getSetting: "getSetting",
    dateToString: "dateToString",
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
