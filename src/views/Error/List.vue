<template>
  <NavBar>
    <v-data-table :headers="headers" :items="items" class="elevation-24"></v-data-table>
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
        { text: "Nível" },
        { text: "Título" },
        { text: "IP" },
        { text: "Aplicação" },
        { text: "Criado por" },
        { text: "Criado em" }
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