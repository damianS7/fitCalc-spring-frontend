<template>
  <b-row class="sidebar">
    <b-row class="header">
      <b-col cols="2" sm="1">
        <a href="#">
          <font-awesome-icon @click="toggleProfile" icon="times" />
        </a>
      </b-col>
      <b-col> MENU </b-col>
    </b-row>
    <b-row class="content">
      <profile-summary></profile-summary>
      <b-col class="menu">
        <b-row>
          <b-col cols="2" sm="1">
            <font-awesome-icon icon="home" />
          </b-col>
          <b-col class="">
            <router-link to="/diary"> Inicio </router-link>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="2" sm="1">
            <font-awesome-icon icon="book" />
          </b-col>
          <b-col class="">
            <router-link to="/diary"> Registro </router-link>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="2" sm="1">
            <font-awesome-icon icon="signal" />
          </b-col>
          <b-col class="">
            <router-link to="/diary"> Progreso </router-link>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="2" sm="1">
            <font-awesome-icon icon="bullseye" />
          </b-col>
          <b-col class="">
            <router-link to="/diary"> Objetivos </router-link>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="2" sm="1">
            <font-awesome-icon icon="chart-pie" />
          </b-col>
          <b-col class="">
            <router-link to="/diary"> Nutricion </router-link>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="2" sm="1">
            <font-awesome-icon icon="utensils" />
          </b-col>
          <b-col class="">
            <router-link to="/diary">
              Recetas, Comidas y alimentos
            </router-link>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="2" sm="1">
            <font-awesome-icon icon="tablet" />
          </b-col>
          <b-col class="">
            <router-link to="/diary"> Aplicaciones y dispositivos </router-link>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="2" sm="1">
            <font-awesome-icon icon="shoe-prints" />
          </b-col>
          <b-col class="">
            <router-link to="/diary"> Pasos </router-link>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="2" sm="1">
            <font-awesome-icon icon="cog" />
          </b-col>
          <b-col class="">
            <router-link to="/diary"> Ajustes </router-link>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="2" sm="1">
            <font-awesome-icon icon="question-circle" />
          </b-col>
          <b-col class="">
            <router-link to="/diary"> Ayuda </router-link>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-row>
</template>

<script>
import ProfileSummary from "@/views/profile/ProfileSummary.vue";
const components = { "profile-summary": ProfileSummary };
const props = ["toggleProfile"];
export default { props, components };
</script>
<style>
.sidebar {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 80%;
  position: absolute;
  top: 0%;
  left: -100%;
  -webkit-transition: left 1s ease;
  transition: left 1s ease;
  box-shadow: 0 0 12px gray;
}

.sidebar .content {
  height: calc(100% - 60px);
}

.sidebar .content .menu {
  padding: 0;
}

.sidebar .content .menu .row {
  margin: 12px 0;
}
</style>