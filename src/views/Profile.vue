<template>
  <b-col cols="12" class="profile">
    <b-row class="mb-1 widget">
      <profile-summary></profile-summary>
    </b-row>
    <b-row class="mb-1 widget">
      <b-col>
        <b-row class="mb-1" align-v="center">
          <b-col><b>Datos personales</b></b-col>
        </b-row>
        <b-row class="mb-1" align-v="center">
          <b-col cols="8">Edad</b-col>
          <b-col cols="4">
            <b-form-input
              type="number"
              v-model="age"
              :placeholder="age.toString()"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row align-v="center">
          <b-col cols="8">Altura</b-col>
          <b-col cols="4">
            <b-form-input
              type="number"
              v-model="height"
              :placeholder="height.toString()"
            ></b-form-input>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row class="mb-1 widget">
      <goals-slot :makeToast="makeToast"></goals-slot>
    </b-row>
    <b-row class="mb-1 widget">
      <b-col>
        <b-row class="mb-2">
          <b-col> <b>Datos de login</b> </b-col>
        </b-row>

        <b-row class="mb-1">
          <b-col>
            <b-row>
              <b-col>
                <b-form-group label="Nombre">
                  <b-form-input
                    id="username"
                    type="text"
                    v-model="username"
                    :placeholder="user.username"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mb-1">
              <b-col>
                <b-form-group label="Email">
                  <b-form-input
                    id="email"
                    type="email"
                    v-model="email"
                    :placeholder="user.email"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mb-1">
              <b-col cols="12"><span>Nueva password</span></b-col>
              <b-col cols="12">
                <b-form-input v-model="password" type="password" />
              </b-col>
            </b-row>
            <b-row class="mb-3">
              <b-col cols="12"><span>Repetir password</span></b-col>
              <b-col cols="12">
                <b-form-input v-model="repeatedPassword" type="password" />
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-button
                  @click="updateLoginDetails()"
                  type="submit"
                  variant="primary"
                  class="w-100"
                  >Actualizar</b-button
                >
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import ProfileSummary from "@/components/ProfileSummary.vue";
import Goals from "@/views/Goals.vue";
import Weight from "@/views/Weight.vue";
import { mapGetters, mapState, mapActions } from "vuex";
const data = function () {
  return {
    user: { username: "", email: "" },
    password: "",
    repeatedPassword: "",
  };
};

const methods = {
  ...mapActions({ updateProfile: "updateProfile" }),
  makeToast(msg, variant) {
    this.$bvToast.toast(msg, {
      title: "Profile",
      autoHideDelay: 5000,
      appendToast: true,
      solid: true,
      toaster: "b-toaster-bottom-right",
      variant: variant,
    });
  },
  async updateLoginDetails() {
    if (this.user.email.length < 6) {
      this.makeToast("Los campos debe tener mas de 6 caracteres.", "danger");
      return;
    }

    if (this.password.length < 2) {
      this.makeToast("La password debe tener mas de 6 caracteres.", "danger");
      return;
    }

    if (this.password.toString() === this.repeatedPassword.toString()) {
      console.log(this.password);
      console.log(this.repeatedPassword);
      // this.makeToast("Las password no coinciden.", "danger");
      // return;
    }

    let responseStatus = await this.$store.dispatch("updateLoginDetails", {
      username: this.user.username,
      email: this.user.email,
      password: this.password,
    });

    if (responseStatus != 200) {
      this.makeToast("No se pudo cambiar la password.", "danger");
    }
  },
};

const computed = {
  ...mapState({
    getUser: "user",
  }),
  ...mapGetters({
    getAge: "getAge",
    getHeight: "getHeight",
  }),
  username: {
    get() {
      return this.getUser.username;
    },
    set(value) {
      this.user.username = value;
    },
  },
  email: {
    get() {
      return this.getUser.email;
    },
    set(value) {
      this.user.email = value;
    },
  },
  age: {
    get() {
      return this.getAge();
    },
    async set(value) {
      let responseStatus = await this.$store.dispatch("updateProfile", {
        age: value,
        height: this.height,
      });
      if (responseStatus != 200) {
        this.makeToast("No se pudo actualizar el perfil.", "danger");
      }
    },
  },
  height: {
    get() {
      return this.getHeight();
    },
    async set(value) {
      let responseStatus = await this.$store.dispatch("updateProfile", {
        age: this.age,
        height: value,
      });

      if (responseStatus != 200) {
        this.makeToast("No se pudo actualizar el perfil.", "danger");
      }
    },
  },
};

const components = {
  "profile-summary": ProfileSummary,
  "weight-chart": Weight,
  "goals-slot": Goals,
};

export default {
  components,
  computed,
  data,
  methods,
};
</script>
<style>
</style>