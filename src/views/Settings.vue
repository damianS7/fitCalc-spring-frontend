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
  </b-col>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
const data = function () {
  return {
    meals: {
      meal1: { name: "breakfast" },
      meal2: { name: "supper" },
      meal3: { name: "lunch" },
      meal4: { name: "dinner" },
      meal5: { name: "snacks" },
    },
  };
};
const methods = {
  ...mapActions({ makeToast: "makeToast" }),
  async saveMeals() {
    const response = await this.$store.dispatch("settings/saveSetting", {
      key: "meals",
      value: JSON.stringify(this.meals),
    });

    if (response.status != 200) {
      this.makeToast({
        vm: this,
        msg: "No se pudo guardar los cambios.",
        title: "Settings",
        variant: "danger",
      });
    }
  },
};

const computed = {
  ...mapGetters({
    setting: "settings/getSetting",
  }),
};

const mounted = function () {
  const meals = this.setting("meals");
  Object.keys(meals).forEach((key) => {
    Object.assign(this.meals[key], "name", meals[key]);
  });
};

export default {
  computed,
  data,
  methods,
  mounted,
};
</script>
<style>
</style>