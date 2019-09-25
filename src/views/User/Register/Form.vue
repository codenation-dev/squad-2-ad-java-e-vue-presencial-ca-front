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
                <v-toolbar-title>Cadastre-se</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="form.name" label="Nome completo" pattern="[a-z A-Z]" />
                  <span v-if="!$v.form.name.required" class="red--text">Campo obrigatório</span>
                  <template v-if="!$v.form.name.minLength">
                    <span class="red--text">Nome deve conter no mínimo 10 caracteres</span>
                    <br />
                  </template>
                  <template v-if="!nameValid">
                    <span class="red--text">Nome deve conter apenas letras</span>
                    <br />
                  </template>
                  <span
                    v-if="!$v.form.name.maxLength"
                    class="red--text"
                  >Nome deve conter no máximo 200 caracteres</span>

                  <v-text-field v-model="form.email" label="E-mail" />
                  <span v-if="!$v.form.email.required" class="red--text">Campo obrigatório</span>
                  <template v-if="!$v.form.email.email">
                    <span class="red--text">E-mail inválido</span>
                    <br />
                  </template>
                  <span
                    v-if="!$v.form.email.maxLength"
                    class="red--text"
                  >E-mail deve conter no máximo 200 caracteres</span>

                  <v-text-field v-model="form.password" label="Senha" type="password" />
                  <span v-if="!$v.form.password.required" class="red--text">Campo obrigatório</span>
                  <span
                    v-if="!$v.form.password.maxLength"
                    class="red--text"
                  >Senha deve conter no máximo 30 caracteres</span>
                  <span
                    v-if="!$v.form.password.minLength"
                    class="red--text"
                  >Senha deve conter no mínimo 8 caracteres</span>

                  <v-text-field
                    v-model="form.password_confirm"
                    label="Confirmaçao de Senha"
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
                <v-btn
                  color="primary"
                  :disabled="$v.form.$invalid || !nameValid || !passwordConfirmed"
                  @click="register(form)"
                >Cadastrar</v-btn>
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

import axios from "axios";

import { api_user } from "@/endpoints/user";

export default {
  data: () => ({
    form: {
      password_confirm: "",
      password: "",
      email: "",
      name: ""
    },
    message: {
      text: "",
      error: false,
      show: false
    },
    timeout: 10000
  }),
  computed: {
    nameValid() {
      const regex = new RegExp(/^[a-z A-Z]*$/);
      return regex.test(this.form.name);
    },
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
      },
      email: {
        required,
        email,
        maxLength: maxLength(200)
      },
      name: {
        required,
        maxLength: maxLength(200),
        minLength: minLength(10)
      }
    }
  },
  methods: {
    async register(form) {
      try {
        await axios.post(`${api_user}`, {
          email: form.email,
          fullName: form.name,
          password: form.password
        });
        this.message.text = `Registrado com sucesso!
        Você será redirecionado para o login.
        `;
        this.message.error = false;
        this.message.show = true;
        window.setTimeout(() => {
          this.$router.push({ name: "error-list" });
        }, 3000);
      } catch ({ response }) {
        this.message.text = response.data.message;
        this.message.error = true;
        this.message.show = true;
        this.form.name = "";
        this.form.email = "";
        this.form.password = "";
        this.form.password_confirm = "";
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
