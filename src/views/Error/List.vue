<template>
  <NavBar>
    <h1 class="text-center">Listagem de erros</h1>
    <v-data-table :headers="headers" :items="items" item-key class="elevation-24">
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
      <template slot="item.name" slot-scope="props">
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
        { text: "Nível", align: "center", value: "level" },
        { text: "Título", align: "center", value: "title" },
        { text: "IP", align: "center", value: "ip" },
        { text: "Aplicação", align: "center", value: "application" },
        { text: "Criado por", align: "center", value: "name" },
        { text: "Criado em", align: "center", value: "timestamp" }
      ],
      items: []
    };
  },
  components: { NavBar },
  async created() {
    const { data } = await axios.get(`${api_logs}`);
    this.items = data.content;
    this.loading = false;
    console.log(this.items);
  }
};
</script>