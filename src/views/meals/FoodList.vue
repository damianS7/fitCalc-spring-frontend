<template>
  <b-row>
    <b-col cols="12">
      <slot v-for="(food, index) of foods">
        <b-row class="food">
          <b-col cols="12">
            <b-button
              class="btn-sm"
              variant="danger"
              @click="removeFood(mealDate, mealKey, food, index)"
            >
              <font-awesome-icon icon="trash" />
            </b-button>
            {{ food.name }}
            <b-badge pill variant="primary">
              {{ foodKcals(food) }} kcal
            </b-badge>
          </b-col>
        </b-row>
      </slot>
    </b-col>
  </b-row>
</template>
<script>
import { mapGetters } from "vuex";
const props = {
  foods: Array,
  mealKey: String,
  mealName: String,
  mealDate: String,
  removeFood: Function,
};
const computed = {
  ...mapGetters({
    foodKcals: "food/foodKcals",
  }),
};
export default { props, computed };
</script>
<style>
.meal .food {
  margin: 10px 0;
  padding: 0;
}
</style>