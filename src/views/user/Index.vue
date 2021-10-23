<template>
  <v-card class="mx-auto" :disabled="loading">
    <v-card-title>
      <v-row>
        <v-col cols="12" xs="12" md="10">
          <span v-text="`${page_title} (${total_rows})`" />
        </v-col>
        <v-col cols="12" xs="12" md="2" class="text-right">
          <BtnCircle
            tLabel="Crear"
            tPosition="bottom"
            icon="mdi-plus"
            color="success"
            size="small"
            :to="{ name: `${page_route}.store` }"
          />
        </v-col>
        <v-col cols="12" xs="12" md="12">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar..."
            single-line
            hide-details
          />
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" xs="12">
          <v-data-table
            :headers="headers"
            :items="data"
            :search="search"
            :loading="loading"
          >
            <template v-slot:item.action="{ item }">
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-on="on"
                    fab
                    x-small
                    color="primary"
                    @click="handleView(item.id)"
                  >
                    <v-icon v-text="'mdi-eye-outline'" />
                  </v-btn>
                </template>
                <span v-text="'Ver'" />
              </v-tooltip>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
//import functions
import { index } from "../../requests/pageRequest";
//import components
import BtnCircle from "../../components/BtnCircle.vue";

export default {
  components: {
    BtnCircle,
  },
  data() {
    return {
      //route name and page title
      page_route: "user",
      page_title: "Usuario",
      //vars control
      login_info: this.$store.getters.getLogin,
      loading: true,
      //data from api
      data: [],
      total_rows: 0,
      //vars table
      search: "",
      headers: [
        {
          text: "Nombre",
          filterable: true,
          value: "name",
        },
        { text: "C. electrónico", filterable: true, value: "email" },
        { text: "Rol", filterable: true, value: "role_name" },
        { text: "Acciones", value: "action", sortable: false },
      ],
    };
  },
  methods: {
    //show view select row for ID
    handleView(row_id) {
      this.$router.push({
        name: `${this.page_route}.view`,
        params: { id: row_id },
      });
    },
  },
  mounted() {
    //get api data
    index(this.page_route, this.login_info.token, [
      {
        name: "active",
        value: 1,
      },
      {
        name: "id",
        value: this.login_info.id,
      },
    ]).then((response) => {
      this.data = response.data;
      this.total_rows = response.total_rows;
      this.loading = false;
    });
  },
};
</script>