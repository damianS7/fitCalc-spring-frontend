<template>
  <b-col cols="12">
    <b-row class="mb-1 widget">
      <b-col>
        <b-row>
          <b-col class="mb-3">
            <weight-chart :chartData="chartData()"> </weight-chart>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col cols="9">
            <b-form-input
              v-model="weight"
              type="number"
              min="1"
              max="400"
              placeholder="Tu peso de hoy"
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
import { mapActions, mapGetters } from "vuex";
import WeightChart from "@/components/WeightChart.vue";
const components = { "weight-chart": WeightChart };
const data = function () {
  return {
    weight: 0,
  };
};

const computed = {
  ...mapGetters({
    chartData: "weight/chartData",
  }),
};

const methods = {
  ...mapActions({ makeToast: "app/makeToast" }),
  async addWeight() {
    if (this.weight == 0 || this.weight == null) {
      return;
    }
    const response = await this.$store.dispatch(
      "weight/addWeight",
      this.weight
    );
    if (response.status != 200) {
      this.makeToast({
        vm: this,
        msg: "No se pudo agregar el peso.",
        title: "SEGUIMIENTO",
        variant: "danger",
      });
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