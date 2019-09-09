<template>
  <div>
    <NavBar />
    <Container>
      <div class="text-center">
        <b-alert show dismissible variant="success">
          <h4 class="alert-heading">Seja bem vindo!</h4>
        </b-alert>
        <b-card title="Listagem de Erros">
          <h6>Total de erros centralizados: {{ this.items.length }}</h6>
          <b-row align-h="end" class="m-2">
            <b-col cols="10">
              <b-form-input v-model="text" placeholder="Pesquise por logs"></b-form-input>
            </b-col>
            <b-col cols="2">
              <b-dropdown text="Ações" variant="outline-danger" right>
                <b-dropdown-item v-if="select_all" @click="disableAll">Cancelar Seleção</b-dropdown-item>
                <b-dropdown-item v-else @click="selectAll">Selecionar Todos</b-dropdown-item>
                <b-dropdown-item href="#">Arquivar</b-dropdown-item>
                <b-dropdown-item @click="excludeItems()">Excluir</b-dropdown-item>
              </b-dropdown>
            </b-col>
          </b-row>
          <b-card-text>
            <b-table :items="items" :fields="fields" hover>
              <template slot="selected" slot-scope="row">
                <b-form-group>
                  <input
                    type="checkbox"
                    v-model="select_all ? row.item.selected = true : row.item.selected = false"
                  />
                </b-form-group>
              </template>
            </b-table>
          </b-card-text>
        </b-card>
      </div>
    </Container>
  </div>
</template>

<script>
import NavBar from "@/components/Navbar";
import Container from "@/components/Container";

import { api_logs } from "@/endpoints/Logs";

export default {
  data() {
    return {
      text: "",
      select_all: false,
      fields: [{ key: "selected", label: "" }, "level", "log", "eventos"],
      items: [
        { selected: false, level: 1, log: "teste", eventos: 1 },
        { selected: false, level: 1, log: "teste", eventos: 2 },
        { selected: false, level: 1, log: "teste", eventos: 3 },
        { selected: false, level: 1, log: "teste", eventos: 4 },
        { selected: false, level: 1, log: "teste", eventos: 8 },
        { selected: false, level: 1, log: "teste", eventos: 12 },
        { selected: false, level: 1, log: "teste", eventos: 116 },
        { selected: false, level: 1, log: "teste", eventos: 25 },
        { selected: false, level: 1, log: "teste", eventos: 50 }
      ]
    };
  },
  components: { NavBar, Container },
  methods: {
    excludeItems() {},
    selectAll() {
      this.select_all = true;
    },
    disableAll() {
      this.select_all = false;
    }
  }
  // mounted() {
  //   this.axios
  //     .get(`${api_logs}`)
  //     .then(response => {
  //       const { data } = response.data;
  //       data.forEach(element => {
  //         this.items.push(element);
  //       });
  //     })
  //     .catch(error => {
  //       console.error("Ocorreu algum erro na requisição");
  //     });
  // }
};
</script>