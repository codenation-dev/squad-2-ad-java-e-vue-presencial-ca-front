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
      <slot></slot>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    drawer: false,
    items: [
      { icon: "person", text: "Perfil" },
      { icon: "settings", text: "Configurações" }
    ]
  }),
  methods: {
    showDrawer() {
      this.drawer = !this.drawer;
    }
  }
};
</script>
