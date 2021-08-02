<template>
  <b-col cols="12" class="d-flex justify-content-center">
    <b-card :title="registerView ? 'Register' : 'Login'">
      <b-form-group v-if="registerView">
        <b-form-input
          v-model="email"
          type="email"
          placeholder="Introduce tu email"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-input
          v-model="username"
          type="text"
          placeholder="Introduce tu nombre"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-input
          v-model="password"
          type="password"
          placeholder="Introduce tu password"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <button
          v-if="loginView"
          @click="login"
          class="btn btn-block btn-primary"
        >
          Login
        </button>
        <button
          v-if="registerView"
          @click="register"
          class="btn btn-block btn-primary"
        >
          Register
        </button>
      </b-form-group>

      <b-form-group>
        <b-alert v-if="successMessage.length > 0" show variant="success">
          {{ successMessage }}
        </b-alert>
        <b-alert v-if="errorMessage.length > 0" show variant="danger">
          {{ errorMessage }}
        </b-alert>
      </b-form-group>

      <b-form-group class="text-center">
        <a @click="switchView" class="btn btn-link">
          {{ loginView ? "Necesitas una cuenta?" : "Volver a Login" }}
        </a>
      </b-form-group>
    </b-card>
  </b-col>
</template>

<script>
export default {
  data: function () {
    return {
      username: "",
      password: "",
      email: "",
      errorMessage: "",
      successMessage: "",
      loginView: true,
      registerView: false,
    };
  },
  methods: {
    // Comprobacion de los input del componente
    checkFields() {
      if (this.username.length == 0 || this.password.length == 0) {
        this.errorMessage = "Todos los campos son obligatorios!";
        return false;
      }

      if (this.registerView && this.email.length == 0) {
        this.errorMessage = "Todos los campos son obligatorios!";
        return false;
      }

      // Comprobaciones superadas
      return true;
    },
    async login(event) {
      // Previene el funcionamiento por defecto al pulsar el boton submit,
      // en este caso, solo llama a esta funcion.
      event.preventDefault();

      // Comprueba que los campos no estan vacios
      if (!this.checkFields()) {
        return;
      }

      // Llamada a la accion LOGIN con los datos introducidos por el usuario y
      // Obtenemos la respuesta enviada por el servidor.
      let response = await this.$store.dispatch("user/login", {
        username: this.username,
        password: this.password,
      });

      // Si la respuesta no es exitosa, mostramos el error
      if (response.status != 200) {
        this.errorMessage = response.data;
        return;
      }

      // Si la respusta es exitosa (200) cargamos los datos en la app
      await this.$store.dispatch("app/init");
    },
    async register(event) {
      event.preventDefault();
      if (!this.checkFields) {
        return;
      }

      let response = await this.$store.dispatch("user/register", {
        username: this.username,
        password: this.password,
        email: this.email,
      });

      if (response.status == 200) {
        this.successMessage =
          "Usuario: " + response.data.username + " creado con exito.";
      } else {
        this.errorMessage = response.data;
      }
    },
    // Metodo para cambiar entre vista de usuario y registro
    switchView() {
      // Si esta mostrando el formulario de LOGIN ...
      if (this.loginView) {
        this.loginView = false; // Se oculta LOGIN
        this.registerView = true; // Se muestra REGISTER
      } else {
        this.loginView = true;
        this.registerView = false;
      }
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#login {
  background: #fff;
}
.form-group {
  margin-bottom: 10px;
}

.form-group button {
  width: 100%;
}
</style>
