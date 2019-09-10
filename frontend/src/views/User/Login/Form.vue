<template>
  <div class="row justify-content-center">
    <div class="col-4">
      <b-card-group deck class="deck">
        <b-card
          border-variant="primary"
          title="Entre"
          header-bg-variant="primary"
          header-text-variant="white"
          align="center"
        >
          <b-card-text>
            <b-form class="inputs">
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
            </b-form>
            <span>
              Esqueceu sua senha?
              <b-link :to="{name: 'pass-reset'}">Clique aqui</b-link>
            </span>
            <p>
              Não possui conta?
              <b-link :to="{name: 'register'}">Cadastre-se</b-link>
            </p>
            <b-button class="text-center" variant="primary">Entrar</b-button>
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
        password: ""
      }
    };
  },
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