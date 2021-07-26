<template>
  <b-row>
    <b-col cols="12">
      <b-row class="m-1">
        <b-col cols="10">
          {{ food.name }}
        </b-col>
        <b-col cols="2">
          <router-link :to="{ path: '/foods/' + foodId() }">
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
const props = ["food"];
const computed = {
  ...mapGetters({ ingredients: "getIngredients" }),
};
const methods = {
  foodId() {
    return this.food.id.toString();
  },
};
export default { computed, props, methods };
</script>

<style>
</style>