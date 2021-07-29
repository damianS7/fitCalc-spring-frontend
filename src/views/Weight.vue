<template>
  <b-col cols="12">
    <b-row class="mb-2">
      <b-col cols="12">
        <h1>Seguimiento</h1>
      </b-col>
    </b-row>

    <b-row class="mb-1 widget">
      <b-col>
        <b-row>
          <b-col class="mb-3">
            <weight-chart :chartData="chartData"> </weight-chart>
          </b-col>
        </b-row>

        <b-row class="mb-1">
          <b-col cols="12" sm="10" class="mb-2">
            <b-form-select
              id="inline-form-custom-select-pref"
              v-model="selectedWeightDate"
              :options="getWeights"
            >
              <template #first>
                <b-form-select-option :value="null" disabled>
                  Selecciona la fecha del peso a borrar
                </b-form-select-option>
              </template>
            </b-form-select>
          </b-col>
          <b-col class="mb-2">
            <b-button
              @click="deleteSelectedWeight"
              class="w-100"
              variant="danger"
              >-</b-button
            >
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" sm="10" class="mb-2">
            <b-form-input
              id="weight"
              v-model="weight"
              type="number"
              min="1"
              max="400"
              placeholder="Introduce tu peso de hoy"
            ></b-form-input>
          </b-col>
          <b-col class="mb-2">
            <b-button @click="addWeight()" class="w-100" variant="primary"
              >+</b-button
            >
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import WeightChart from "@/components/WeightChart.vue";
const components = { "weight-chart": WeightChart };
const data = function () {
  return {
    selectedWeightDate: null,
    weight: null,
  };
};

const computed = {
  ...mapState({
    user: "user",
    profile: "profile",
  }),
  ...mapGetters({
    lastWeight: "getLastWeight",
    getWeights: "getWeightsDates",
    chartData: "getChartDataWeights",
  }),
};

const methods = {
  addWeight() {
    if (this.weight == null) {
      return;
    }
    this.$store.dispatch("addWeight", this.weight);
  },
  deleteSelectedWeight() {
    if (this.selectedWeightDate == null) {
      return;
    }

    this.$store.dispatch("deleteWeight", this.selectedWeightDate);
  },
};

export default {
  components,
  computed,
  methods,
  data,
};
</script>
<style>
</style>