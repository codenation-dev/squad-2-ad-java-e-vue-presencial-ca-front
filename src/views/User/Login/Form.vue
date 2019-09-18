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
                <v-form>
                  <v-text-field v-model="form.email" label="E-mail" />
                  <span v-if="!$v.form.email.required" class="red--text">Campo obrigatório</span>
                  <span
                    v-if="!$v.form.email.maxLength"
                    class="red--text"
                  >E-mail deve conter no máximo 200 caracteres</span>
                  <span v-if="!$v.form.email.email" class="red--text">E-mail inválido</span>

                  <v-text-field v-model="form.password" label="Senha" type="password" />
                  <span v-if="!$v.form.password.required" class="red--text">Campo obrigatório</span>
                  <span
                    v-if="!$v.form.password.maxLength"
                    class="red--text"
                  >Senha deve conter no máximo 30 caracteres</span>
                  <span
                    v-if="!$v.form.password.minLength"
                    class="red--text"
                  >Senha deve conter pelo menos 8 caracteres</span>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" :disabled="$v.form.$invalid">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import {
  required,
  minLength,
  email,
  maxLength
} from "vuelidate/lib/validators";

export default {
  data: () => ({
    form: {
      password: "",
      email: ""
    }
  }),
  validations: {
    form: {
      password: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(30)
      },
      email: {
        required,
        email,
        maxLength: maxLength(200)
      }
    }
  }
};
</script>

<style>
.v-toolbar__content,
.v-card__actions {
  justify-content: center !important;
}
</style>
