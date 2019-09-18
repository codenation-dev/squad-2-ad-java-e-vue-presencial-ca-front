<template>
  <NavBar>
    <div class="text-center">
      <b-card title="Listagem de Erros">
        <h6>Total de erros centralizados: {{ this.items.length }}</h6>
        <b-row align-h="end" class="m-2">
          <b-col cols="9" sm="10">
            <b-form-input v-model="text" placeholder="Pesquise por logs" @keydown.enter="search"></b-form-input>
            <p class="text-left">Pesquisado por: {{text}}</p>
          </b-col>
          <b-col cols="3" sm="2">
            <b-dropdown text="Ações" variant="outline-danger" right>
              <b-dropdown-item v-if="select_all" @click="selectAll(false)">Cancelar Seleção</b-dropdown-item>
              <b-dropdown-item v-else @click="selectAll(true)">Selecionar Todos</b-dropdown-item>
              <b-dropdown-item href="#">Arquivar</b-dropdown-item>
              <b-dropdown-item href="#">Excluir</b-dropdown-item>
            </b-dropdown>
          </b-col>
        </b-row>
        <b-card-text>
          <div class="spinner-border text-primary" role="status" v-show="loading">
            <span class="sr-only">Buscando por logs...</span>
          </div>
          <table class="table table-borderless table-hover" v-show="!loading">
            <thead>
              <tr>
                <th
                  :class="`coluna-${index}`"
                  scope="col"
                  v-for="(column,index) in fields"
                  :key="index"
                  :id="index"
                >{{column}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in items.slice().reverse()" :key="row.id">
                <td>{{ row.level}}</td>
                <td>{{ row.title}}</td>
                <td>{{ row.timestamp}}</td>
              </tr>
            </tbody>
          </table>
        </b-card-text>
      </b-card>
    </div>
  </NavBar>
</template>

<script>
import { api_logs } from "@/endpoints/logs";

import axios from "axios";

import NavBar from "@/components/Navbar";

export default {
  data() {
    return {
      text: "",
      loading: true,
      fields: ["Level", "Title", "Time"],
      items: []
    };
  },
  components: { NavBar },
  async created() {
    const { data } = await axios.get(`${api_logs}`);
    this.items = data;
    this.loading = false;
  }
};
</script>

<style scoped>
.table-hover {
  cursor: pointer;
}
.coluna-0 {
  width: 5%;
}
.coluna-1 {
  width: 90;
}
.coluna-2 {
  width: 5%;
}
</style>