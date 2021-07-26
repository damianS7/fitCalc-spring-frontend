<template>
  <b-col cols="12">
    <b-row align-v="center" class="mb-3">
      <b-col cols="12" class="text-right"
        >Atras
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
    name: "",
    fats: 0,
    proteins: 0,
    carbohydrates: 0,
  };
};

const methods = {
  newIngredient() {
    if (this.name.length == 0) {
      return;
    }

    this.$store.dispatch("newIngredient", {
      id: null,
      name: this.name,
      fats: this.fats,
      carbohydrates: this.carbohydrates,
      proteins: this.proteins,
    });
  },
};
export default { methods, data };
</script>

<style>
</style>