<template>
  <b-row align-v="center" class="header">
    <b-col cols="2" sm="1">
      <a href="#">
        <font-awesome-icon @click="toggleMenu" icon="bars" />
      </a>
    </b-col>
    <b-col> {{ title }} </b-col>
  </b-row>
</template>
<script>
const props = ["title", "toggleMenu"];
export default { props };
</script>