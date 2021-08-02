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
          :date="selectedDate"
          :foodPicker="foodPicker"
        ></meal>
      </b-col>
    </b-row>
    <b-row>
      <food-picker
        :mealKey="foodPickerMealKey"
        :mealName="foodPickerMealName"
        :date="selectedDate"
      ></food-picker>
    </b-row>
  </b-col>
</template>
<script>
import { mapGetters } from "vuex";
import Meal from "@/views/meals/Meal.vue";
import Macro from "@/components/Macro.vue";
import MealSummary from "@/components/MealSummary.vue";
import MealFoodPicker from "@/views/meals/MealFoodPicker.vue";
const components = {
  meal: Meal,
  "meal-summary": MealSummary,
  "food-picker": MealFoodPicker,
  "macro-slot": Macro,
};
const data = function () {
  return {
    selectedDate: this.today(),
    foodPickerMealKey: null,
    foodPickerMealName: null,
  };
};
const methods = {
  foodPicker(mealName, mealKey) {
    this.foodPickerMealName = mealName;
    this.foodPickerMealKey = mealKey;
    this.$bvModal.show("foodPicker");
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
    getSetting: "settings/getSetting",
    dateToString: "app/dateToString",
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
