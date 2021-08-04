<template>
  <b-col class="sidebar" cols="10">
    <b-row class="header m-0" align-v="center">
      <b-col cols="2" sm="1">
        <a href="#">
          <font-awesome-icon @click="toggleSidebar" icon="times" />
        </a>
      </b-col>
      <b-col> MENU </b-col>
    </b-row>

    <b-row class="content">
      <b-col cols="12">
        <b-row class="mb-1 widget">
          <profile-summary></profile-summary>
        </b-row>
        <b-row class="menu">
          <b-col cols="12">
            <b-row>
              <b-col cols="2" sm="1">
                <font-awesome-icon icon="home" />
              </b-col>
              <b-col>
                <router-link @click.native="toggleSidebar" to="/">
                  Inicio
                </router-link>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="2" sm="1">
                <font-awesome-icon icon="book" />
              </b-col>
              <b-col>
                <router-link @click.native="toggleSidebar" to="/meals">
                  Registro de Comidas
                </router-link>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="2" sm="1">
                <font-awesome-icon icon="signal" />
              </b-col>
              <b-col>
                <router-link @click.native="toggleSidebar" to="/weight">
                  Progreso
                </router-link>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="2" sm="1">
                <font-awesome-icon icon="egg" />
              </b-col>
              <b-col>
                <router-link @click.native="toggleSidebar" to="/ingredients">
                  Ingredientes
                </router-link>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="2" sm="1">
                <font-awesome-icon icon="utensils" />
              </b-col>
              <b-col>
                <router-link @click.native="toggleSidebar" to="/foods">
                  Comidas
                </router-link>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="2" sm="1">
                <font-awesome-icon icon="cog" />
              </b-col>
              <b-col>
                <router-link @click.native="toggleSidebar" to="/settings">
                  Ajustes
                </router-link>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="2" sm="1">
                <font-awesome-icon icon="sign-out-alt" />
              </b-col>
              <b-col>
                <router-link @click.native="logout" to="#">
                  Logout
                </router-link>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import ProfileSummary from "@/components/ProfileSummary.vue";
const components = { "profile-summary": ProfileSummary };
const props = { toggleSidebar: Function };
const methods = {
  logout() {
    this.$store.dispatch("user/logout");
    this.toggleSidebar();
  },
};

export default { props, components, methods };
</script>
<style>
.side {
  padding: 0;
  margin: 0;
  height: 100%;
  position: relative;
  overflow: hidden;
  top: 0;
  border-radius: 5px;
  box-shadow: 0 -0 5px gray;
}

.sidebar {
  padding: 0;
  margin: 0;
  height: 100%;
  position: absolute;
  top: 0%;
  left: -100%;
  -webkit-transition: left 1s ease;
  transition: left 1s ease;
  box-shadow: 0 0 12px gray;
  z-index: 9999;
}

.sidebar .content {
  height: calc(100% - 60px);
}

.sidebar .content .menu .row {
  margin: 12px 0;
}
</style>