<template>
  <v-row justify="center">
    <v-col cols="12" xs="10" md="4">
      <v-card class="mx-auto" :loading="loading" :disabled="loading">
        <v-card-title>
          <v-row>
            <v-col cols="12" xs="12" md="12" class="text-center">
              <h1 class="text-h4 text--primary" v-text="page_title" />
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" xs="12" md="12">
              <v-form ref="form_data" lazy-validation>
                <v-text-field
                  label="Correo electrónico*"
                  type="email"
                  v-model="data.email"
                  :rules="rules.email"
                  :disabled="loading"
                  required
                  prepend-icon="mdi-at"
                  @keyup.enter="handleSubmit"
                />
                <v-text-field
                  label="Contraseña*"
                  :type="showPassword ? 'text' : 'password'"
                  v-model="data.password"
                  :rules="rules.password"
                  :disabled="loading"
                  required
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  prepend-icon="mdi-lock"
                  @keyup.enter="handleSubmit"
                />
                <div class="text-right">
                  <BtnCircle
                    tLabel="Aceptar"
                    tPosition="bottom"
                    icon="mdi-check"
                    color="info"
                    size="small"
                    :click="handleSubmit"
                    :loading="loading"
                  />
                </div>
              </v-form>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
//import functions
import { logIn } from "../../requests/authRequest";
import { msgAlert } from "../../control";
//import components
import BtnCircle from "../../components/BtnCircle.vue";

export default {
  components: {
    BtnCircle,
  },
  data: () => ({
    page_title: "Iniciar Sesión",
    //vars control
    loading: false,
    showPassword: false,
    //data for api
    data: {
      email: "",
      password: "",
    },
    //rules form data
    rules: {
      email: [
        (v) => !!v || "Campo requerido",
        (v) => (v && v.length <= 65) || "Máximo 65 caracteres",
        (v) => /.+@.+\..+/.test(v) || "Formato invalido",
      ],
      password: [
        (v) => !!v || "Campo requerido",
        (v) => (v && v.length <= 45) || "Máximo 45 caracteres",
      ],
    },
    items: [
      { id: 1, name: "Paul", age: 23 },
      { id: 2, name: "Marcelo", age: 15 },
      { id: 3, name: "Any", age: 30 },
    ],
  }),

  methods: {
    handleSubmit() {
      //validate form data
      if (this.$refs.form_data.validate()) {
        this.loading = true;

        logIn(this.data).then((response) => {
          if (response.auth) {
            this.$store.dispatch("logInAction", response);
            window.location.assign("/home");
          } else {
            console.log(response.message);
            this.$swal.fire(msgAlert("error", response.message));
            this.loading = false;
          }
        });
      }
    },
  },
};
</script>