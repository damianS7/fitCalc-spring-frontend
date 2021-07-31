<template>
  <b-col>
    <b-row align-v="center">
      <b-col cols="8">
        <a href="#">
          <font-awesome-icon @click="toggleMenu" icon="bars" />
        </a>
        <b> {{ this.$route.name.toUpperCase() }} </b>
      </b-col>
      <b-col cols="4" class="text-right">
        <b-button class="btn-sm" @click="$router.go(-1)">
          Atras
          <font-awesome-icon icon="arrow-circle-left" />
        </b-button>
      </b-col>
    </b-row>
  </b-col>
</template>
<script>
const props = ["title", "toggleMenu"];
export default { props };
</script>