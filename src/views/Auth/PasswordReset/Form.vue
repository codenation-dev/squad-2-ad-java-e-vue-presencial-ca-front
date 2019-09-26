<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Altere sua Senha</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="form.password" label="Senha" type="password" />
                  <span v-if="!$v.form.password.required" class="red--text">Campo obrigatório</span>
                  <span
                    v-if="!$v.form.password.minLength"
                    class="red--text"
                  >Senha deve conter no mínimo 8 caracteres</span>
                  <span
                    v-if="!$v.form.password.maxLength"
                    class="red--text"
                  >Senha deve conter no máximo 30 caracteres</span>

                  <v-text-field
                    v-model="form.password_confirm"
                    label="Confirmação de Senha"
                    type="password"
                  />
                  <template v-if="!$v.form.password_confirm.required">
                    <span class="red--text">Campo obrigatório</span>
                    <br />
                  </template>
                  <template v-if="!passwordConfirmed">
                    <span class="red--text">Senhas não coincidem</span>
                    <br />
                  </template>
                  <span
                    v-if="!$v.form.password_confirm.minLength"
                    class="red--text"
                  >Senha deve conter no mínimo 8 caracteres</span>
                  <span
                    v-if="!$v.form.password_confirm.maxLength"
                    class="red--text"
                  >Senha deve conter no máximo 30 caracteres</span>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" :disabled="$v.form.$invalid || !passwordConfirmed">Alterar</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  data: () => ({
    form: {
      password_confirm: "",
      password: ""
    }
  }),
  computed: {
    passwordConfirmed() {
      return this.form.password === this.form.password_confirm;
    }
  },
  validations: {
    form: {
      password_confirm: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(30)
      },
      password: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(30)
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
