<template>
  <b-row>
    <b-col cols="12">
      <b-row class="m-1">
        <b-col cols="8">
          {{ ingredient.name }}
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
    </b-col>
  </b-row>
</template>
<script>
const props = { ingredient: Object, deleteIngredient: Function };
export default { props };
</script>

<style>
</style>