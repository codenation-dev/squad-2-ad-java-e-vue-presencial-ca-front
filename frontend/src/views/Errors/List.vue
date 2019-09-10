<template>
  <div>
    <NavBar />
    <Container>
      <div class="text-center">
        <Messages />
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
            <table class="table table-borderless table-hover">
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
                <tr v-for="(row,index) in items" :key="index" @click="selectRow(index)">
                  <td v-for="(value, index) in row" :key="index">
                    <input v-if="value === true" type="checkbox" checked />
                    <input v-else-if="value === false" type="checkbox" />
                    <template v-else-if="index === 'log'">
                      {{ value}} -
                      <router-link :to="{name: 'error-detail'}">Detalhes do Log</router-link>
                    </template>
                    <template v-else>{{ value}}</template>
                  </td>
                </tr>
              </tbody>
            </table>
          </b-card-text>
        </b-card>
      </div>
    </Container>
  </div>
</template>

<script>
import NavBar from "@/components/Navbar";
import Container from "@/components/Container";
import Messages from "@/components/Messages";

export default {
  data() {
    return {
      text: "",
      select_all: false,
      fields: ["", "Level", "Log", "Eventos"],
      items: [
        {
          selected: false,
          level: 1,
          log: "Título de um log qualquer",
          eventos: 1
        },
        {
          selected: false,
          level: 1,
          log: "Título de um log qualquer",
          eventos: 2
        },
        {
          selected: false,
          level: 1,
          log: "Título de um log qualquer",
          eventos: 3
        },
        {
          selected: false,
          level: 1,
          log: "Título de um log qualquer",
          eventos: 4
        },
        {
          selected: false,
          level: 1,
          log: "Título de um log qualquer",
          eventos: 8
        },
        {
          selected: false,
          level: 1,
          log: "Título de um log qualquer",
          eventos: 12
        },
        {
          selected: false,
          level: 1,
          log: "Título de um log qualquer",
          eventos: 116
        },
        {
          selected: false,
          level: 1,
          log: "Título de um log qualquer",
          eventos: 25
        },
        {
          selected: false,
          level: 1,
          log: "Título de um log qualquer",
          eventos: 50
        }
      ]
    };
  },
  components: { NavBar, Container, Messages },
  methods: {
    excludeItems() {},
    selectAll(bol) {
      for (let i = 0; i < this.items.length; i++) {
        if (bol) {
          this.items[i].selected = true;
          this.select_all = true;
        } else {
          this.items[i].selected = false;
          this.select_all = false;
        }
      }
    },
    selectRow(index) {
      if (this.items[index].selected) {
        return (this.items[index].selected = false);
      }
      return (this.items[index].selected = true);
    }
  }
};
</script>

<style scoped>
.table-hover {
  cursor: pointer;
}
.coluna-0,
.coluna-1 {
  width: 5%;
}
.coluna-2 {
  width: 80%;
}
.coluna-3 {
  width: 10%;
}
</style>