<template>
  <NavBar>
    <section>
      <b-table
        :data="data"
        :loading="loading"
        :total="total"
        :per-page="perPage"
        hoverable
        :selected.sync="selected"
        narrowed
        paginated
        backend-pagination
        detailed
        @details-open="openDetail"
        @details-close="openDetail"
        @page-change="onPageChange"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
        <template slot-scope="props">
          <b-table-column field="level" label="Nível" centered>
            <span class="tag" :class="getColor(props.row.detail.level)">{{ props.row.detail.level }}</span>
          </b-table-column>

          <b-table-column field="title" label="Título">{{props.row.title.substring(0, 50)}}...</b-table-column>

          <b-table-column field="ip" label="IP" centered>{{ props.row.application.ip }}</b-table-column>
          <b-table-column
            field="application"
            label="Aplicação"
            centered
          >{{ props.row.application.name }}</b-table-column>

          <b-table-column
            field="fullName"
            label="Criado por"
            centered
          >{{props.row.createdBy.fullName}}</b-table-column>

          <b-table-column
            field="timestamp"
            label="Criado em"
            centered
          >{{ props.row.detail.timestamp }}</b-table-column>
          <b-table-column field="actions" label="Ações" centered>
            <span>
              <i class="material-icons" title="Arquivar">archive</i>
            </span>
          </b-table-column>
        </template>
        <template slot="detail" slot-scope="props">
          <div class="text-center">
            <span>{{props.row.title}}</span>
            <br />
            <v-btn class="primary">Mais detalhes</v-btn>
          </div>
        </template>
        <template slot="footer">
          <v-row>
            <v-col cols="1">
              <b-select placeholder="Filtro" icon="filter">
                <optgroup v-for="(filter, index) in filters" :key="index" :label="filter.text">
                  <option
                    v-for="(item, index) in filter.item"
                    :key="index"
                    :value="item.value"
                  >{{item.name}}</option>
                </optgroup>
              </b-select>
            </v-col>
            <v-col cols="1">
              <template v-for="(sort, index) in sorts">
                <b-select :key="index" placeholder="Ordem" icon="sort" @input="sorted(sort.value)">
                  <option :value="sort.value">{{sort.name}}</option>
                </b-select>
              </template>
            </v-col>
          </v-row>
        </template>
      </b-table>
    </section>
  </NavBar>
</template>

<script>
import axios from "axios";
import { api_logs } from "@/endpoints/log";
import NavBar from "@/components/Navbar";

export default {
  data() {
    return {
      data: [],
      filters: [
        {
          item: [
            { name: "Error", value: "ERROR" },
            { name: "Warning", value: "WARNING" },
            { name: "Debug", value: "DEBUG" }
          ],
          text: "Nível"
        },
        {
          item: [
            { name: "Produção", value: "PRODUCTION" },
            { name: "Homologação", value: "HOMOLOGATION" },
            { name: "Dev", value: "DEV" }
          ],
          text: "Ambiente"
        }
      ],
      sorts: [{ name: "Data", value: "data" }],
      asc: true,
      total: 0,
      loading: false,
      maxElements: 50,
      page: 0,
      perPage: 20,
      drawer: false,
      selected: null
    };
  },
  components: { NavBar },
  methods: {
    loadAsyncData() {
      const params = [`page=${this.page}`];
      this.loading = true;
      axios
        .get(`${api_logs}?${params}`)
        .then(({ data }) => {
          this.data = this.asc ? data.content.reverse() : data.content;
          this.total =
            data.totalElements <= this.maxElements
              ? data.totalElements
              : this.maxElements;
          this.loading = false;
        })
        .catch(error => {
          this.data = [];
          this.total = 0;
          this.loading = false;
          throw error;
        });
    },
    onPageChange(page) {
      this.page = page - 1;
      this.loadAsyncData();
    },
    getColor(level) {
      switch (level) {
        case "ERROR":
          return "is-danger";
        case "DEBUG":
          return "is-success";
        case "WARNING":
          return "is-warning";
      }
    },
    openDetail() {
      this.drawer = !this.drawer;
    },
    sorted(option) {
      switch (option) {
        case "data":
          this.asc = !this.asc;
          this.loadAsyncData();
      }
    }
  },
  mounted() {
    this.loadAsyncData();
  }
};
</script>

<style>
.pagination-link.is-current {
  background-color: #ff5252 !important;
  border-color: #ff5252 !important;
  -webkit-box-shadow: 0 0 0 0.05em #ff5252 !important;
  box-shadow: 0 0 0 0.05em #ff5252 !important;
}
.is-selected {
  background-color: #1565c0 !important;
}
.select::after {
  border-color: #1565c0 !important;
}
select,
select:active,
.pagination-link {
  border-color: #1565c0 !important;
  -webkit-box-shadow: 0 0 0 0.05em #1565c0 !important;
  box-shadow: 0 0 0 0.05em #1565c0 !important;
}
</style>