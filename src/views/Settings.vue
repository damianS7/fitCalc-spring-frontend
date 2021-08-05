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
            <b-row class="mb-1" v-for="(meal, key) of meals" :key="key">
              <b-col cols="12">
                <b-form-input
                  @change="updateSetting(key)"
                  type="text"
                  v-model="meals[key]"
                />
              </b-col>
            </b-row>
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
      meal1: "breakfast",
      meal2: "supper",
      meal3: "lunch",
      meal4: "dinner",
      meal5: "snacks",
    },
  };
};
const methods = {
  ...mapActions({ makeToast: "app/makeToast" }),
  async updateSetting(settingKey) {
    const response = await this.$store.dispatch("setting/updateSetting", {
      key: settingKey,
      value: this.meals[settingKey],
    });

    if (response.status != 200) {
      this.makeToast({
        vm: this,
        msg: "No se pudo guardar los cambios.",
        title: "Settings",
      });
    }
  },
};

const computed = {
  ...mapGetters({
    getSetting: "setting/getSetting",
    mealKeys: "meal/getMealKeys",
  }),
};

const mounted = function () {
  const meals = this.mealKeys();
  meals.forEach((key) => {
    this.meals[key] = this.getSetting(key);
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