<template>
  <b-col>
    <b-row>
      <b-col cols="2" sm="1">
        <a href="#">
          <font-awesome-icon @click="toggleMenu" icon="bars" />
        </a>
      </b-col>
      <b-col cols="10"> {{ title }} </b-col>
    </b-row>
  </b-col>
</template>
<script>
const props = ["title", "toggleMenu"];
export default { props };
</script>