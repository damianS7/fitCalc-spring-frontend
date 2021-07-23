<template>
  <b-col cols="12">
    <b-row>
      <b-col cols="4">
        <router-link to="/">
          <font-awesome-icon icon="home" />
        </router-link>
      </b-col>
      <b-col cols="4">
        <router-link to="/meals-record">
          <font-awesome-icon icon="book" />
        </router-link>
      </b-col>
      <b-col cols="4">
        <router-link to="/profile">
          <font-awesome-icon icon="user" />
        </router-link>
      </b-col>
    </b-row>
  </b-col>
</template>