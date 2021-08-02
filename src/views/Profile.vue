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
                    v-model="input.username"
                    :placeholder="username"
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
                    v-model="input.email"
                    :placeholder="email"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mb-1">
              <b-col cols="12"><span>Password actual</span></b-col>
              <b-col cols="12">
                <b-form-input v-model="input.oldPassword" type="password" />
              </b-col>
              <b-col cols="12"><span>Nueva password</span></b-col>
              <b-col cols="12">
                <b-form-input v-model="input.newPassword" type="password" />
              </b-col>
            </b-row>
            <b-row class="mb-3">
              <b-col cols="12"><span>Repetir password</span></b-col>
              <b-col cols="12">
                <b-form-input
                  v-model="input.repeatedPassword"
                  type="password"
                />
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
import { mapState, mapActions } from "vuex";
const data = function () {
  return {
    input: {
      username: "",
      email: "",
      oldPassword: "",
      newPassword: "",
      repeatedPassword: "",
    },
  };
};

const methods = {
  ...mapActions({
    updateProfile: "profile/updateProfile",
    makeToast: "app/makeToast",
  }),
  async updateLoginDetails() {
    let payload = {
      username: this.username,
      email: this.email,
      oldPassword: this.input.oldPassword,
      newPassword: "",
    };

    // Por defecto el campo solo muestra el placeholder y esta vacio
    // Si se introduce algun nombre de usuario, lo sustituimos en el paypload
    // por el establecido por defecto (que es el mismo nombre actual)
    if (this.input.username.length > 0) {
      payload.username = this.input.username;
    }

    // Hacemos lo mismo para el email
    if (this.input.email.length > 0) {
      payload.email = this.input.email;
    }

    // Lo mismo si se establece una password nueva
    if (this.input.newPassword.length > 0) {
      // Comprobamos que las passwords coincidan
      if (this.input.newPassword !== this.input.repeatedPassword) {
        this.makeToast({
          vm: this,
          msg: "Las password no coinciden.",
          title: "Perfil",
          variant: "danger",
        });
        return;
      }
      payload.newPassword = this.input.newPassword;
    }

    let response = await this.$store.dispatch(
      "user/updateLoginDetails",
      payload
    );

    if (response.status != 200) {
      this.makeToast({
        vm: this,
        msg: "No se pudo cambiar la password.",
        title: "Settings",
        variant: "danger",
      });
    }
  },
};

const computed = {
  ...mapState({
    user: (state) => state.user,
    profile: (state) => state.profile,
  }),
  username: {
    get() {
      return this.user.username;
    },
    set(value) {
      this.input.username = value;
    },
  },
  email: {
    get() {
      return this.user.email;
    },
    set(value) {
      this.input.email = value;
    },
  },
  age: {
    get() {
      return this.profile.age;
    },
    async set(value) {
      let response = await this.updateProfile({
        age: value,
        height: this.height,
      });
      if (response.status != 200) {
        this.makeToast({
          vm: this,
          msg: "No se pudo actualizar el perfil.",
          title: "Settings",
          variant: "danger",
        });
      }
    },
  },
  height: {
    get() {
      return this.profile.height;
    },
    async set(value) {
      let response = await this.updateProfile({
        age: this.age,
        height: value,
      });

      if (response.status != 200) {
        this.makeToast({
          vm: this,
          msg: "No se pudo actualizar el perfil.",
          title: "Settings",
          variant: "danger",
        });
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