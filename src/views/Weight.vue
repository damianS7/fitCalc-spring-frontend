<template>
  <b-col cols="12">
    <b-row class="mb-1 widget">
      <b-col>
        <b-row>
          <b-col class="mb-3">
            <weight-chart :chartData="chartData()"> </weight-chart>
          </b-col>
        </b-row>

        <b-row class="mb-2">
          <b-col cols="9">
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
          <b-col cols="3" class="text-right">
            <b-button @click="deleteSelectedWeight" variant="danger">
              <font-awesome-icon icon="trash"
            /></b-button>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col cols="9">
            <b-form-input
              id="weight"
              v-model="weight"
              type="number"
              min="1"
              max="400"
              placeholder="Introduce tu peso de hoy"
            ></b-form-input>
          </b-col>
          <b-col cols="3" class="mb-2 text-right">
            <b-button @click="addWeight()" variant="primary"
              ><font-awesome-icon icon="plus-square"
            /></b-button>
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
  makeToast(msg, variant) {
    this.$bvToast.toast(msg, {
      title: "SEGUIMIENTO",
      autoHideDelay: 5000,
      appendToast: true,
      solid: true,
      toaster: "b-toaster-bottom-right",
      variant: variant,
    });
  },
  async addWeight() {
    if (this.weight == null) {
      return;
    }
    let responseStatus = await this.$store.dispatch("addWeight", this.weight);
    if (responseStatus != 200) {
      this.makeToast("No se pudo agregar el peso.", "danger");
    }
  },
  async deleteSelectedWeight() {
    if (this.selectedWeightDate == null) {
      return;
    }

    let response = await this.$store.dispatch(
      "deleteWeight",
      this.selectedWeightDate
    );

    if (response.status != 200) {
      this.makeToast("No se pudo eliminar el peso.", "danger");
    }
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