<template>
  <b-row class="mb-2 meal widget">
    <b-col cols="12">
      <b-row align-v="center" class="header">
        <b-col cols="8" class="pr-0">
          <b>{{ mealName.toUpperCase() }} </b>
          <b-badge pill variant="primary"> {{ kcals }} kcal</b-badge>
        </b-col>
        <b-col cols="4" class="text-right pl-0">
          <b-button
            @click="showFoodPicker"
            class="btn-sm mr-1"
            variant="primary"
          >
            <font-awesome-icon icon="plus-square" />
          </b-button>
          <b-button class="btn-sm" v-b-toggle="[mealKey + '-collapse']">
            <font-awesome-icon icon="arrow-down" />
          </b-button>
        </b-col>
      </b-row>
      <b-collapse :id="mealKey + '-collapse'">
        <b-row class="m-0 body">
          <b-col cols="12">
            <food-list
              :foods="foods"
              :mealKey="mealKey"
              :mealName="mealName"
              :mealDate="mealDate"
              :removeFood="removeFood"
            ></food-list>
          </b-col>
        </b-row>
      </b-collapse>
    </b-col>
  </b-row>
</template>
<script>
import { mapGetters } from "vuex";
import FoodList from "@/views/meals/FoodList.vue";
const components = {
  "food-list": FoodList,
};
const props = {
  mealName: String,
  mealKey: String,
  mealDate: String,
  showFoodPicker: Function,
  removeFood: Function,
};

const data = function () {
  return {
    totalKcal: 0,
    selectedFoodId: null,
  };
};

const methods = {};

const computed = {
  ...mapGetters({
    mealKcal: "meal/mealKcal",
    getMealsFromDate: "meal/getMealsFromDate",
    getFood: "food/getFood",
  }),
  // Alimentos de esta comida (desayuno, merienda ...)
  foods: function () {
    let foods = [];
    // Obtenemos todos las meals de la fecha (desayuno, merienda etc ...)
    let meals = this.getMealsFromDate(this.mealDate);

    // Si no existen comidas(profile.meals[this.date]) para la fecha indicada ...
    if (typeof meals === "undefined") {
      return foods;
    }

    let foodIds = meals[this.mealKey];
    // Si no existe la meal indicada ... (puede haber meals sin algun comida)
    if (typeof foodIds === "undefined") {
      return foods;
    }

    foodIds.forEach((foodId) => {
      const food = this.getFood(foodId);
      if (typeof food !== "undefined") {
        foods.push(food);
      }
    });
    return foods;
  },
  kcals: function () {
    const meals = this.getMealsFromDate(this.mealDate);
    const meal = meals[this.mealKey];
    return this.mealKcal(meal);
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
<style>
.meal {
  margin: 0px;
}

.food > div[class*="col-"],
.meal > div[class*="col-"] {
  padding: 0;
}

.meal.widget {
  padding: 0 !important;
}

.meal .header {
  background: none;
  box-shadow: none;
  padding: 0;
  margin: 0;
  border-radius: 0;
  border: none;
}

.meal .body {
  border-top: 1px solid black;
}
</style>