<template>
  <b-row>
    <b-col cols="12">
      <b-row class="mb-1">
        <b-col cols="8">
          <b>
            {{ food.name }}
          </b>
          <small> ( {{ foodKcals(food) }} kcals ) </small>
        </b-col>
        <b-col cols="4" class="text-right">
          <b-button-group>
            <b-button @click="deleteFood(food)" class="btn-sm" variant="danger">
              <font-awesome-icon icon="trash" />
            </b-button>
            <router-link
              tag="button"
              class="btn btn-sm btn-primary"
              :to="{ path: '/foods/' + foodId() }"
            >
              <font-awesome-icon icon="edit" />
            </router-link>
          </b-button-group>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
import { mapGetters } from "vuex";
const props = { food: Object, deleteFood: Function };
const computed = {
  ...mapGetters({
    foodKcals: "app/foodKcals",
  }),
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