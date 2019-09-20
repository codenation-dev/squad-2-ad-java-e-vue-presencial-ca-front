<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <v-card>
      <v-card-title class="blue darken-3 white--text">Adicionar log</v-card-title>
      <v-container>
        <v-row>
          <v-col class="align-center justify-space-between" cols="12">
            <v-text-field placeholder="Título"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field placeholder="Level"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field placeholder="Aplicação"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn text color="error" @click="alterDialog">Cancelar</v-btn>
        <v-btn text color="success" @click="alterDialog">Adicionar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialog"],
  methods: {
    alterDialog() {
      this.$emit("alterDialog");
    }
  }
};
</script>