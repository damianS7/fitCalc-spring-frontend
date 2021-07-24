<template>
  <b-col>
    <b-row class="mb-1 widget">
      <meal-summary></meal-summary>
    </b-row>
    <b-row class="mb-1 widget">
      <b-col>
        <b-row class="mb-1" align-v="center">
          <b-col cols="4">Proteinas</b-col>
          <b-col cols="8">
            <b-progress value="100" show-progress></b-progress>
          </b-col>
        </b-row>
        <b-row class="mb-1" align-v="center">
          <b-col cols="4">Carbohidratos</b-col>
          <b-col cols="8">
            <b-progress value="100" show-progress></b-progress>
          </b-col>
        </b-row>
        <b-row class="mb-1" align-v="center">
          <b-col cols="4">Grasas</b-col>
          <b-col cols="8">
            <b-progress value="100" show-progress></b-progress>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import MealSummary from "@/components/MealSummary.vue";
const components = {
  "meal-summary": MealSummary,
};
export default {
  components,
};
</script>

<style>
</style>