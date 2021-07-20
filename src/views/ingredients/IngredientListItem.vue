<template>
  <b-row>
    <b-col cols="12">
      <b-row class="m-1">
        <b-col cols="10">
          {{ ingredient.name }}
        </b-col>
        <b-col cols="2">
          <router-link :to="{ path: '/ingredients/' + ingredient.id }">
            <b-button class="btn-sm" variant="primary">
              <font-awesome-icon icon="edit" />
            </b-button>
          </router-link>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
const props = ["ingredient"];

export default { props };
</script>

<style>
</style>