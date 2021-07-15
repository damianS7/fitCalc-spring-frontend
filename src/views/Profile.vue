<template>
  <b-col cols="12">
    <b-row>
      <profile-header></profile-header>
    </b-row>
  </b-col>
</template>

<script>
import ProfileHeader from "@/views/ProfileHeader.vue";
const components = { "profile-header": ProfileHeader };

export default { components };
</script>
