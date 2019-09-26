<template>

  <section>

    <v-progress-linear
      :active="isLoading && !live"
      :indeterminate="isLoading && !live"
      absolute
      bottom
      color="primary"
    ></v-progress-linear>

    <v-navigation-drawer width="350" v-model="menu.drawerLeft" app temporary>
      <v-list>
        <v-list-item>
          <v-list-item-title class="subtitle-2 text-uppercase">
            <v-icon>mdi-filter-outline</v-icon> Filters
          </v-list-item-title>
          <v-icon large @click.stop="btnCloseFilters()" >mdi-chevron-left</v-icon>          
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item class="pt-4">
          <v-menu
            ref="modalStartDate"
            v-model="menu.filters.modalStartDate"
            :close-on-content-click="false"
            :return-value.sync="menu.filters.startDate"
            transition="scale-transition"
            offset-z
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="menu.filters.startDate"
                label="Start Date"
                append-icon="mdi-calendar-clock"
                readonly
                color="primary"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="menu.filters.startDate" no-title scrollable>
              <div class="flex-grow-1"></div>
              <v-btn text color="primary" @click="menu.filters.modalStartDate = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.modalStartDate.save(menu.filters.startDate)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-list-item>
        <v-list-item class="pb-4">
          <v-menu
            ref="modalFinishDate"
            v-model="menu.filters.modalFinishDate"
            :close-on-content-click="false"
            :return-value.sync="menu.filters.finishDate"
            transition="scale-transition"
            offset-z
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="menu.filters.finishDate"
                label="Finish Date"
                append-icon="mdi-calendar-clock"
                readonly
                color="primary"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="menu.filters.finishDate" no-title scrollable>
              <div class="flex-grow-1"></div>
              <v-btn text color="primary" @click="menu.filters.modalFinishDate = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.modalFinishDate.save(menu.filters.finishDate)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-list-item>        
        <v-list-item>
          <v-autocomplete
            v-model="menu.filters.appName"
            :items="getApps"
            item-text="name"
            label="Application Name" 
            outlined
          ></v-autocomplete>          
        </v-list-item>
        <v-list-item>     
          <v-select
            v-model="menu.filters.level"
            :items="domains.level"
            item-text="text"
            item-value="value"
            label="Levels"
            outlined
          ></v-select>
        </v-list-item>
        <v-list-item>            
          <v-select
            v-model="menu.filters.environment"
            :items="domains.environment"
            item-text="text"
            item-value="value"
            label="Environment"
            outlined
          ></v-select>
        </v-list-item>     
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn dark depressed color="secondary" block @click.stop="btnClearFilters()">Clear Filters</v-btn>
        </div>        
        <div class="pa-2">
          <v-btn dark depressed color="primary" block @click.stop="btnApplyFilters()">Apply Filters</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-navigation-drawer width="350" v-model="menu.drawerRight" right app temporary>
      <v-list>
        <v-list-item>
          <v-list-item-title class="subtitle-2 text-uppercase">Entry Details</v-list-item-title>
          <v-icon large @click.stop="btnCloseDetail()" >
            mdi-chevron-right
          </v-icon>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="font-weight-black">TIMESTAMP</v-list-item-title>
            <v-list-item-subtitle class="font-weight-black">{{ log.detail.timestamp | date }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="font-weight-black">APPLICATION NAME</v-list-item-title>
            <v-list-item-subtitle class="font-weight-black">{{ log.application.name }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="font-weight-black">ENVIRONMENT</v-list-item-title>
            <v-list-item-subtitle class="font-weight-black">{{ log.application.environment | environment }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="font-weight-black">HOST</v-list-item-title>
            <v-list-item-subtitle class="font-weight-black">{{ log.application.host }} ({{ log.application.ip }})</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="font-weight-black">LEVEL</v-list-item-title>
            <v-list-item-subtitle>              
              <v-btn small dark depressed :color="getColorLevel(log.detail.level)">
                {{ log.detail.level.toLowerCase() }}
              </v-btn>                 
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="font-weight-black">OWNER</v-list-item-title>
            <v-list-item-subtitle class="font-weight-black">
               {{log.createdBy.fullName}}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn dark depressed color="primary" :to="'/logs/' + log.id" block>
            More Details
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    
    <div id="top">
      <v-card v-if="!live" class="d-flex justify-center pa-5" tile flat width="100%">
        <v-btn v-if="!api.lastPage && logs.length > 0" :loading="isLoading"  large icon fab color="primary" @click="btnLoadMoreLogs()">
          <v-icon>mdi-chevron-double-up</v-icon>
        </v-btn>
        <span v-if="api.lastPage && logs.length > 0">No more logs</span>
      </v-card>
    </div>

    <div ref="logs" style="overflow-y: auto;" v-if="logs.length > 0">
      <v-data-table 
        dense
        calculate-widths
        item-key="id"
        class="elevation-0"
        hide-default-footer
        :hide-default-header="live"
        :items-per-page="datatable.itemsPerPage"
        :headers="datatable.headers"
        :items="formatLogs"
        :sort-by.sync="datatable.sortBy"
        :sort-desc.sync="datatable.orderDesc"
        :search="datatable.search"
        @page-count="datatable.pageCount = $event"
        :page.sync="datatable.pageSync">

        <template v-slot:item.detailTimestamp="{ item }">
          <pre>{{ item.detailTimestamp | date }}</pre>
        </template>
        
        <template v-slot:item.applicationName="{ item }">
          <pre>{{ item.applicationName }}</pre>
        </template>
        
        <template v-slot:item.applicationHost="{ item }">
          <pre>{{ item.applicationHost }} ({{ item.applicationIp}})</pre>
        </template>
        
        <template v-slot:item.title="{ item }">
          <pre>{{ limitText(item.title, 70) }}</pre>
        </template> 
        
        <template v-slot:item.applicationEnvironment="{ item }">
          <pre>{{ item.applicationEnvironment | environment }}</pre>
        </template> 
        
        <template v-slot:item.detailLevel="{ item }">
          <v-btn x-small dark depressed  :color="item.detailLevel | levelColor" block>
            {{ item.detailLevel.toLowerCase() }}
          </v-btn>        
        </template>
        
        <template v-slot:item.action="{ item }">
          <v-icon @click="btnArchiveLog(item.id)" color="grey darken-1" :disabled="live">
            mdi-inbox-arrow-down
          </v-icon>
          <v-icon @click="btnOpenDetail(item)" color="grey darken-1"  :disabled="live">
            mdi-chevron-double-right
          </v-icon>
        </template>
      </v-data-table>
    </div>

    <div id="footer">
    <v-footer padless app>
      <v-card class="d-flex elevation-10" width="100%">
        <v-card flat tile class="mr-auto pa-2">
          <v-btn class="ma-2" :disabled="live" tile outlined color="grey darken-1"  @click="btnOpenFilters()">
            <v-icon left>mdi-filter-outline</v-icon> FILTERS
          </v-btn>
          <v-btn class="ma-2" :disabled="live" tile outlined color="grey darken-1" @click="btnOrderDatetime">
            <v-icon left>{{ datatable.orderDesc?'mdi-arrow-down':'mdi-arrow-up' }}</v-icon> DATETIME
          </v-btn>
        </v-card>
        <v-card flat tile class="pa-2">
          <v-btn class="ma-2" :disabled="live" tile depressed color="primary white--text" >
            <v-icon left>mdi-cloud-download</v-icon> EXPORT
          </v-btn>
          <v-btn class="ma-2" :disabled="live" tile depressed color="secondary" @click="btnApplyRefresh()">
            <v-icon left>mdi-refresh</v-icon> REFRESH
          </v-btn>
          <v-btn class="ma-2" tile outlined color="grey darken-3" @click="btnOnLive()">
            <v-icon :color="live?'red':'grey darken-3'" left>{{ live?'mdi-circle-slice-8':'mdi-circle' }}</v-icon> LIVE
          </v-btn>
        </v-card>
      </v-card>
    </v-footer>
    </div>    
    <v-snackbar :color="snackbar.type" v-model="snackbar.show" multi-line>
      {{ snackbar.message }}
      <v-btn dark text @click="toogleSnackbar()">
        Close
      </v-btn>
    </v-snackbar>    
  </section>

</template>

<script>
import LogsService from '@/services/api/logs.js'
import { mapGetters, mapActions } from 'vuex'
import levels from '@/domains/level'
import environments from '@/domains/environment'

export default {
  name: 'LogsView',
  data () {
    return {
      log: {
        id: '',
        title: '',
        detail: {
          timestamp: '',
          level: ''        
        },
        application: {
          name: '',
          host: '',
          ip: '',
          environment: ''
        },
        createdBy: {
          fullName: '',
          email: ''
        }
      },
      api: {
        filters: {
          appName: '',
          level: '',
          environment: '',
          startTimestamp: '',
          endTimestamp: '',
          size: 30,
          page: 0
        },
        lastPage: false
      },
      menu: {
        drawerRight: false,
        drawerLeft: false,
        filters: {
          modalStartDate: false,
          modalFinishDate: false,
          startDate: null,
          finishDate: null,         
          appName: '', 
          level: '',
          environment: ''
        }
      },
      snackbar: {
        show: false,
        type: '',
        message: ''
      },
      domains: {
        level: levels,
        environment: environments, 
      },    
      live: false,
      intervalLive: null,
      logs: [],
      datatable: {
        search: '',
        itemsPerPage: 30,
        pageCount: 0,
        pageSync: 0,
        orderDesc: false,
        sortBy: 'detailTimestamp',
        headers: [
          { text: 'Level', value: 'detailLevel', sortable: false },
          { text: 'Data', value: 'detailTimestamp' },
          { text: 'Title', value: 'title', sortable: false },
          { text: 'Application', value: 'applicationName', sortable: false },
          { text: 'Host', value: 'applicationHost', sortable: false },          
          { text: 'Application', value: 'applicationEnvironment', sortable: false },
          { text: 'Actions', value: 'action', sortable: false, align: 'left' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters('application', ['isLoading']),
    getApps () {
      return this.logs.map((log) => {
        return {
          name: log.application.name
        }
      })
    },
    formatLogs () {
      let newLogs = this.logs.map((el) => {
        return {
          id: el.id,
          title: el.title,
          detailTimestamp: el.detail.timestamp,
          detailLevel: el.detail.level,
          applicationName: el.application.name,
          applicationHost: el.application.host,
          applicationIp: el.application.ip,
          applicationEnvironment: el.application.environment,
          createdByFullName: el.createdBy.fullName,
          createdByEmail: el.createdBy.email
        }
      })
      return newLogs
    }
  },
  created () {
    this.setDefaultFilters()
  },
  mounted () {
    this.getLogs()
  },
  destroy () {
    this.cancelLive()
  },
  methods: {
    ...mapActions('application', ['setLoading']),
    btnOrderDatetime () {
      this.datatable.orderDesc = !this.datatable.orderDesc
      this.scrollToEnd()
    },
    btnCloseFilters () {
      this.toogleDrawerLeft()
    },
    btnOpenFilters () {
      this.toogleDrawerLeft()
    },
    btnCloseDetail () {
      this.toogleDrawerRight()
    },
    btnOpenDetail(item) {
      this.toogleDrawerRight()
      this.log = {
        id: item.id,
        title: item.title,
        detail : {
          timestamp: item.detailTimestamp,
          level: item.detailLevel  
        },
        application : {
          name: item.applicationName,
          host: item.applicationHost,
          ip: item.applicationIp,
          environment: item.applicationEnvironment
        },
        createdBy: {
          fullName: item.createdByFullName,
          email: item.createdByEmail
        }
      }
    },
    btnArchiveLog (id) {
      LogsService.archiveById(id)
      .then(() => {
        const log = this.findLogById(id)
        this.logs.splice(this.logs.indexOf(log), 1);
        this.snackbar.message = 'Archive Successfully'
        this.snackbar.type = 'success'
      })
      .catch(() => {
        this.snackbar.message = 'Unable to Archive'
        this.snackbar.type = 'error'
      })
      .finally(() => {
        this.toogleSnackbar()
      })
    },
    btnApplyRefresh () {
      this.applyFilters()
      this.getFirstPageLogs()
    },
    btnClearFilters () {
      this.setDefaultFilters()
    },
    btnApplyFilters () {
      this.toogleDrawerLeft()
      this.applyFilters()
      this.getFirstPageLogs()
    },
    btnOnLive () {
      this.live = !this.live
      this.live ? this.startLive() : this.stopLive()
    },
    btnLoadMoreLogs () {
      this.api.filters.page++
      this.getLogs()
      this.scrollToTop()
    },
    applyFilters() {
      this.api.filters.startTimestamp = this.menu.filters.startDate
      this.api.filters.endTimestamp = this.menu.filters.finishDate      
      this.api.filters.appName = (this.menu.filters.appName) ? this.menu.filters.appName : null
      this.api.filters.level = (this.menu.filters.level) ? this.menu.filters.level : null
      this.api.filters.environment = (this.menu.filters.environment) ? this.menu.filters.environment : null
    },
    scrollToTop () {
      this.goTo('#top')
    },
    scrollToEnd () {
      this.goTo('#footer')
    },
    goTo (tag) {
      this.$vuetify.goTo(tag)
    },
    toogleSnackbar () {
      this.snackbar.show = !this.snackbar.show
    },
    toogleDrawerLeft () {
      this.menu.drawerLeft = !this.menu.drawerLeft
    },
    toogleDrawerRight () {
      this.menu.drawerRight = !this.menu.drawerRight
    },
    stopLive () {
      window.clearInterval(this.intervalLive)
    },
    startLive () {
      this.scrollToEnd()
      this.intervalLive = window.setInterval(() => {
        this.getFirstPageLogs()
      }, 1300)
    },
    clearLogs () {
      this.logs = []
    },
    setDefaultFilters () {
      this.menu.filters.startDate = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().substr(0, 10)
      this.menu.filters.finishDate = new Date().toISOString().substr(0, 10)      
      this.menu.filters.appName = ''
      this.menu.filters.level = ''      
      this.menu.filters.environment = ''
    },
    getFirstPageLogs () {
      this.api.filters.page = 0        
      this.getLogs()      
    },
    getLogs () {
      this.setLoading(true);
      LogsService.search(this.api.filters)
        .then(response => {
          if (this.api.filters.page === 0) this.clearLogs()
          this.logs.push(...response.data.content)
          this.api.lastPage = response.data.last
          this.api.filters.page = response.data.number
        })
        .finally(() => {
          this.setLoading(false);      
          this.datatable.itemsPerPage = this.logs.length
          if (this.api.filters.page === 0) this.scrollToEnd()
        })
    },
    getColorLevel (level) {
      if (level === 'ERROR') return 'red darken-1'
      if (level === 'WARNING') return 'amber lighten-1 black--text'
      if (level === 'DEBUG') return 'green darken-1'
      else return 'grey'
    },
    limitText (title, maxCharacters) {
      return (title.length > maxCharacters) ? title = title.substr(0, maxCharacters) + '...' : title
    },
    findLogById (logId) {
      return this.logs.find((log) => {
        return log.id === logId
      })
    }
  }
}
</script>
