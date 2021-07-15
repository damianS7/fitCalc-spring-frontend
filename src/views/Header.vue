<template>
  <b-row align-v="center" class="header">
    <b-col cols="2" sm="1">
      <font-awesome-icon @click="toggle" icon="bars" />
    </b-col>
    <b-col> {{ title }} </b-col>
  </b-row>
</template>
<script>
const props = ["title", "toggle"];
export default { props };
</script>