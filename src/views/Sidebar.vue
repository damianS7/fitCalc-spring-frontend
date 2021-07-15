<template>
  <b-row class="sidebar">
    <b-row class="header bg-primary">
      <b-col cols="2" sm="1">
        <font-awesome-icon @click="toggleProfile" icon="times" />
      </b-col>
      <b-col> PROFILE </b-col>
    </b-row>
    <profile-header></profile-header>

    <b-row class="content">
      <b-col>
        <b-row class="m-0">
          <b-col cols="2" class="">
            <font-awesome-icon icon="book" />
          </b-col>
          <b-col class="">
            <router-link to="/diary"> Inicio </router-link>
          </b-col>
        </b-row>
        <b-row class="m-0">
          <b-col cols="2" class="">
            <font-awesome-icon icon="book" />
          </b-col>
          <b-col class="">
            <router-link to="/diary"> Inicio </router-link>
          </b-col>
        </b-row>
        <b-row class="m-0">
          <b-col cols="2" class="">
            <font-awesome-icon icon="book" />
          </b-col>
          <b-col class="">
            <router-link to="/diary"> Inicio </router-link>
          </b-col>
        </b-row>
        <b-row class="m-0">
          <b-col cols="2" class="">
            <font-awesome-icon icon="book" />
          </b-col>
          <b-col class="">
            <router-link to="/diary"> Inicio </router-link>
          </b-col>
        </b-row>
        <b-row class="m-0">
          <b-col cols="2" class="">
            <font-awesome-icon icon="book" />
          </b-col>
          <b-col class="">
            <router-link to="/diary"> Inicio </router-link>
          </b-col>
        </b-row>
        <b-row class="m-0">
          <b-col cols="2" class="">
            <font-awesome-icon icon="book" />
          </b-col>
          <b-col class="">
            <router-link to="/diary"> Inicio </router-link>
          </b-col>
        </b-row>
        <b-row class="m-0">
          <b-col cols="2" class="">
            <font-awesome-icon icon="book" />
          </b-col>
          <b-col class="">
            <router-link to="/diary"> Inicio </router-link>
          </b-col>
        </b-row>
        <b-row class="m-0">
          <b-col cols="2" class="">
            <font-awesome-icon icon="book" />
          </b-col>
          <b-col class="">
            <router-link to="/diary"> Inicio </router-link>
          </b-col>
        </b-row>
        <b-row class="m-0">
          <b-col cols="2" class="">
            <font-awesome-icon icon="book" />
          </b-col>
          <b-col class="">
            <router-link to="/diary"> Inicio </router-link>
          </b-col>
        </b-row>
        <b-row class="m-0">
          <b-col cols="2" class="">
            <font-awesome-icon icon="book" />
          </b-col>
          <b-col class="">
            <router-link to="/diary"> Inicio </router-link>
          </b-col>
        </b-row>
        <b-row class="m-0">
          <b-col cols="2" class="">
            <font-awesome-icon icon="book" />
          </b-col>
          <b-col class="">
            <router-link to="/diary"> Inicio </router-link>
          </b-col>
        </b-row>
        <b-row class="m-0">
          <b-col cols="2" class="">
            <font-awesome-icon icon="book" />
          </b-col>
          <b-col class="">
            <router-link to="/diary"> Inicio </router-link>
          </b-col>
        </b-row>
        <b-row class="m-0">
          <b-col cols="2" class="">
            <font-awesome-icon icon="book" />
          </b-col>
          <b-col class="">
            <router-link to="/diary"> Inicio </router-link>
          </b-col>
        </b-row>
        <b-row class="m-0">
          <b-col cols="2" class="">
            <font-awesome-icon icon="book" />
          </b-col>
          <b-col class="">
            <router-link to="/diary"> Inicio </router-link>
          </b-col>
        </b-row>
        <b-row class="m-0">
          <b-col cols="2" class="">
            <font-awesome-icon icon="book" />
          </b-col>
          <b-col class="">
            <router-link to="/diary"> Inicio </router-link>
          </b-col>
        </b-row>
        <b-row class="m-0">
          <b-col cols="2" class="">
            <font-awesome-icon icon="book" />
          </b-col>
          <b-col class="">
            <router-link to="/diary"> XXDDD </router-link>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-row>
</template>

<script>
import ProfileHeader from "@/views/ProfileHeader.vue";
const components = { "profile-header": ProfileHeader };
const props = ["toggleProfile"];
export default { props, components };
</script>
<style>
.sidebar .content {
  height: calc(100% - 180px);
  padding: 0;
}
</style>