<template>
  <b-col cols="12">
    <b-row align-v="center" class="widget mb-2">
      <b-col cols="8">
        <b>{{ name }} </b>
        <small> ( {{ kcals }} kcal ) </small>
      </b-col>
      <b-col cols="4" class="text-right">
        <span> Atras </span>
        <router-link to="/ingredients">
          <font-awesome-icon icon="arrow-circle-left" />
        </router-link>
      </b-col>
    </b-row>

    <b-row class="widget">
      <b-col>
        <b-row class="mt-2 mb-2">
          <b-col cols="12">
            <b-form-input
              type="text"
              v-model="name"
              placeholder="Nombre del ingrediente"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col cols="12">
            <b-form-input
              type="number"
              v-model="fats"
              placeholder="Grasas por 100g"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mb-2">
          <b-col cols="12">
            <b-form-input
              type="number"
              v-model="proteins"
              placeholder="Proteinas por 100g"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mb-3">
          <b-col cols="12">
            <b-form-input
              type="number"
              v-model="carbohydrates"
              placeholder="Carbohidratos por 100g"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mb-1">
          <b-col>
            <b-button
              @click="newIngredient"
              type="submit"
              variant="primary"
              class="w-100"
              >Crear</b-button
            >
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
const data = function () {
  return {
    name: "Ingrediente",
    fats: 0,
    proteins: 0,
    carbohydrates: 0,
  };
};

const computed = {
  kcals: function () {
    return this.fats * 9 + this.proteins * 4 + this.carbohydrates * 4;
  },
};

const methods = {
  makeToast(msg, variant) {
    this.$bvToast.toast(msg, {
      title: "Ingredient",
      autoHideDelay: 5000,
      appendToast: true,
      solid: true,
      toaster: "b-toaster-bottom-right",
      variant: variant,
    });
  },
  async newIngredient() {
    if (this.name.length == 0) {
      return;
    }

    let responseStatus = await this.$store.dispatch("newIngredient", {
      id: null,
      name: this.name,
      fats: this.fats,
      carbohydrates: this.carbohydrates,
      proteins: this.proteins,
    });

    if (responseStatus == 200) {
      this.makeToast("Agregado con exito.", "success");
    } else {
      this.makeToast("No se pudo agregar el ingredient.", "danger");
    }
  },
};
export default { methods, data, computed };
</script>

<style>
</style>