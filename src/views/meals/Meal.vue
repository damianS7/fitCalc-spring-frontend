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
                  :options="getFoods()"
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
const props = { meal: String, date: Date };

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
      mealName: this.meal,
      mealDate: this.date,
      foodId: this.selectedFoodId,
    });
  },
};

const computed = {
  ...mapGetters({
    getMealsFromDate: "getMealsFromDate",
    getIngredients: "getIngredients",
    getIngredient: "getIngredient",
    getFood: "getFood",
    getFoods: "getFoods",
  }),
  foods: function () {
    // Obtenemos todos las meals de la fecha (desayuno, merienda etc ...)
    let meals = this.getMealsFromDate(this.date);

    if (meals != null) {
      // Accedemos a las comidas del desayuno, merienda o lo que sea
      return meals[this.meal];
    }
  },
  kcal: function () {
    let kcals = 0;
    let meals = this.getMealsFromDate(this.date);

    if (typeof meals === "undefined") {
      return kcals;
    }

    let foodsId = meals[this.meal];
    if (typeof foodsId === "undefined") {
      return kcals;
    }

    foodsId.forEach((foodId) => {
      const food = this.getFood(foodId);
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
