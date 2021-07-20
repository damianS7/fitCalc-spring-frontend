<template>
  <b-col class="sidebar" cols="10">
    <b-col cols="12" class="header">
      <b-row align-v="center" class="m-0">
        <b-col cols="2" sm="1">
          <a href="#">
            <font-awesome-icon @click="toggleProfile" icon="times" />
          </a>
        </b-col>
        <b-col> MENU </b-col>
      </b-row>
    </b-col>

    <b-col cols="12" class="content">
      <profile-summary></profile-summary>
      <b-row class="menu">
        <b-col cols="12">
          <b-row>
            <b-col cols="2" sm="1">
              <font-awesome-icon icon="home" />
            </b-col>
            <b-col>
              <router-link to="/"> Inicio </router-link>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="2" sm="1">
              <font-awesome-icon icon="book" />
            </b-col>
            <b-col>
              <router-link to="/diary"> Registro </router-link>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="2" sm="1">
              <font-awesome-icon icon="signal" />
            </b-col>
            <b-col>
              <router-link to="/weight"> Progreso </router-link>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="2" sm="1">
              <font-awesome-icon icon="bullseye" />
            </b-col>
            <b-col>
              <router-link to="/goals"> Objetivos </router-link>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="2" sm="1">
              <font-awesome-icon icon="chart-pie" />
            </b-col>
            <b-col>
              <router-link to="/food-stats"> Nutricion </router-link>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="2" sm="1">
              <font-awesome-icon icon="egg" />
            </b-col>
            <b-col>
              <router-link to="/ingredients"> Ingredientes </router-link>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="2" sm="1">
              <font-awesome-icon icon="utensils" />
            </b-col>
            <b-col>
              <router-link to="/foods"> Comidas </router-link>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="2" sm="1">
              <font-awesome-icon icon="shoe-prints" />
            </b-col>
            <b-col>
              <router-link to="/diary"> Pasos </router-link>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="2" sm="1">
              <font-awesome-icon icon="cog" />
            </b-col>
            <b-col>
              <router-link to="/diary"> Ajustes </router-link>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="2" sm="1">
              <font-awesome-icon icon="question-circle" />
            </b-col>
            <b-col>
              <router-link to="/diary"> Ayuda </router-link>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-col>
  </b-col>
</template>

<script>
import ProfileSummary from "@/components/ProfileSummary.vue";
const components = { "profile-summary": ProfileSummary };
const props = ["toggleProfile"];
export default { props, components };
</script>
<style>
</style>