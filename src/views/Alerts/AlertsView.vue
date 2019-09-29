<template>
  <v-container grid-list-xs>

    <v-title-page>Alerts</v-title-page>

    <div id="alerts">

      <div class="d-flex justify-center pa-10" v-if="alertsNotViews.length == 0">
        <v-progress-circular indeterminate v-if="isLoading" :size="70" color="primary" ></v-progress-circular>
        <v-btn v-else class="ma-2" outlined small disabled>Alerts was not found</v-btn>
      </div>

      <template v-for="alert in alertsNotViews" >
        <v-alert
          :key="alert.id"
          text
          dense
          :color="alert.log.detail.level | levelColor"
          :icon="alert.log.detail.level | levelIcon"
          border="left"
          prominent
        >
          <v-row align="center" no-gutters>
            <v-col cols="9">
              <h3 class="headline font-weight-bold">{{ alert.trigger.name }}</h3>
              {{ alert.createdDate | moment }}          
            </v-col>
            <v-col cols="3" class="text-right">
              <v-btn :color="alert.log.detail.level | levelColor" outlined @click="btnVisualized(alert.id)">Read</v-btn>
            </v-col>
          </v-row>        
          
          <v-row>  
            <v-col>
              <div>{{ alert.trigger.message }}</div>
            </v-col>
          </v-row>  
        
        </v-alert>  
      </template>
      
    </div>
    
    
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AlertsService from '@/services/api/alerts.js'

export default {
  name: 'AlertsView',
  data () {
    
    return {
      alertsNotViews: [],
      alertsViews: [],
      snackbar: {
        show: false,
        type: '',
        message: ''
      },
    }
  },
  mounted () {
    this.initialize()
  },
  computed: {
    ...mapGetters('application', ['isLoading'])
  },
  methods: {
    ...mapActions('application', ['setLoading']),
    initialize () {
      this.getAlerts()
    },
    getAlerts () {
      this.setLoading(true)
      AlertsService.findAll()
        .then(response => {
          this.alertsNotViews = response.data.filter((alert) => { return alert.isVisualized === false })            
          this.alertsViews = response.data.filter((alert) => { return alert.isVisualized === true })            
          this.setLoading(false)
        })
        .catch(() => {
          this.setLoading(false)
        })
    },
    btnVisualized (id) {
      this.setLoading(true)
      AlertsService.viewById(id)
        .then(() => {
          const alert = this.findAlertById(id)
          this.alertsNotViews.splice(this.alertsNotViews.indexOf(alert), 1);
          this.alertsViews.push(alert)
          this.setLoading(false)
        })
        .catch(() => {
          this.setLoading(false)
        })      
    },
    toogleSnackbar () {
      this.snackbar.show = !this.snackbar.show
    },
    findAlertById (id) {
      return this.alertsNotViews.find((alert) => {
        return alert.id === id
      })
    }
  }
}
</script>
