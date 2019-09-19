<template>
  <NavBar>
    <h1 class="text-center">Listagem de erros</h1>
    <v-row>
      <v-col md="12">
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="20"
          class="elevation-24"
          no-data-text="Nenhum log disponível"
          loading-text="Carregando logs..."
          :progress="loading"
          :loading="loading"
          dense
        >
          <template slot="item.level" slot-scope="props">
            <td>
              <v-btn
                width="100"
                depressed
                :color="getColor(props.item.detail.level)"
              >{{props.item.detail.level}}</v-btn>
            </td>
          </template>
          <template slot="item.title" slot-scope="props">
            <td>{{props.item.title}}</td>
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
      </v-col>
    </v-row>
  </NavBar>
</template>

<script>
import { api_logs } from "@/endpoints/logs";

import axios from "axios";

import NavBar from "@/components/Navbar";

export default {
  data() {
    return {
      loading: true,
      perPage: 20,
      totalPages: 0,
      totalElements: 100,
      headers: [
        { text: "Nível", align: "center", value: "level" },
        { text: "Título", align: "center", value: "title" },
        { text: "IP", align: "center", value: "ip" },
        {
          text: "Aplicação",
          align: "center",
          value: "application"
        },
        { text: "Criado por", align: "center", value: "author" },
        { text: "Criado em", align: "center", value: "timestamp" }
      ],
      items: []
    };
  },
  components: { NavBar },
  async created() {
    let i,
      j,
      cont,
      maxPage = Math.round(this.totalElements / this.perPage);

    const { data } = await axios.get(`${api_logs}`);
    this.loading = false;
    this.totalPages = data.totalPages;
    this.items = data.content;
    this.perPage = data.pageable.pageSize;
    cont = data.size;

    for (i = 1; i < maxPage; i++) {
      const { data } = await axios.get(`${api_logs}?page=${i}`);
      for (j = 0; j < data.numberOfElements; j++) {
        cont++;
        if (cont <= this.totalElements) {
          this.items.push(data.content[j]);
        }
      }
    }
  },
  methods: {
    getColor(level) {
      switch (level) {
        case "ERROR":
          return "error";
        case "WARNING":
          return "warning";
        case "DEBUG":
          return "primary";
      }
    }
  }
};
</script>