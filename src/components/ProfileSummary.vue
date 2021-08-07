<template>
  <b-col cols="12">
    <b-row>
      <b-col cols="4" class="pr-0 pl-1 text-center">
        <b-img
          alt="Vue logo"
          rounded="circle"
          fluid-grow
          src="@/assets/images/avatar.png"
        />
      </b-col>
      <b-col cols="8" class="text-left">
        <b-row>
          <b-col cols="5">
            <b>User</b>
          </b-col>
          <b-col class="text-right">
            <i>{{ user.username }}</i>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="5"><b>Email</b></b-col>
          <b-col class="text-right">
            <i v-b-tooltip.hover placement="top" :title="user.email">{{
              emailTrim
            }}</i>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6"><b>Peso</b></b-col>
          <b-col class="text-right">{{ lastWeight() }} kg</b-col>
        </b-row>
        <b-row>
          <b-col cols="6"><b>Altura</b></b-col>
          <b-col class="text-right">{{ profile.height }} cm</b-col>
        </b-row>
        <b-row>
          <b-col cols="6"><b>Edad</b></b-col>
          <b-col class="text-right">{{ profile.age }}</b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row> </b-row>
  </b-col>
</template>
<script>
import { mapGetters } from "vuex";

const computed = {
  ...mapGetters({
    lastWeight: "weight/getLastWeight",
    profile: "profile/getProfile",
    user: "user/getUser",
  }),
  emailTrim: function () {
    const lenght = this.user.email.lenght;
    return this.user.email.substring(0, 5) + "...";
  },
};
const mounted = function () {};

export default {
  computed,
  mounted,
};
</script>
<style>
</style>