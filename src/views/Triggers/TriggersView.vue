<template>
  <v-container grid-list-xs>

    <div id="title">
      <h1 class="pa-5 font-weight-light">Triggers Management</h1>
    </div>
    
    <div id="triggers">
      <v-data-table
        :headers="headers"
        :items="formatTriggers"
        :loading="isLoading"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <div class="flex-grow-1"></div>
            <v-dialog v-model="dialog" max-width="800px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" depressed class="mp-5" v-on="on">Create Trigger</v-btn>
              </template>
                <v-card >
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                </v-card>
                <v-tabs grow background-color="primary" dark>
                  <v-tab>
                    <v-icon class="pr-2">mdi-numeric-1-circle</v-icon>
                    Geral
                  </v-tab>
                  <v-tab>
                    <v-icon class="pr-2">mdi-numeric-2-circle</v-icon>
                    Filters
                  </v-tab>
                  <v-tab>
                    <v-icon class="pr-2">mdi-numeric-3-circle</v-icon>
                    Email
                  </v-tab>
                  <v-tab-item>
                    <v-card>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12">
                              <v-text-field v-model="editedItem.name" label="Trigger Name" outlined></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-switch v-model="editedItem.isActive" label="Active?"></v-switch>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12">
                              <v-text-field v-model="editedItem.filters.appName"  label="Application Name" outlined ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-select
                                v-model="editedItem.filters.level"
                                :items="levels"
                                item-text="text"
                                item-value="value"
                                label="Level"
                                outlined
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-select
                                v-model="editedItem.filters.environment"
                                :items="environments"
                                item-text="text"
                                item-value="value"
                                label="Environment"
                                outlined
                              ></v-select>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                    </v-card>                  
                  </v-tab-item>

                  <v-tab-item>
                    <v-card>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12">
                              <v-text-field v-model="editedItem.email"  label="Email" outlined ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-textarea outlined label="Message" v-model="editedItem.message"></v-textarea>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn color="red" text @click="close">Cancel</v-btn>
                        <v-btn color="primary" text @click="save">Save</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-tab-item>
                </v-tabs>             
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.filtersLevel="{ item } ">
          {{ item.filtersLevel | level}}
        </template>
        <template v-slot:item.filtersEnvironment="{ item } ">
          {{ item.filtersEnvironment | environment }}
        </template>
        <template v-slot:item.isActive="{ item }">
          <v-icon :color="item.isActive?'success':'red'">
            {{ (item.isActive) ? 'mdi-check-circle': 'mdi-minus-circle' }} 
          </v-icon>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon @click="deleteItem(item)">mdi-inbox-arrow-down</v-icon>
        </template>
        <template v-slot:item.createdByFullName="{ item } ">
          {{ item.createdByFullName }}
          <v-chip  v-if="itsMe(item)" class="ma-2" color="orange" text-color="white" x-small> me </v-chip>
        </template>
        <template v-slot:no-data>
          Triggers was not found
        </template>
      </v-data-table>
    </div>
    <v-snackbar v-model="snackBar" multi-line>
      {{ snackMessage }}
      <v-btn color="red" text @click="snackBar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TriggersService from '@/services/api/triggers.js'
import level from '@/domains/level'
import environment from '@/domains/environment'

export default {
  name: 'TriggersView',
  data () {
    return {
      triggers: [],
      dialog: false,
      snackMessage: '',
      snackBar: false,
      levels: level,
      environments: environment,
      headers: [
        { text: 'Active', value: 'isActive' },
        { text: 'Name', value: 'name' },
        { text: 'Application', value: 'filtersAppName' },
        { text: 'Level', value: 'filtersLevel' },
        { text: 'Environment', value: 'filtersEnvironment' },
        { text: 'Owner', value: 'createdByFullName' },
        { text: 'Actions', value: 'action', sortable: false, align: 'left' }
      ],
      editedIndex: -1,
      editedItem: {
        id: '',
        name: '',
        isActive: 0,
        filters: {
          appName: '',
          environment: '',
          level: ''
        },
        createdBy: {
          fullName: ''
        },
        message: '',
        email: ''
      },
      defaultItem: {
        id: '',
        name: '',
        isActive: false,
        filters: {
          appName: '',
          environment: '',
          level: ''
        },
        createdBy: {
          fullName: ''
        },
        message: '',
        email: ''
      }
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  mounted () {
    this.initialize()
  },
  computed: {
    ...mapGetters('application', ['isLoading']),
    ...mapGetters('application', ['isDark']),
    ...mapGetters('application', ['currentUser']),
    formTitle () {
      return this.isNewItem() ? 'Create Trigger' : 'Edit Trigger'
    },
    formatTriggers () {
      let triggers = this.triggers.map((el) => {
        return {
          id: el.id,
          name: el.name,
          isActive: el.isActive,
          filtersAppName: el.filters.appName,
          filtersLevel: el.filters.level,
          filtersEnvironment: el.filters.environment,
          createdById: el.createdBy.id,
          createdByFullName: el.createdBy.fullName,
          message: '',
          email: ''
        }
      })
      return triggers
    }
  },
  methods: {
    ...mapActions('application', ['setLoading']),
    initialize () {
      this.getTriggers()
    },
    getTriggers () {
      this.setLoading(true)
      TriggersService.findAll()
        .then(response => {
          this.triggers = []
          this.triggers.push(...response.data)
          this.setLoading(false)
        })
        .catch(() => {
          this.setLoading(false)
        })
    },
    itsMe(item) {
      return this.currentUser.id === item.createdById
    },
    isNewItem () {
      return (this.editedIndex === -1)
    },
    editItem (item) {
      const trigger = this.findTriggerBy(item.id)
      this.editedIndex = this.triggers.indexOf(trigger)
      this.editedItem = Object.assign({}, trigger)
      this.dialog = true
    },
    findTriggerBy (id) {
      return this.triggers.find((t) => { return t.id === id })
    },
    deleteItem (item) {
      const trigger = this.findTriggerBy(item.id)
      const index = this.triggers.indexOf(trigger)
      confirm('Are you sure you want to delete this item?') && this.triggers.splice(index, 1)
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      const newTrigger = {
        name: this.editedItem.name,
        message: this.editedItem.message,
        email: this.editedItem.email,
        isActive: this.editedItem.isActive,
        filters: {
          appName: this.editedItem.filters.appName,
          level: this.editedItem.filters.level,
          environment: this.editedItem.filters.environment
        }
      }

      if (!this.isNewItem()) {
        TriggersService.updateById(this.editedItem.id, newTrigger)
          .then(response => {
            Object.assign(this.triggers[this.editedIndex], response.data)
            this.close()
          })
          .catch(() => {
            this.showSnack('Unable to update trigger')
          })
      } else {
        TriggersService.add(newTrigger)
          .then(response => {
            this.triggers.push(response.data)
            this.close()
          })
          .catch(() => {
            this.showSnack('Unable to save trigger')
          })
      }
    },
    showSnack (message) {
      this.snackMessage = message
      this.snackBar = true
    }
  }
}
</script>