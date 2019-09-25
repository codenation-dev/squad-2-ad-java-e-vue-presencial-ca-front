<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-snackbar
              v-if="message.error"
              v-model="message.show"
              color="#F44336"
              top
              :timeout="timeout"
            >{{ message.text }}</v-snackbar>
            <v-snackbar
              v-else
              v-model="message.show"
              color="green"
              top
              :timeout="timeout"
            >{{ message.text }}</v-snackbar>
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Entre</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="form.username" label="E-mail" />
                  <template v-if="!$v.form.username.email">
                    <span class="red--text">E-mail inválido</span>
                    <br />
                  </template>
                  <span
                    v-if="!$v.form.username.maxLength"
                    class="red--text"
                  >E-mail deve conter no máximo 200 caracteres</span>

                  <v-text-field v-model="form.password" label="Senha" type="password" />
                  <span
                    v-if="!$v.form.password.minLength"
                    class="red--text"
                  >Senha deve conter no mínimo 8 caracteres</span>
                  <span
                    v-if="!$v.form.password.maxLength"
                    class="red--text"
                  >Senha deve conter no máximo 30 caracteres</span>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="red lighten-1"
                  class="has-text-white"
                  :to="{name:'register'}"
                >Registrar-se</v-btn>
                <v-btn
                  color="primary"
                  :disabled="$v.form.$invalid || !form.username || !form.password"
                  @click="sign(form)"
                >Entrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { minLength, email, maxLength } from "vuelidate/lib/validators";

import { mapActions } from "vuex";

export default {
  data: () => ({
    form: {
      username: "",
      password: ""
    },
    message: {
      text: "",
      error: false,
      show: false
    },
    timeout: 10000
  }),
  validations: {
    form: {
      password: {
        minLength: minLength(8),
        maxLength: maxLength(30)
      },
      username: {
        email,
        maxLength: maxLength(200)
      }
    }
  },
  methods: {
    ...mapActions("login", ["login"]),
    async sign(form) {
      try {
        await this.login(form);
        this.$router.push({ name: "error-list" });
      } catch ({ response }) {
        console.log(response);
        this.message.text = response.data.message;
        this.message.error = true;
        this.message.show = true;
        this.form.username = "";
        this.form.password = "";
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
