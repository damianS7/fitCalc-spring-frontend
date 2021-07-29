<template>
  <b-col cols="12">
    <b-row class="mb-1 widget">
      <b-col>
        <b-row class="mb-2">
          <b-col>
            <b>Comidas del dia</b>
          </b-col>
        </b-row>

        <b-row class="mb-1">
          <b-col>
            <b-row class="mb-1" v-for="(meal, index) of meals" :key="index">
              <b-col cols="12">
                <b-form-input type="text" v-model="meal.name" />
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col>
            <b-button
              @click="saveMeals()"
              type="submit"
              variant="primary"
              class="w-100"
              >Actualizar</b-button
            >
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-row class="mb-1 widget">
      <b-col>
        <b-row class="mb-2">
          <b-col> <b>Cambiar password</b> </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col>
            <b-row class="mb-1">
              <b-col cols="12"><span>Nueva password</span></b-col>
              <b-col cols="12">
                <b-form-input type="text" />
              </b-col>
            </b-row>
            <b-row class="mb-1">
              <b-col cols="12"><span>Repetir password</span></b-col>
              <b-col cols="12">
                <b-form-input type="text" />
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="mb-1">
          <b-col>
            <b-button
              @click="saveSetting('meals')"
              type="submit"
              variant="primary"
              class="w-100"
              >Cambiar password</b-button
            >
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { mapGetters } from "vuex";
import Vue from "vue";

const data = function () {
  return {
    meals: {
      0: { name: "desayuno" },
      1: { name: "almuerzo" },
      2: { name: "merienda" },
      3: { name: "cena" },
      4: { name: "aperitivos" },
    },
  };
};
const methods = {
  makeToast(msg, variant) {
    this.$bvToast.toast(msg, {
      title: "Settings",
      autoHideDelay: 5000,
      appendToast: true,
      solid: true,
      toaster: "b-toaster-bottom-right",
      variant: variant,
    });
  },
  async saveMeals() {
    let responseStatus = await this.$store.dispatch("saveSetting", {
      key: "meals",
      value: JSON.stringify(this.meals),
    });

    if (responseStatus == 200) {
      this.makeToast("Modificado con exito.", "success");
    } else {
      this.makeToast("No se pudo guardar.", "danger");
    }
  },
  
};

const computed = {
  ...mapGetters({
    setting: "getSetting",
  }),
};

const mounted = function () {
  const meals = this.setting("meals");
  Object.keys(meals).forEach((key) => {
    Vue.set(this.meals, key, meals[key]);
  });
};

const components = {};

export default {
  components,
  computed,
  data,
  methods,
  mounted,
};
</script>
<style>
</style>