<template>
  <b-row class="widget">
    <b-col cols="4">
      <b-img
        alt="Vue logo"
        rounded="circle"
        fluid-grow
        src="@/assets/images/avatar.png"
      />
    </b-col>
    <b-col cols="8">
      <b-row>Peso {{ lastWeight }} </b-row>
      <b-row>Altura {{ profile.lenght }}</b-row>
      <b-row>Edad {{ profile.age }}</b-row>
    </b-col>
  </b-row>
</template>
<script>
import { mapGetters, mapState } from "vuex";

const computed = {
  ...mapState({
    profile: "profile",
  }),
  ...mapGetters({
    lastWeight: "getLastWeight",
  }),
};

export default {
  computed,
};
</script>