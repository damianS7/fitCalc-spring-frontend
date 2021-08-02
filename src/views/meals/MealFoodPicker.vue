<template>
  <b-col>
    <b-modal
      id="foodPicker"
      hide-footer
      scrollable
      centered
      content-class="h-100"
      title="Agrega una comida"
    >
      <b-row>
        <b-col cols="12">
          <b-row class="mb-2 widget">
            <b-col cols="12">
              <b-form-input
                v-model="searchFilter"
                placeholder="Busca una comida"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="widget">
            <b-col>
              <b-row
                v-for="(food, index) of foods"
                :key="index"
                align-v="center"
                class="mb-1"
              >
                <b-col cols="8">{{ food.name }}</b-col>
                <b-col cols="4" class="text-right">
                  <b-button
                    @click="addFood(food.id)"
                    variant="primary"
                    class="btn-sm"
                    ><font-awesome-icon icon="plus-square"></font-awesome-icon
                  ></b-button>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-modal>
  </b-col>
</template>
<script>
import { mapGetters } from "vuex";
const props = {
  mealName: String,
  mealKey: String,
  date: String,
};

const data = function () {
  return {
    searchFilter: "",
  };
};

const methods = {
  addFood(foodId) {
    this.$store.dispatch("meals/addFoodToMeal", {
      mealKey: this.mealKey,
      mealDate: this.date,
      foodId,
    });
  },
};

const computed = {
  ...mapGetters({ getFoods: "foods/getFoods" }),
  foods: function () {
    return this.getFoods().filter((food) =>
      food.name.toLowerCase().includes(this.searchFilter.toLowerCase())
    );
  },
};

export default { props, data, computed, methods };
</script>
<style>
</style>