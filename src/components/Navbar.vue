<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <template v-for="item in items">
          <v-list-item :key="item.text" @click>
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
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <router-link :to="{name: 'error-list'}" color="primary">
          <span class="red--text"><</span>
          <span class="hidden-sm-and-down white--text">LogStack</span>
          <span class="red--text">/></span>
        </router-link>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn color="error">Sair</v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <slot></slot>
      </v-container>
    </v-content>
    <v-btn bottom color="error" dark fab fixed right @click="dialog = !dialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="blue darken-3 white--text">Adicionar log</v-card-title>
        <v-container>
          <v-row>
            <v-col class="align-center justify-space-between" cols="12">
              <v-text-field placeholder="Título"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field placeholder="Level"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field placeholder="Aplicação"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn text color="error" @click="dialog = false">Cancelar</v-btn>
          <v-btn text @click="dialog = false" color="success">Adicionar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  // props: {
  //   source: String
  // },
  data: () => ({
    dialog: false,
    drawer: false,
    items: [
      { icon: "person", text: "Perfil" },
      { icon: "settings", text: "Configurações" }
    ]
  })
};
</script>
