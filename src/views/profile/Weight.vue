<template>
  <b-row class="widget">
    <b-col>
      <b-row>
        <b-col>
          <weight-chart :chartData="chartData"> </weight-chart>
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
                Selecciona la fecha del peso a borrar
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
import WeightChart from "@/components/WeightChart.vue";
const components = { "weight-chart": WeightChart };
const data = function () {
  return {
    selectedWeightDate: null,
    weightOptions: ["a", "b", "c"],
    add_weight: "",
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
    const obj = { date: "31-01-2021", weight: this.add_weight };
    this.$store.dispatch("addWeight", obj);
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