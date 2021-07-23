<template>
  <b-row class="mb-3">
    <b-col cols="12">
      <b-row>
        <b-col cols="10">{{ meal.toUpperCase() }} ({{ totalKcal }})</b-col>
        <b-col cols="2" class="text-right">
          <font-awesome-icon
            v-b-toggle="[meal + '-collapse']"
            icon="arrow-down"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-collapse :id="meal + '-collapse'" class="mt-2">
            <b-card>
              <meal-food-list
                :foodIdList="foods"
                :addKcal="addKcal"
                :mealName="meal"
                :mealDate="date"
              ></meal-food-list>
            </b-card>
          </b-collapse>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
import { mapGetters } from "vuex";
import MealFoodList from "@/views/meals/MealFoodList.vue";
const components = { "meal-food-list": MealFoodList };
const props = ["meal", "date"];

const data = function () {
  return {
    totalKcal: 0,
  };
};

const methods = {
  addKcal(kcal) {
    this.totalKcal += kcal;
  },
};

const computed = {
  ...mapGetters({
    getMealFoods: "getMealFoods",
    getFoodIngredients: "getMealFoods",
  }),
  foods: function () {
    let foods = this.getMealFoods(this.date);
    if (foods != null) {
      return foods[this.meal];
    }
  },
};

const mounted = function () {
  // console.log(this.date);
};

export default {
  data,
  components,
  computed,
  props,
  methods,
  mounted,
};
</script>
