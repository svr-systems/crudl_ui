<template>
  <v-layout justify-center align-center>
    <v-sheet
      color="white"
      elevation="5"
      rounded="circle"
      height="150"
      width="150"
    >
      <v-img :src="src" aspect-ratio="1" class="rounded-circle" alt="Avatar" />
    </v-sheet>
  </v-layout>
</template>

<script>
export default {
  props: ["src"],
};
</script>