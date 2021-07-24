<template>
  <b-col cols="12" class="profile">
    <b-row class="mb-1 widget">
      <profile-summary></profile-summary>
    </b-row>
    <b-row class="mb-1 widget">
      <b-col>
        <b-form>
          <b-form-group label="Tu altura:" description="En centimetros.">
            <b-form-input
              id="height"
              type="text"
              v-model="height"
              placeholder="Introduce tu altura"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Tu nombre:">
            <b-form-input
              id="username"
              type="text"
              v-model="username"
              placeholder="Introduce tu nombre de usuario"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Tu email:">
            <b-form-input
              id="email"
              type="email"
              v-model="email"
              placeholder="Introduce tu correo electronico"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Cambiar password:">
            <b-form-input
              id="pass1"
              type="password"
              v-model="password"
              placeholder="Introduce tu nueva password"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Repite la password:">
            <b-form-input
              id="pass2"
              type="password"
              v-model="repeatedPassword"
              placeholder="Repite tu nueva password"
            ></b-form-input>
          </b-form-group>
          <b-form-group label=" ">
            <b-button type="submit" variant="primary" class="w-100"
              >Actualizar</b-button
            >
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import ProfileSummary from "@/components/ProfileSummary.vue";
import Weight from "@/views/Weight.vue";
import { mapGetters, mapState } from "vuex";

const computed = {
  ...mapState({
    user: "user",
    profile: "profile",
  }),
  ...mapGetters({
    lastWeight: "getLastWeight",
  }),
};

const data = function () {
  return {
    username: "this.user.username",
    email: "user.email",
    password: "******",
    repeatedPassword: "",
    age: 33,
    height: 177,
    weight: 21,
  };
};

const components = {
  "profile-summary": ProfileSummary,
  "weight-chart": Weight,
};

export default {
  components,
  computed,
  data,
};
</script>
<style>
</style>