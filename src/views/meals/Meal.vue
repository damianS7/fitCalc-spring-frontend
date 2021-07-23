<template>
  <b-row class="mb-3">
    <b-col cols="12">
      <b-row>
        <b-col cols="10">{{ meal.toUpperCase() }} ({{ kcal }})</b-col>
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
            <b-row class="mb-1">
              <b-col cols="10">
                <b-form-select
                  text-field="name"
                  value-field="id"
                  v-model="selectedFoodId"
                  :options="getFoods"
                >
                  <template #first>
                    <b-form-select-option :value="null" disabled>
                      Selecciona una comida para agregar
                    </b-form-select-option>
                  </template>
                </b-form-select>
              </b-col>
              <b-col cols="2">
                <b-button @click="addFood" class="btn-block" variant="primary"
                  >+</b-button
                >
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-card>
                  <meal-food-list
                    :foodIdList="foods"
                    :addKcal="addKcal"
                    :mealName="meal"
                    :mealDate="date"
                  ></meal-food-list>
                </b-card>
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
const components = { "meal-food-list": MealFoodList };
const props = ["meal", "date"];

const data = function () {
  return {
    totalKcal: 0,
    selectedFoodId: null,
  };
};

const methods = {
  addKcal(kcal) {
    this.totalKcal += kcal;
  },
  addFood() {
    if (this.selectedFoodId == null) {
      return;
    }

    this.$store.dispatch("addFoodToMeal", {
      mealName: this.meal,
      mealDate: this.date,
      foodId: this.selectedFoodId,
    });
  },
};

const computed = {
  ...mapGetters({
    getMealFoods: "getMealFoods",
    getFoodIngredients: "getMealFoods",
    ingredients: "getIngredients",
    getIngredient: "getIngredient",
    getFood: "getFood",
    getFoods: "getFoods",
  }),
  foods: function () {
    let foods = this.getMealFoods(this.date);
    if (foods != null) {
      return foods[this.meal];
    }
  },
  kcal: function () {
    let foods = this.getMealFoods(this.date);
    if (foods != null) {
      let foodKcal = 0;

      foods[this.meal].forEach((foodId) => {
        const food = this.getFood(foodId);
        food.ingredients.forEach((ingredientId) => {
          const ingredient = this.getIngredient(ingredientId);
          const ingredientKcal =
            ingredient.fats * 9 +
            ingredient.proteins * 4 +
            ingredient.carbohydrates * 4;

          foodKcal += ingredientKcal;
        });
      });
      return foodKcal;
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
