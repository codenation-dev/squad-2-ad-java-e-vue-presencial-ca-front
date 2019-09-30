<template>
  <v-container grid-list-xs>

    <v-title-page>Alerts</v-title-page>

    <div id="alerts">

      <div class="d-flex justify-center pa-10" v-if="alerts.length == 0">
        <v-progress-circular indeterminate v-if="isLoading" :size="70" color="primary" ></v-progress-circular>
        <v-btn v-else class="ma-2" outlined small disabled>Alerts was not found</v-btn>
      </div>

      <AlertsList :alerts="alertsNotViewed" />            
      <AlertsList :alerts="alertsViewed" />  
      
    </div>
    
    
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AlertsList from './AlertsList'

export default {
  name: 'AlertsView',
  components: {
    AlertsList
  },
  data () {    
    return { }
  },
  mounted () {
    this.initialize()
  },
  computed: {
    ...mapGetters('application', ['isLoading']),
    ...mapGetters('alerts', ['alerts']),
    ...mapGetters('alerts', ['alertsNotViewed']),
    ...mapGetters('alerts', ['alertsViewed']),
  },
  methods: {
    ...mapActions('application', ['setLoading']),
    ...mapActions('alerts', ['getAlerts']),
    ...mapActions('alerts', ['setViewById']),
    initialize () {
      this.getAlerts()
    },
    btnVisualized (id) {
      this.setLoading(true)
      this.setViewById(id)      
    }
  }
}
</script>
