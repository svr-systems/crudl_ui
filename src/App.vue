<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" absolute temporary app clipped>
      <Menu />
    </v-navigation-drawer>

    <v-card>
      <v-toolbar dense color="grey darken-3" class="toolbar white--text">
        <v-app-bar-nav-icon
          v-if="login.auth"
          class="white--text"
          @click="drawer = true"
        />
        <v-toolbar-title v-text="'Filamentos'" />
        <v-spacer />
        <v-btn v-if="login.auth" icon dark>
          <v-icon v-text="'mdi-bell'" />
        </v-btn>
        <v-btn v-if="login.auth" icon dark @click.prevent="logout">
          <v-icon v-text="'mdi-logout-variant'" />
        </v-btn>
      </v-toolbar>
    </v-card>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { logOut } from "./requests/authRequest";

import Menu from "./components/Menu.vue";

export default {
  components: {
    Menu,
  },
  data() {
    return {
      drawer: false,
      login: this.$store.getters.getLogin,
    };
  },
  methods: {
    logout() {
      this.$swal
        .fire({
          showCancelButton: true,
          cancelButtonText: "No",
          confirmButtonText: "Sí",
          icon: "warning",
          text: `¿Confirma cerrar la sesión?`,
        })
        .then((response) => {
          if (response.isConfirmed) {
            logOut(this.login.token).then((response) => {
              this.$store.dispatch("logOutAction");

              if (response.success) {
                window.location.assign("/login");
              } else {
                console.log(response.message);

                this.$swal.fire({
                  showConfirmButton: false,
                  icon: response.success ? "success" : "error",
                  text: response.message,
                  timer: 2000,
                });
              }
            });
          }
        });
    },
  },
};
</script>

<style>
.toolbar {
  border-top-left-radius: 0px !important;
  border-top-right-radius: 0px !important;
}

.v-main {
  background-color: #f8f9fa;
}

.swal2-html-container,
.swal2-styled {
  font-family: "Roboto" !important;
}
</style>
