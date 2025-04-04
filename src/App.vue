<template>
  <b-container class="h-100">
    <b-row v-if="!isLogged()" align-v="center" class="h-100">
      <login></login>
    </b-row>
    <b-row
      v-if="isLogged() && !appReady()"
      align-v="center"
      class="h-100 w-100"
    >
      <b-col cols="12">
        <b-overlay show rounded="sm"> </b-overlay>
      </b-col>
    </b-row>
    <b-row
      v-if="isLogged() && appReady()"
      align-v="center"
      class="justify-content-center h-100 p-3"
    >
      <b-col cols="12" md="10" lg="6" class="side">
        <b-row align-v="center" class="header">
          <header-component
            :title="user.username"
            :toggleMenu="toggleSidebar"
          ></header-component>
        </b-row>
        <b-row align-v="start" class="content">
          <router-view></router-view>
        </b-row>
        <b-row align-v="center" class="footer text-center">
          <footer-component></footer-component>
        </b-row>
        <b-row>
          <sidebar :toggleSidebar="toggleSidebar"></sidebar>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import Login from "@/views/Login.vue";
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Dashboard from "@/views/Dashboard.vue";

const components = {
  Login,
  dashboard: Dashboard,
  sidebar: Sidebar,
  "header-component": Header,
  "footer-component": Footer,
};
const methods = {
  toggleSidebar() {
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
    isLogged: "user/isLogged",
    appReady: "app/isAppReady",
  }),
};

const mounted = async function () {
  // Al montar la aplicacion, buscamos si existe un token de session
  const userString = window.sessionStorage.getItem("_user");

  // Si el token existe lo asignamos
  if (userString) {
    this.$store.commit("user/SET_USER", JSON.parse(userString));
  }

  // Al asignar el token, el usuario se entiende por logeado
  if (this.isLogged() && !this.appReady()) {
    // Cargamos los datos necesarios para la app
    await this.$store.dispatch("app/init");
  }

  // Hacer esto en app.js
  // Comprobar que el token no expiro cada X segundos...
  const vm = this;
  const interval = window.setInterval(async function () {
    if (!vm.isLogged()) {
      return;
    }

    // Peticion para comprobar el token con el servidor ...
    const response = await vm.$store.dispatch("app/tokenValidation");
    if (typeof response === "undefined") {
      return;
    }

    // Si no esta logeado (cualquier codigo diferente de 200) ...
    if (response.status != 200) {
      // Detenemos el intervalo ...
      window.clearInterval(interval);

      // Mostrar mensaje informando de que ha expirado
      await vm.$bvModal.msgBoxOk("El token ha expirado ... ", {
        okVariant: "primary",
        okTitle: "Back to login",
        hideHeaderClose: true,
        centered: true,
      });

      // Destruimos la session
      await vm.$store.dispatch("user/logout", null, { root: true });
    }
  }, 30000);
};

export default { components, methods, computed, mounted };
</script>
<style>
@media (max-width: 544px) {
  * {
    font-size: 0.9rem;
  }
}
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
.footer,
.sidebar {
  background: #eeef;
}

.header,
.content,
.footer {
  padding: 5px 12px;
  margin: 0;
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

.content .widget {
  background: #fff;
  padding: 10px 0;
  border-radius: 0.25rem !important;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}

:link,
:visited {
  text-decoration: none;
  color: #212529;
}
</style>

