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
      </b-col>
    </b-row>

    <b-row class="widget mt-3 mb-1">
      <b-col>
        <b-button
          @click="saveSettings"
          type="submit"
          variant="primary"
          class="w-100"
          >Actualizar</b-button
        >
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

const data = function () {
  return {
    meal: "",
  };
};
const methods = {
  async saveSettings() {
    let responseStatus = await this.$store.dispatch("saveSettings");

    if (responseStatus == 200) {
      this.makeToast("Modificado con exito.", "success");
    } else {
      this.makeToast("No se pudo guardar.", "danger");
    }
  },
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
};

const computed = {
  ...mapGetters({
    setting: "getSetting",
  }),
  meals: function () {
    return this.setting("meals");
  },
};

const components = {};

export default {
  components,
  computed,
  data,
  methods,
};
</script>
<style>
</style>