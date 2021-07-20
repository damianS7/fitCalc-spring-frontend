<template>
  <b-row class="mb-3">
    <b-col cols="12">
      <b-row>
        <b-col cols="10">{{ meal.toUpperCase() }} (... kcal)</b-col>
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
                :mealName="meal"
                :mealDate="dateToString()"
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
import DiaryMealFoodList from "@/views/diary/DiaryMealFoodList.vue";
const components = { "meal-food-list": DiaryMealFoodList };
const props = ["meal", "date"];
const methods = {
  dateToString() {
    let day = this.date.getDate();
    let month = this.date.getMonth() + 1;
    let year = this.date.getFullYear();
    return day + "-" + month + "-" + year;
  },
};
const computed = {
  ...mapGetters({ getMealFoods: "getMealFoods" }),
  foods: function () {
    let foods = this.getMealFoods(this.dateToString());
    if (foods != null) {
      return foods[this.meal];
    }
  },
};

export default {
  components,
  computed,
  props,
  methods,
};
</script>
