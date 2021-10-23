<template>
  <v-card class="mx-auto" :loading="loading" :disabled="loading">
    <v-card-title>
      <v-row>
        <v-col cols="12" xs="12" md="10">
          <h1 class="text-h6" v-text="page_title" />
        </v-col>
        <v-col cols="12" xs="12" md="2" class="text-right">
          <BtnCircle
            tLabel="Atrás"
            tPosition="bottom"
            icon="mdi-arrow-left"
            color="secondary"
            size="small"
            :to="{
              name: `${page_route}${store_mode ? '' : '.view'}`,
              params: { id: id },
            }"
          />
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-form ref="form_data" lazy-validation>
        <v-row>
          <v-col cols="12" xs="12" md="6">
            <v-card class="mx-auto">
              <v-card-title>
                <h2 class="text-caption" v-text="'GENERAL'" />
              </v-card-title>
              <v-divider />
              <v-card-text>
                <FileInputAvatar
                  v-if="store_mode"
                  label="Imagen de perfil"
                  :model.sync="data.avatar_file"
                  :rules="rules.avatar_file"
                  accept="image/jpeg"
                />
                <v-text-field
                  label="Nombre*"
                  v-model="data.name"
                  :rules="rules.name"
                  type="text"
                />
                <DatePicker
                  label="Fecha de nacimiento"
                  :model.sync="data.birthday"
                  :rules="rules.birthday"
                  clean
                />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" xs="12" md="6">
            <v-card class="mx-auto">
              <v-card-title>
                <h2 class="text-caption" v-text="'CREDENCIALES'" />
              </v-card-title>
              <v-divider />
              <v-card-text>
                <v-select
                  label="Rol*"
                  v-model="data.role_id"
                  :rules="rules.role_id"
                  :items="roles"
                  item-value="id"
                  :item-text="(item) => item.name"
                  :loading="roles_loading"
                />
                <v-text-field
                  label="Correo electrónico*"
                  v-model="data.email"
                  :rules="rules.email"
                  type="email"
                />
                <v-text-field
                  v-if="store_mode"
                  label="Contraseña*"
                  v-model="data.password"
                  :rules="rules.password"
                  :type="show_password ? 'text' : 'password'"
                  :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show_password = !show_password"
                />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" xs="12" class="text-right">
            <BtnCircle
              :tLabel="store_mode ? 'Crear' : 'Editar'"
              tPosition="top"
              :icon="store_mode ? 'mdi-plus' : 'mdi-pencil'"
              :color="store_mode ? 'success' : 'info'"
              size="small"
              :click="handleSubmit"
              :loading="loading"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
//import functions
import { catalog } from "../../requests/catalogRequest";
import { storeUpdate, show } from "../../requests/pageRequest";
import { msgConfirm, msgAlert } from "../../control";
//import components
import BtnCircle from "../../components/BtnCircle.vue";
import DatePicker from "../../components/DatePicker.vue";
import FileInputAvatar from "../../components/FileInputAvatar.vue";

export default {
  components: {
    BtnCircle,
    DatePicker,
    FileInputAvatar,
  },
  data() {
    return {
      //route name and page title
      page_route: "user",
      page_title: "Usuario",
      //vars control
      id: this.$route.params.id ? this.$route.params.id : 0,
      store_mode: this.$route.params.id ? false : true,
      login_info: this.$store.getters.getLogin,
      loading: false,
      //data for api
      data: {
        avatar_file: null,
        name: "",
        birthday: "",
        email: "",
        password: "",
        role_id: "",
      },
      //rules form data
      rules: {
        avatar_file: [
          (v) => !v || v.size < 2000000 || "El archivo debe ser menor a 2 MB",
        ],
        name: [
          (v) => !!v || "Campo requerido",
          (v) => (v && v.length <= 95) || "Máximo 95 caracteres",
          (v) => (v && v.length >= 2) || "Mínimo 2 caracteres",
        ],
        birthday: [(v) => !!v || "Campo requerido"],
        email: [
          (v) => !!v || "Campo requerido",
          (v) => (v && v.length <= 65) || "Máximo 65 caracteres",
          (v) => /.+@.+\..+/.test(v) || "Formato invalido",
        ],
        password: [
          (v) => !!v || "Campo requerido",
          (v) => (v && v.length <= 45) || "Máximo 45 caracteres",
        ],
        role_id: [(v) => !!v || "Campo requerido"],
      },
      //selects data
      roles: [],
      roles_loading: true,
      //password type and icon
      show_password: false,
      url: "",
    };
  },
  mounted() {
    //get Roles catalog
    catalog("roles", this.login_info.token).then((response) => {
      this.roles = response;
      this.roles_loading = false;
    });
    //compare store or update
    if (!this.store_mode) {
      this.loading = true;
      //get data for ID
      show(this.page_route, this.login_info.token, this.id).then((response) => {
        this.data = response;
        this.loading = false;
      });
    }
  },
  methods: {
    handleSubmit() {
      //validate form data
      if (this.$refs.form_data.validate()) {
        this.$swal
          .fire(
            msgConfirm(
              `¿Confirma la ${
                this.store_mode ? "creación" : "edición"
              } del registro?`
            )
          )
          .then((response) => {
            if (response.isConfirmed) {
              this.loading = true;
              //store or update action
              storeUpdate(
                this.page_route,
                this.login_info.token,
                this.id,
                this.data,
                this.login_info.id
              ).then((response) => {
                this.$swal.fire(
                  msgAlert(
                    response.success ? "success" : "error",
                    response.message
                  )
                );

                response.success
                  ? this.$router.push({
                      name: `${this.page_route}${
                        this.store_mode ? "" : ".view"
                      }`,
                      params: { id: this.id },
                    })
                  : console.log(response.message);
              });

              this.loading = false;
            }
          });
      } else {
        this.$swal.fire(
          msgAlert(
            "error",
            "Formulario invalido, revisa los detalles señalados"
          )
        );
      }
    },
    previewImage() {
      if (this.data.avatar_file) {
        this.url = URL.createObjectURL(this.data.avatar_file);
      } else {
        this.url = "";
      }
    },
  },
};
</script>