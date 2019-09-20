<template>
  <v-btn bottom color="error" dark fab fixed right @click="showDad">
    <v-icon>mdi-plus</v-icon>
  </v-btn>
</template>
<script>
export default {
  methods: {
    showDad() {
      this.$emit("showDad");
    }
  }
};
</script>