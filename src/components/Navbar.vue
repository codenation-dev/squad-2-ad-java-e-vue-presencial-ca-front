<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <template v-for="item in items">
          <v-list-item :key="item.text">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-toolbar-title style="width: 30%">
        <v-app-bar-nav-icon @click="showDrawer" />
        <router-link :to="{name: 'error-list'}" color="primary">
          <span class="white--text">LogStack</span>
        </router-link>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn color="error">Sair</v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <slot></slot>
      </v-container>
    </v-content>
    <ButtonAdd @showDad="showAdd" />
    <Add :dialog="dialog" @alterDialog="alter" />
  </v-app>
</template>

<script>
import ButtonAdd from "@/components/ButtonAdd";
import Add from "@/views/Error/Add";

export default {
  data: () => ({
    dialog: false,
    drawer: false,
    items: [
      { icon: "person", text: "Perfil" },
      { icon: "settings", text: "Configurações" }
    ]
  }),
  components: { ButtonAdd, Add },
  methods: {
    showAdd() {
      this.dialog = true;
    },
    alter() {
      this.dialog = false;
    },
    showDrawer() {
      this.drawer = !this.drawer;
    }
  }
};
</script>
