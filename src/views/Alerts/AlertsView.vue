<template>
  <v-container grid-list-xs>

    <div id="title">
      <h1 class="pa-5 font-weight-light">Alerts Management</h1>
    </div>
    
    <div id="alerts">
      
    </div>

  </v-container>
</template>

<script>

export default {
  name: 'AlertsView',
  data () {
    return {
      alerts: [],
    }
  }
}
</script>
