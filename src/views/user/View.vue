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
              name: page_route,
            }"
          />
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" xs="12" md="6">
          <v-card class="mx-auto">
            <v-card-title>
              <h2 class="text-caption" v-text="'GENERAL'" />
            </v-card-title>
            <v-divider />
            <v-card-text>
              <ImgAvatar
                :src="
                  data.avatar_file
                    ? 'http://127.0.0.1:8000/storage/' + data.avatar_file
                    : require('@/assets/user.jpg')
                "
              />

              <p>
                <span class="text-caption font-weight-bold" v-text="'Nombre'" />
                <br />
                <span v-text="data.name" />
              </p>
              <p>
                <span
                  class="text-caption font-weight-bold"
                  v-text="'Fecha de nacimiento'"
                />
                <br />
                <span v-text="data.birthday" />
              </p>
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
              <p>
                <span class="text-caption font-weight-bold" v-text="'Rol'" />
                <br />
                <span v-text="data.role_name" />
              </p>
              <p>
                <span
                  class="text-caption font-weight-bold"
                  v-text="'Correo electrónico'"
                />
                <br />
                <span v-text="data.email" />
              </p>
            </v-card-text>
          </v-card>
          <br />
          <v-card class="mx-auto">
            <v-card-title>
              <h2 class="text-caption" v-text="'REGISTRO'" />
            </v-card-title>
            <v-divider />
            <v-card-text>
              <p>
                <span
                  class="text-caption font-weight-bold"
                  v-text="'Creación'"
                />
                <br />
                <span v-text="data.created_at_name" />
                <br />
                <span class="text-caption" v-text="data.created_at" />
              </p>
              <p>
                <span
                  class="text-caption font-weight-bold"
                  v-text="'U. actualización'"
                />
                <br />
                <span v-text="data.updated_at_name" />
                <br />
                <span class="text-caption" v-text="data.updated_at" />
              </p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" xs="6" md="6">
          <BtnCircle
            tLabel="Desactivar"
            tPosition="top"
            icon="mdi-delete"
            color="error"
            size="small"
            :click="HandleDesactivate"
            :loading="loading"
          />
        </v-col>
        <v-col cols="12" xs="6" md="6" class="text-right">
          <BtnCircle
            tLabel="Editar"
            tPosition="top"
            icon="mdi-pencil"
            color="info"
            size="small"
            :to="{ name: `${page_route}.update`, params: { id: id } }"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
//import functions
import { show, destroy } from "../../requests/pageRequest";
import { msgConfirm, msgAlert } from "../../control";
//import components
import BtnCircle from "../../components/BtnCircle.vue";
import ImgAvatar from "../../components/ImgAvatar.vue";

export default {
  components: {
    BtnCircle,
    ImgAvatar,
  },
  data() {
    return {
      //route name and page title
      page_route: "user",
      page_title: "Usuario",
      //vars control
      id: this.$attrs.id,
      login_info: this.$store.getters.getLogin,
      loading: true,
      //data for api
      data: {},
    };
  },
  methods: {
    HandleDesactivate() {
      this.$swal
        .fire(msgConfirm("Confirma la desactivación del registro?"))
        .then((response) => {
          if (response.isConfirmed) {
            this.loading = true;
            //destroy action
            destroy(
              this.page_route,
              this.login_info.token,
              this.id,
              this.login_info.id
            ).then((response) => {
              this.$swal.fire(
                msgAlert(
                  response.success ? "success" : "error",
                  response.message
                )
              );

              response.success
                ? this.$router.push({ name: this.page_route })
                : console.log(response.message);
            });
          }
        });
    },
  },
  mounted() {
    show(this.page_route, this.login_info.token, this.id).then((response) => {
      this.data = response;
      this.loading = false;
    });
  },
};
</script>