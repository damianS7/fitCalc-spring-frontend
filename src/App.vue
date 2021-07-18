<template>
  <b-container class="h-100">
    <b-row v-if="!isLogged" class="h-100">
      <login></login>
    </b-row>

    <b-row
      v-if="isLogged"
      align-v="center"
      class="justify-content-center h-100 p-3"
    >
      <b-col cols="12" md="10" lg="8" class="side">
        <sidebar :toggleProfile="toggleProfile"></sidebar>
        <header-component
          :title="user.username"
          :toggleMenu="toggleProfile"
        ></header-component>
        <b-row align-v="start" class="content">
          <router-view></router-view>
        </b-row>
        <footer-component></footer-component>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import Login from "@/components/Login.vue";
import Header from "@/layout/Header.vue";
import Footer from "@/layout/Footer.vue";
import Sidebar from "@/layout/Sidebar.vue";
import Dashboard from "@/views/Dashboard.vue";

const components = {
  Login,
  dashboard: Dashboard,
  sidebar: Sidebar,
  "header-component": Header,
  "footer-component": Footer,
};
const methods = {
  toggleProfile() {
    var div = document.getElementsByClassName("sidebar")[0];
    if (div.style.left == "-100%" || div.style.left == "") {
      div.style.left = "0%";
      return;
    }
    div.style.left = "-100%";
  },
};
const computed = {
  ...mapState({
    user: "user",
  }),
  ...mapGetters({
    isLogged: "isLogged",
  }),
};

export default { components, methods, computed };
</script>
<style>
@import "./assets/css/app.css";
</style>

