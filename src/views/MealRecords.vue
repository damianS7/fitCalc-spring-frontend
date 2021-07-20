<template>
  <b-col cols="12">
    <b-row class="text-center mt-3 mb-3">
      <b-col cols="3">
        <router-link to="/foods">
          <font-awesome-icon icon="arrow-left" />
        </router-link>
      </b-col>
      <b-col cols="6"> {{ dateToday() }} </b-col>
      <b-col cols="3">
        <router-link to="{ path: '/meal-records/' }">
          <font-awesome-icon icon="arrow-right" />
        </router-link>
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
const methods = {
  dateToday() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth(); //January is 0!
    var yyyy = today.getFullYear();
    return mm + "/" + dd + "/" + yyyy;
  },
  nextDayDate() {},
};
const computed = {};

export default {
  methods,
  computed,
};
</script>
