<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="selectedValue"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="selectedValue"
        :label="label"
        append-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
        :rules="rules"
      />
    </template>
    <v-date-picker v-model="selectedValue" no-title scrollable>
      <v-spacer />
      <BtnCircle
        tLabel="Cancelar"
        tPosition="top"
        icon="mdi-close"
        color="default"
        size="x-small"
        :click="handleCancel"
      />
      <BtnCircle
        v-if="enableClean"
        tLabel="Limpiar"
        tPosition="top"
        icon="mdi-eraser"
        color="secondary"
        size="x-small"
        :click="handleClean"
      />
      <BtnCircle
        tLabel="Aceptar"
        tPosition="top"
        icon="mdi-check"
        color="info"
        size="x-small"
        :click="handleAccept"
      />
    </v-date-picker>
  </v-menu>
</template>

<script>
//import components
import BtnCircle from "./BtnCircle.vue";

export default {
  components: {
    BtnCircle,
  },
  props: ["label", "model", "rules"],
  data() {
    return {
      menu: false,
      enableClean: typeof this.$attrs.clean !== "undefined" ? true : false,
    };
  },
  computed: {
    selectedValue: {
      get: function () {
        return this.model;
      },
      set: function (new_value) {
        this.$emit("update:model", new_value);
      },
    },
  },
  methods: {
    handleCancel() {
      this.menu = false;
    },
    handleClean() {
      this.$refs.menu.save("");
    },
    handleAccept() {
      this.$refs.menu.save(this.selectedValue);
    },
  },
};
</script>