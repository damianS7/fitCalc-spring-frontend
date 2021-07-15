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
      <b-col cols="12" sm="10" md="7" class="side">
        <sidebar :toggleProfile="toggleProfile"></sidebar>
        <header-component
          title="DAMIANS7"
          :toggle="toggleProfile"
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
import { mapGetters } from "vuex";
import Login from "@/components/Login.vue";
import Header from "@/views/Header.vue";
import Footer from "@/views/Footer.vue";
import Sidebar from "@/views/Sidebar.vue";
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
  ...mapGetters({
    isLogged: "isLogged",
  }),
};

export default { components, methods, computed };
</script>
<style>
html,
body {
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.header,
.content,
.footer {
  padding: 10px;
  margin: 0;
}

.header {
  height: 60px;
  border-bottom: 1px solid black;
}

.footer {
  height: 60px;
  border-top: 1px solid black;
}

.content {
  height: calc(100% - 120px);
  overflow-y: auto;
  overflow-x: hidden;
  word-break: break-all;
  margin: 0;
}

.side {
  padding: 0;
  margin: 0;
  height: 100%;
  /*width: 100%;*/
  position: relative;
  overflow: hidden;
  top: 0;
  background: rgb(226, 226, 226);
  border-radius: 5px;
  box-shadow: 0 -0 5px teal;
}

.sidebar {
  background: #eee;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0%;
  left: -100%;
  -webkit-transition: left 1s ease;
  transition: left 1s ease;
}
</style>

