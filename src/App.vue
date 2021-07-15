<template>
  <b-container class="h-100">
    <b-row v-if="!isLogged" class="h-100">
      <login></login>
    </b-row>

    <b-row
      v-if="isLogged"
      align-v="center"
      class="justify-content-center h-100 p-3"
    >
      <b-col cols="12" class="side">
        <b-row class="side-left">
          <b-row align-v="center" class="app-header">
            <b-col cols="1">
              <font-awesome-icon @click="toggleProfile" icon="bars" />
            </b-col>
            <b-col cols="11"> HEADER </b-col>
          </b-row>
          <b-row align-v="start" class="side-content">
            <b-col cols="12">
              <b-row>
                <b-col cols="12">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-row>

        <b-row align-v="center" class="app-header">
          <b-col cols="1">
            <font-awesome-icon @click="toggleProfile" icon="bars" />
          </b-col>
          <b-col cols="11"> HEADER </b-col>
        </b-row>

        <b-row align-v="start" class="app-content">
          <b-col cols="12">
            <b-row>
              <b-col cols="12">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </b-col>
            </b-row>
          </b-col>
        </b-row>

        <b-row align-v="center" class="app-footer text-center">
          <b-col cols="4">
            <font-awesome-icon @click="toggleProfile" icon="home" />
          </b-col>
          <b-col cols="4">
            <font-awesome-icon @click="toggleProfile" icon="book" />
          </b-col>
          <b-col cols="4">
            <font-awesome-icon @click="toggleProfile" icon="user" />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapGetters } from "vuex";
import Login from "@/components/Login.vue";
import Home from "@/views/Home.vue";

const components = { Login, Home };
const methods = {
  toggleProfile() {
    var div = document.getElementsByClassName("side-left")[0];
    if (div.style.left == "-100%" || div.style.left == "") {
      div.style.left = "0%";
      return;
    }
    div.style.left = "-100%";
  },
};
const computed = {
  ...mapGetters({
    isLogged: "isLogged",
  }),
};

export default { components, methods, computed };
</script>
<style>
html,
body {
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.app-header,
.app-content,
.app-footer {
  padding: 5px;
  margin: 0;
}

.app-header {
  height: 60px;
  border-bottom: 1px solid black;
}

.app-footer {
  height: 60px;
  border-top: 1px solid black;
}

.app-content,
.side-content {
  height: calc(100% - 120px);
  overflow-y: auto;
  overflow-x: hidden;
  word-break: break-all;
  margin: 0;
}

.side-content {
  height: calc(100% - 60px);
}

.app-wrapper {
  height: calc(100% - 60px);
}

.side {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  top: 0;
  background: slategray;
  border-radius: 5px;
}

.side-left {
  background: #eee;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0%;
  left: -100%;
  -webkit-transition: left 1s ease;
  transition: left 1s ease;
}
</style>

