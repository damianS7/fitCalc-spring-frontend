<template>
  <b-col cols="12">
    <b-row>
      <b-col>
        <profile-summary></profile-summary>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <weight-chart :chartData="chartData"></weight-chart>
      </b-col>
    </b-row>
    <p>Calorias consumidas, restantes y objetivo</p>
  </b-col>
</template>

<script>
import ProfileSummary from "@/components/ProfileSummary.vue";
import WeightChart from "@/components/WeightChart.vue";
import { mapGetters } from "vuex";
const components = {
  "profile-summary": ProfileSummary,
  "weight-chart": WeightChart,
};
const computed = {
  ...mapGetters({
    chartData: "getChartDataWeights",
  }),
};
export default {
  components,
  computed,
};
</script>
