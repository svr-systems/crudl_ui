<template>
  <v-list>
    <div v-for="(item, i) in items" :key="i">
      <v-list-item :to="{ name: item.link }">
        <v-list-item-action>
          <v-icon v-text="item.icon" />
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.name" />
        </v-list-item-content>
      </v-list-item>
    </div>
  </v-list>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          link: "home",
          name: "Inicio",
          icon: "mdi-home",
        },
        {
          link: "user",
          name: "Usuarios",
          icon: "mdi-account-group",
        },
      ],
    };
  },
};
</script>