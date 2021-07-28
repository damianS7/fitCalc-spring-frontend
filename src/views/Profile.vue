<template>
  <b-col cols="12" class="profile">
    <b-row class="mb-1 widget">
      <profile-summary></profile-summary>
    </b-row>
    <b-row class="mb-1 widget">
      <b-col>
        <b-form>
          <b-form-group label="Nombre">
            <b-form-input
              id="username"
              type="text"
              v-model="username"
              :placeholder="user.username"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Edad">
            <b-form-input
              type="number"
              v-model="age"
              :placeholder="profile.age.toString()"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Altura" description="En centimetros.">
            <b-form-input
              type="number"
              v-model="height"
              :placeholder="profile.height.toString()"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Email">
            <b-form-input
              id="email"
              type="email"
              v-model="email"
              :placeholder="user.email"
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
const data = function () {
  return {
    username: null,
    email: null,
    password: "",
    repeatedPassword: "",
    age: null,
    height: null,
    weight: null,
  };
};

const methods = {
  updateProfile() {
    // foreachData
    // if not null
    // save
  },
};

const computed = {
  ...mapState({
    user: "user",
    profile: "profile",
  }),
  ...mapGetters({
    lastWeight: "getLastWeight",
  }),
};

const components = {
  "profile-summary": ProfileSummary,
  "weight-chart": Weight,
};

export default {
  components,
  computed,
  data,
  methods,
};
</script>
<style>
</style>