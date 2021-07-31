<template>
  <b-col cols="12" class="profile">
    <b-row class="mb-1 widget">
      <profile-summary></profile-summary>
    </b-row>
    <b-row class="mb-1 widget">
      <b-col>
        <b-form-group label="Edad">
          <b-form-input
            type="number"
            v-model="age"
            :placeholder="age.toString()"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Altura" description="En centimetros.">
          <b-form-input
            type="number"
            v-model="height"
            :placeholder="height.toString()"
          ></b-form-input>
        </b-form-group>

        <b-button
          @click="updateProfile()"
          type="submit"
          variant="primary"
          class="w-100"
          >Actualizar</b-button
        >
      </b-col>
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
import Weight from "@/views/Weight.vue";
import { mapGetters, mapState } from "vuex";
const data = function () {
  return {
    profile: { age: 0, height: 0 },
    user: { username: "", email: "" },
    password: "",
    repeatedPassword: "",
  };
};

const methods = {
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
  async updateProfile() {
    if (
      this.profile.age == null ||
      this.profile.height == null ||
      this.profile.age == 0 ||
      this.profile.height == 0
    ) {
      this.makeToast(
        "Los campos edad y altura no pueden estar vacios.",
        "danger"
      );
      return;
    }

    let responseStatus = await this.$store.dispatch("updateProfile", {
      age: this.profile.age,
      height: this.profile.height,
    });

    if (responseStatus != 200) {
      this.makeToast("No se pudo actualizar el perfil.", "danger");
    }
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
    set(value) {
      this.profile.age = value;
    },
  },
  height: {
    get() {
      return this.getHeight();
    },
    set(value) {
      this.profile.height = value;
    },
  },
};

const components = {
  "profile-summary": ProfileSummary,
  "weight-chart": Weight,
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