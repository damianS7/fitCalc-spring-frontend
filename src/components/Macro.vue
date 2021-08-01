<template>
  <b-col>
    <b-row class="mb-1">
      <b-col>
        <b-row class="mb-1" align-v="center">
          <b-col cols="4">Carbos</b-col>
          <b-col cols="8">
            <b-progress value="100" show-progress></b-progress>
          </b-col>
        </b-row>
        <b-row class="mb-1" align-v="center">
          <b-col cols="4">Proteinas</b-col>
          <b-col cols="8">
            <b-progress value="100" show-progress></b-progress>
          </b-col>
        </b-row>
        <b-row class="mb-0" align-v="center">
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
import { mapGetters } from "vuex";

const computed = {};
export default {
  computed,
};
</script>

<style>
</style>