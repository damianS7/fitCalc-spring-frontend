<template>
  <b-row>
    <b-col cols="12">
      <b-row class="m-1">
        <b-col cols="10">
          {{ ingredient.name }}
        </b-col>
        <b-col cols="2">
          <router-link :to="{ path: '/ingredients/' + ingredientId() }">
            <b-button class="btn-sm" variant="primary">
              <font-awesome-icon icon="edit" />
            </b-button>
          </router-link>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
import { mapGetters } from "vuex";
const props = ["ingredient"];
const computed = {
  ...mapGetters({ ingredients: "getIngredients" }),
};
const methods = {
  ingredientId() {
    return this.ingredient.id.toString();
  },
};
export default { computed, props, methods };
</script>

<style>
</style>