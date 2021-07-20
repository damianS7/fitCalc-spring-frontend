<template>
  <b-col cols="12">
    <b-row>
      <b-col cols="9"> Peso actual </b-col>
      <b-col> lastWeight </b-col>
    </b-row>
    <b-row>
      <b-col cols="9"> Objetivo </b-col>
      <b-col>
        <b-form-select id="inline-form-custom-select-pref">
          <template #first>
            <b-form-select-option :value="null" disabled>
            </b-form-select-option>
          </template>
        </b-form-select>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="9"> Calorias </b-col>
      <b-col> 2234 </b-col>
    </b-row>
    <b-row>
      <b-col cols="9"> Carbohidratos (220g) </b-col>
      <b-col>
        <b-form-select id="inline-form-custom-select-pref">
          <template #first>
            <b-form-select-option :value="null" disabled>
            </b-form-select-option>
          </template>
        </b-form-select>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="9"> Proteinas (220g) </b-col>
      <b-col>
        <b-form-select id="inline-form-custom-select-pref">
          <template #first>
            <b-form-select-option :value="null" disabled>
            </b-form-select-option>
          </template>
        </b-form-select>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="9"> Grasas (220g) </b-col>
      <b-col>
        <b-form-select id="inline-form-custom-select-pref">
          <template #first>
            <b-form-select-option :value="null" disabled>
            </b-form-select-option>
          </template>
        </b-form-select>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col cols="12">
        <b-button type="submit" variant="primary" class="w-100"
          >Actualizar</b-button
        >
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
export default {};
</script>

<style>
</style>