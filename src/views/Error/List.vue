<template>
  <NavBar>
    <section>
      <b-table
        :data="data"
        :loading="loading"
        :total="total"
        :per-page="perPage"
        hoverable
        :selected.sync="openDetail"
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
              <i class="material-icons">archive</i>
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
          this.data = data.content.reverse();
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
}
.pagination-link {
  border: 1px solid #1565c0 !important;
}
.is-selected {
  background-color: #1565c0 !important;
}
</style>