<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid">
                  <v-text-field v-model="email" :rules="emailRules" label="E-mail" required />

                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Senha"
                    type="password"
                    required
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    password: "",
    passwordRules: [
      v => !!v || "Senha é obrigatório",
      v => v.length >= 8 || "Senha deve conter no mínimo 8 caracteres"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail é obrigatório",
      v => /.+@.+/.test(v) || "E-mail inválido"
    ]
  })
};
</script>

<style>
.v-toolbar__content,
.v-card__actions {
  justify-content: center !important;
}
</style>
