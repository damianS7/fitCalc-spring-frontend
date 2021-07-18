<template>
  <b-row class="widget">
    <b-col>
      <b-row>
        <b-col>
          <weight-chart
            :data="chartData"
            :chartData="chartData"
            :options="chartOptions()"
          >
          </weight-chart>
        </b-col>
      </b-row>

      <b-row>
        <label class="mr-sm-2">Tus pesos</label>
      </b-row>
      <b-row>
        <b-col cols="10">
          <b-form-select
            id="inline-form-custom-select-pref"
            v-model="selectedWeightDate"
            :options="getWeights"
            text-field="date"
            value-field="date"
            class="mb-2 mr-sm-2 mb-sm-0 w-100 h-100"
          >
            <template #first>
              <b-form-select-option :value="null" disabled>
                Selecciona un peso
              </b-form-select-option>
            </template>
          </b-form-select>
        </b-col>
        <b-col>
          <b-button @click="deleteSelectedWeight" class="w-100" variant="danger"
            >-</b-button
          >
        </b-col>
      </b-row>

      <b-row>
        <label class="mr-sm-2">Nuevo peso</label>
      </b-row>
      <b-row>
        <b-col cols="10">
          <b-form-input
            id="weight"
            v-model="add_weight"
            type="number"
            min="1"
            max="400"
            placeholder="Introduce tu peso"
          ></b-form-input>
        </b-col>
        <b-col>
          <b-button @click="addWeight()" class="w-100" variant="primary"
            >+</b-button
          >
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import WeightChart from "@/views/profile/WeightChart.vue";
const components = { "weight-chart": WeightChart };
const computed = {
  ...mapState({
    user: "user",
    profile: "profile",
  }),
  ...mapGetters({
    lastWeight: "getLastWeight",
    getWeights: "getWeights",
  }),
  chartData: function () {
    let data = { labels: [], datasets: [] };
    let dataset = { label: "Peso (kg)", backgroundColor: "#6495ED", data: [] };
    const weights = this.getWeights;

    weights.forEach((obj) => {
      data.labels.push(obj.date);
      dataset.data.push(obj.weight);
    });

    data.datasets.push(dataset);
    return data;
  },
};

const data = function () {
  return {
    selectedWeightDate: null,
    weightOptions: ["a", "b", "c"],
    add_weight: "",
  };
};

const methods = {
  chartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      /*parsing: {
        yAxisKey: "weight",
        xAxisKey: "date",
      },*/
    };
  },
  chartData2() {
    let data = { labels: [], datasets: [] };
    let dataset = { label: "Peso (kg)", backgroundColor: "#6495ED", data: [] };
    const weights = this.getWeights;

    weights.forEach((obj) => {
      data.labels.push(obj.date);
      dataset.data.push(obj.weight);
    });

    data.datasets.push(dataset);
    return data;
  },
  addWeight() {
    const date = "31-01-2021";
    const weight = { weight: this.add_weight, date };
    this.$store.dispatch("addWeight", weight);
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