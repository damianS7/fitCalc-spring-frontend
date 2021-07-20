<template>
  <b-col cols="12">
    <b-row class="text-center mt-3 mb-3" align-v="center">
      <b-col cols="2">
        <font-awesome-icon icon="arrow-left" @click="prevDay" />
      </b-col>
      <b-col cols="8">
        <b-form-datepicker
          today-button
          reset-button
          close-button
          :date-format-options="{
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
          }"
          v-model="selectedDate"
          value-as-date
          locale="es"
        ></b-form-datepicker>
      </b-col>
      <b-col cols="2">
        <font-awesome-icon icon="arrow-right" @click="nextDay" />
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col>
        <b-row>
          <b-col>Calorias restantes</b-col>
        </b-row>
        <b-row>
          <b-col>Objetivo</b-col>
          <b-col>Alimento</b-col>
          <b-col>Restantes</b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-row class="mb-3">
          <b-col cols="12">
            <b-row>
              <b-col cols="10">Desayuno</b-col>
              <b-col cols="2" class="text-right">
                <font-awesome-icon
                  v-b-toggle.breakfast-collapse
                  icon="arrow-down"
                />
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <b-collapse id="breakfast-collapse" class="mt-2">
                  <b-card>Hello!</b-card>
                </b-collapse>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col cols="12">
            <b-row>
              <b-col cols="10">Comida</b-col>
              <b-col cols="2" class="text-right">
                <font-awesome-icon
                  v-b-toggle.lunch-collapse
                  icon="arrow-down"
                />
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <b-collapse id="lunch-collapse" class="mt-2">
                  <b-card>Hello!</b-card>
                </b-collapse>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col cols="12">
            <b-row>
              <b-col cols="10">Merienda</b-col>
              <b-col cols="2" class="text-right">
                <font-awesome-icon
                  v-b-toggle.supper-collapse
                  icon="arrow-down"
                />
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <b-collapse id="supper-collapse" class="mt-2">
                  <b-card>Hello!</b-card>
                </b-collapse>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col cols="12">
            <b-row>
              <b-col cols="10">Cena</b-col>
              <b-col cols="2" class="text-right">
                <font-awesome-icon
                  v-b-toggle.dinner-collapse
                  icon="arrow-down"
                />
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <b-collapse id="dinner-collapse" class="mt-2">
                  <b-card>Hello!</b-card>
                </b-collapse>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col cols="12">
            <b-row>
              <b-col cols="10">Aperitivos</b-col>
              <b-col cols="2" class="text-right">
                <font-awesome-icon
                  v-b-toggle.snack-collapse
                  icon="arrow-down"
                />
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <b-collapse id="snack-collapse" class="mt-2">
                  <b-card>Hello!</b-card>
                </b-collapse>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-col>
</template>
<script>
const data = function () {
  return {
    selectedDate: this.today(),
  };
};
const methods = {
  today() {
    return new Date();
  },
  prevDay() {
    let prevDayDate = new Date();
    prevDayDate.setDate(this.selectedDate.getDate() - 1);
    this.selectedDate = prevDayDate;
  },
  nextDay() {
    let nextDayDate = new Date();
    nextDayDate.setDate(this.selectedDate.getDate() + 1);
    this.selectedDate = nextDayDate;
  },
};
const computed = {
  asdads: function () {},
};

export default {
  methods,
  computed,
  data,
};
</script>
