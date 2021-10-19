<template>
  <v-tooltip
    :bottom="$attrs.tPosition === 'bottom' ? true : false"
    :top="$attrs.tPosition === 'top' ? true : false"
    :left="$attrs.tPosition === 'left' ? true : false"
    :right="$attrs.tPosition === 'right' ? true : false"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        v-on="on"
        fab
        :small="$attrs.size === 'small' ? true : false"
        :x-small="$attrs.size === 'x-small' ? true : false"
        :color="$attrs.color"
        :to="typeof $attrs.to !== 'undefined' ? $attrs.to : {}"
        @[enableClick&&`click`]="$attrs.click"
        :loading="typeof $attrs.loading !== 'undefined' && $attrs.loading"
      >
        <v-icon v-text="$attrs.icon" />
      </v-btn>
    </template>
    <span v-text="$attrs.tLabel" />
  </v-tooltip>
</template>

<script>
export default {
  data() {
    return {
      enableClick: typeof this.$attrs.click !== "undefined" ? true : null,
    };
  },
};
</script>