<template>
  <b-row class="profile header bg-success">
    <b-col cols="3">
      <b-img alt="Vue logo" rounded fluid-grow src="@/assets/logo.png" />
    </b-col>
    <b-col cols="9">
      <b-row>Peso</b-row>
      <b-row>Altura</b-row>
      <b-row>Edad</b-row>
    </b-col>
  </b-row>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "ProfileHeader",
};
</script>
<style scoped>
.profile.header {
  height: 120px;
}
</style>