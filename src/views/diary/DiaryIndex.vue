<template>
  <b-col cols="12">
    <b-row class="text-center mt-3 mb-3" align-v="center">
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
    <b-row class="mb-3">
      <b-col>
        <b-row>
          <b-col>Calorias restantes</b-col>
        </b-row>
        <b-row>
          <b-col>Objetivo</b-col>
          <b-col>Alimento</b-col>
          <b-col>Restantes</b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <diary-meal
          v-for="meal of meals"
          :key="meal"
          :meal="meal"
          :date="selectedDate"
        ></diary-meal>
      </b-col>
    </b-row>
  </b-col>
</template>
<script>
import { mapGetters } from "vuex";
import DiaryMeal from "@/views/diary/DiaryMeal.vue";
const components = { "diary-meal": DiaryMeal };
const data = function () {
  return {
    selectedDate: this.today(),
    meals: ["breakfast", "lunch", "supper", "dinner", "snacks"],
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
  ...mapGetters({ foods: "getFoods" }),
};

export default {
  methods,
  components,
  computed,
  data,
};
</script>
