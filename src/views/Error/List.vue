<template>
  <NavBar>
    <h1 class="text-center">Listagem de erros</h1>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="10"
      class="elevation-24"
      no-data-text="Nenhum log disponível"
      loading-text="Carregando logs..."
      :progress="loading"
      :loading="loading"
    >
      <template slot="item.level" slot-scope="props">
        <td>{{props.item.detail.level}}</td>
      </template>
      <template slot="item.title" slot-scope="props">
        <td width="10px;">{{props.item.title}}</td>
      </template>
      <template slot="item.ip" slot-scope="props">
        <td>{{props.item.application.ip}}</td>
      </template>
      <template slot="item.application" slot-scope="props">
        <td>{{props.item.application.name}}</td>
      </template>
      <template slot="item.author" slot-scope="props">
        <td>{{props.item.createdBy.fullName}}</td>
      </template>
      <template slot="item.timestamp" slot-scope="props">
        <td>{{props.item.detail.timestamp}}</td>
      </template>
    </v-data-table>
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
      headers: [
        { text: "Nível", align: "center", value: "level", width: "10%" },
        { text: "Título", align: "center", value: "title", width: "50%" },
        { text: "IP", align: "center", value: "ip", width: "10%" },
        {
          text: "Aplicação",
          align: "center",
          value: "application",
          width: "10%"
        },
        { text: "Criado por", align: "center", value: "author", width: "10%" },
        { text: "Criado em", align: "center", value: "timestamp", width: "10%" }
      ],
      items: []
    };
  },
  components: { NavBar },
  async created() {
    const { data } = await axios.get(`${api_logs}`);
    this.items = data.content;
    this.loading = false;
  }
};
</script>