<template>
  <b-row class="mb-3">
    <b-col cols="12">
      <b-row align-v="center">
        <b-col cols="8">
          <b>{{ mealName.toUpperCase() }} </b>
          <small>({{ kcal }} kcal)</small>
        </b-col>
        <b-col cols="4" class="text-right">
          <b-button
            @click="foodPicker(mealName, mealKey)"
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
      <b-row>
        <b-col cols="12">
          <b-collapse :id="mealKey + '-collapse'" class="mt-2">
            <b-row class="mb-1">
              <b-col>
                <meal-food-list
                  :foods="foods"
                  :mealKey="mealKey"
                  :mealName="mealName"
                  :mealDate="date"
                ></meal-food-list>
              </b-col>
            </b-row>
          </b-collapse>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
import { mapGetters } from "vuex";
import MealFoodList from "@/views/meals/MealFoodList.vue";
const components = {
  "meal-food-list": MealFoodList,
};
const props = {
  mealName: String,
  mealKey: String,
  date: String,
  foodPicker: Function,
};

const data = function () {
  return {
    totalKcal: 0,
    selectedFoodId: null,
  };
};

const methods = {
  addFood() {
    if (this.selectedFoodId == null) {
      return;
    }

    this.$store.dispatch("addFoodToMeal", {
      mealKey: this.mealKey,
      mealDate: this.date,
      foodId: this.selectedFoodId,
    });
  },
};

const computed = {
  ...mapGetters({
    getMealsFromDate: "getMealsFromDate",
    getIngredient: "getIngredient",
    getFood: "getFood",
    getFoods: "getFoods",
  }),
  foods: function () {
    let foods = [];
    // Obtenemos todos las meals de la fecha (desayuno, merienda etc ...)
    let meals = this.getMealsFromDate(this.date);

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
  kcal: function () {
    let kcals = 0;
    let meals = this.getMealsFromDate(this.date);

    if (typeof meals === "undefined") {
      return kcals;
    }

    let foodsId = meals[this.mealKey];
    if (typeof foodsId === "undefined") {
      return kcals;
    }

    foodsId.forEach((foodId) => {
      const food = this.getFood(foodId);
      if (typeof food === "undefined") {
        return;
      }

      food.ingredients.forEach((id) => {
        const ingredient = this.getIngredient(id);
        kcals += ingredient.kcals;
      });
    });

    return kcals;
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
