<template>
  <v-app-bar app flat v-if="isAuthenticated" :dark="isDark">
    <v-toolbar-title to="/">
        <v-logo />
    </v-toolbar-title>
    <div class="flex-grow-1"></div>
    <v-toolbar-items>
      <v-btn to="/logs" text>Logs</v-btn>
      <v-btn to="/triggers" text>Triggers</v-btn>
      <v-btn @click="signOut()" icon>
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TheToolbar',
  computed: {
    ...mapGetters('application', ['isAuthenticated']),
    ...mapGetters('application', ['isDark'])
  },
  methods: {
    ...mapActions('authentication', ['logout']),
    signOut () {
      this.logout()
    }
  }
}
</script>
