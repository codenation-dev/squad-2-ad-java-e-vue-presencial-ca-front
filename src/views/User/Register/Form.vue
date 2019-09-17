<template>
  <div class="row justify-content-center">
    <div class="col-4">
      <b-card-group deck class="deck">
        <b-card
          border-variant="primary"
          title="Cadastro de usuário"
          class="text-center"
          header-bg-variant="primary"
          header-text-variant="white"
        >
          <b-card-text>
            <b-form class="inputs">
              <b-form-group label="Nome">
                <b-form-input v-model="form.first_name" type="text" required />
              </b-form-group>

              <b-form-group label="Sobrenome">
                <b-form-input v-model="form.last_name" type="text" required />
              </b-form-group>

              <b-form-group label="E-mail" description="Ex.: exemplo@exemplo.com">
                <b-form-input
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="Digite seu e-mail de acesso"
                />
              </b-form-group>

              <b-form-group label="Senha">
                <b-form-input v-model="form.password" type="password" required />
              </b-form-group>

              <b-form-group label="Confirmação de senha">
                <b-form-input v-model="form.password2" type="password" required />
              </b-form-group>
            </b-form>
            <b-button class="text-center" type="submit" variant="primary">Registrar-se</b-button>
          </b-card-text>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        password2: ""
      }
    };
  }
};
</script>

<style scoped>
.deck {
  margin-top: 20%;
}
.inputs {
  text-align: start;
}
</style>