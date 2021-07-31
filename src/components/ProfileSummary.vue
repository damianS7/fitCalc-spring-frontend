<template>
  <b-col cols="12">
    <b-row>
      <b-col cols="4">
        <b-img
          alt="Vue logo"
          rounded="circle"
          fluid-grow
          src="@/assets/images/avatar.png"
        />
      </b-col>
      <b-col cols="8" class="text-right">
        <b-row>
          <b-col>Peso</b-col>
          <b-col>{{ lastWeight() }} kg</b-col>
        </b-row>
        <b-row>
          <b-col>Altura</b-col>
          <b-col>{{ profile.height }} cm</b-col>
        </b-row>
        <b-row>
          <b-col>Edad</b-col>
          <b-col>{{ profile.age }}</b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-col>
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