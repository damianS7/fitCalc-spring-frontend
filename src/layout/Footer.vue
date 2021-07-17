<template>
  <b-row align-v="center" class="footer text-center">
    <b-col cols="4">
      <router-link to="/">
        <font-awesome-icon icon="home" />
      </router-link>
    </b-col>
    <b-col cols="4">
      <router-link to="/diary">
        <font-awesome-icon icon="book" />
      </router-link>
    </b-col>
    <b-col cols="4">
      <router-link to="/profile">
        <font-awesome-icon icon="user" />
      </router-link>
    </b-col>
  </b-row>
</template>

<script>
export default {};
</script>
