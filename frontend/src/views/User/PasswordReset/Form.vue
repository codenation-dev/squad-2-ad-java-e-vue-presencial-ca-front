<template>
  <div class="row justify-content-center">
    <div class="col-4">
      <b-card-group deck class="deck">
        <b-card
          border-variant="primary"
          title="Alterar senha"
          header-bg-variant="primary"
          header-text-variant="white"
          align="center"
        >
          <b-card-text>
            <b-form class="inputs">
              <b-form-group label="Senha">
                <b-form-input v-model="form.password1" type="password" required></b-form-input>
              </b-form-group>

              <b-form-group label="Confirme sua senha">
                <b-form-input v-model="form.password2" type="password" required></b-form-input>
              </b-form-group>
            </b-form>
            <b-button class="text-center" type="submit" variant="primary">Salvar</b-button>
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
        password1: "",
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