<template>
  <div>
    <ImgAvatar :src="url ? url : require('@/assets/user.jpg')" alt="Avatar" />

    <v-file-input
      :label="label"
      v-model="selectedValue"
      :rules="rules"
      :accept="accept"
      prepend-icon=""
      append-icon="mdi-camera"
      counter
      show-size
      small-chips
    />
  </div>
</template>

<script>
import ImgAvatar from "./ImgAvatar.vue";

export default {
  components: {
    ImgAvatar,
  },
  props: ["label", "model", "rules", "accept"],
  data() {
    return {
      url: "",
    };
  },
  computed: {
    selectedValue: {
      get: function () {
        return this.model;
      },
      set: function (new_value) {
        this.$emit("update:model", new_value);

        if (new_value !== null) {
          this.url = URL.createObjectURL(new_value);
        } else {
          this.url = "";
        }
      },
    },
  },
};
</script>