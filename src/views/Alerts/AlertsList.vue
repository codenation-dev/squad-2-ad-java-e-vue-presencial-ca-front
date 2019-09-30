<template>
  <div id="alerts">
    <v-alert
      v-for="alert in alerts"
      :key="alert.id"
      text
      dense
      :color="alert.isVisualized ? 'grey' : alert.log.detail.level | levelColor" 
      :icon="alert.log.detail.level | levelIcon"
      border="left"
      prominent
    >
      <v-row align="center" no-gutters>
        <v-col cols="9">
          <h3 class="headline font-weight-bold">{{ alert.trigger.name }}</h3>
          {{ alert.createdDate | date }}   
        </v-col>
        <v-col cols="3" class="text-right">
          <v-btn :color="alert.isVisualized ? 'grey' : alert.log.detail.level | levelColor" outlined @click="btnVisualized(alert.id)">Mark Read</v-btn>
        </v-col>
      </v-row>        
      <v-row>  
        <v-col>
          <div>{{ alert.trigger.message }}</div>
        </v-col>
      </v-row>  
    </v-alert>  
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['alerts'],
  data () {
    return {
        dialog: false
    }
  },
  computed: {
    ...mapGetters('application', ['isLoading'])
  },
  methods: {
    ...mapActions('alerts', ['setViewById']),
    btnVisualized (id) {
      this.setViewById(id)
    }
  } 
}
</script>