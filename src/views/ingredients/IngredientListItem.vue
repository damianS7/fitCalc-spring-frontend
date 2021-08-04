<template>
  <b-row class="mb-1">
    <b-col cols="8">
      <b>{{ ingredient.name }} </b>
      <small>
        <b-badge pill variant="primary">{{ ingredient.kcals }} kcals</b-badge>
      </small>
    </b-col>
    <b-col cols="4" class="text-right">
      <b-button-group>
        <b-button
          @click="deleteIngredient(ingredient)"
          class="btn-sm"
          variant="danger"
        >
          <font-awesome-icon icon="trash" />
        </b-button>
        <router-link
          tag="button"
          class="btn btn-sm btn-primary"
          :to="{ path: '/ingredients/' + ingredient.id }"
        >
          <font-awesome-icon icon="edit" />
        </router-link>
      </b-button-group>
    </b-col>
  </b-row>
</template>
<script>
const props = { ingredient: Object, deleteIngredient: Function };
export default { props };
</script>

<style>
</style>