<template>
  <b-col cols="12">
    <b-row class="mb-1 widget">
      <profile-summary></profile-summary>
    </b-row>
    <b-row class="mb-1 widget">
      <meal-summary :date="date"></meal-summary>
    </b-row>
    <b-row class="mb-1 widget">
      <b-col>
        <weight-chart :chartData="chartData()"></weight-chart>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import MealSummary from "@/components/MealSummary.vue";
import ProfileSummary from "@/components/ProfileSummary.vue";
import WeightChart from "@/components/WeightChart.vue";
import { mapGetters } from "vuex";
const components = {
  "profile-summary": ProfileSummary,
  "weight-chart": WeightChart,
  "meal-summary": MealSummary,
};
const methods = {};

const computed = {
  ...mapGetters({
    chartData: "weight/chartData",
    dateToString: "app/dateToString",
  }),
  date: function () {
    return this.dateToString(new Date());
  },
};
export default {
  methods,
  components,
  computed,
};
</script>
