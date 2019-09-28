<template>
  <div id="settings">
    <div class="pa-2">
      <v-btn tile outlined color="grey darken-3" @click="generate()">
        {{(onGenerate)?'STOP GENERATE':'START GENERATE'}}
      </v-btn>
    </div>
    <div class="pa-2">
      <span><span class="font-weigth-bold">VUE_APP_API_URL:</span> {{baseUrl}}</span>
    </div>
  </div>
</template>

<script>
import HealthService from '@/services/api/health.js'
import LogService from '@/services/api/logs.js'

export default {
  name: 'GenerateLogView',
  data () {
    return {
      baseUrl: process.env.VUE_APP_API_URL,
      onGenerate: false
    }
  },
  methods: {
    generateLog () {
      const url = this.baseUrl + '/api/v1/logs'      
      HealthService.check().then((response) => {
        if (response.data.status === 'UP') {

          const level = this.getLevel()
          const content = this.getContent(level)
          
          let log = {
            title: this.getTitle(),
            application: {
              name: this.getAppName(),
              host: this.getHost(),
              ip: this.getIP(),
              environment: this.getEnvironment()
            },
            timestamp: this.getTimestamp(),
            level,
            content
          }
          logService.add(log)
            .then(function (response) {
              console.log(response)
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      })
    },
    getContent(level) {
      return 'Initializing Spring DispatcherServlet dispatcherServlet'
    }, 
    getTimestamp () {
      return new Date(new Date().setDate(new Date().getDate())).toISOString()
    },
    getLevel () {
      let levels = [
        { value: 'ERROR' },
        { value: 'WARNING' },
        { value: 'DEBUG' }
      ]
      return levels[this.getRandom(0, levels.length)].value
    },
    getEnvironment () {
      let environments = [
        { value: 'DEVELOPMENT' },
        { value: 'TEST' },
        { value: 'PRODUCTION' }
      ]
      return environments[this.getRandom(0, environments.length)].value
    },
    getAppName () {
      let apps = [
        { value: 'contaazul' },
        { value: 'ca-invoices-api' },
        { value: 'ca-customers-api' },
        { value: 'ca-products-api' }
      ]
      return apps[this.getRandom(0, apps.length)].value
    },
    getHost () {
      let hosts = [
        { value: 'contaazul.com' },
        { value: 'api.contaazul.com' },
        { value: 'zuul.ws.contaazul.io' },
        { value: 'eureka.contaazul.ca' }
      ]
      return hosts[this.getRandom(0, hosts.length)].value
    },
    ,
    getIP () {
      let ips = [
        { value: '184.12.122.32' },
        { value: '176.233.11.1' },
        { value: '189.1.232.123' },
        { value: '177.55.32.111' }
      ]
      return ips[this.getRandom(0, ips.length)].value
    }
    getTitle () {
      let titles = [
        { value: 'org.apache.cxf.configuration.spring.ConfigurerImpl' },
        { value: 'org.apache.cxf.service.factory.ReflectionServiceFactoryBean' },
        { value: 'com.contaazul.util.ConfigParam.load:59' },
        { value: 'java.lang.NullPointerException' },
        { value: 'org.jboss.web.tomcat.service.deployers.TomcatDeployment' },
        { value: 'com.contaazul.framework.commons.PathTrack.track:13' },
        { value: 'com.contaazul.call.VerifyWSESB.isUsuarioAPS:1482' },
        { value: 'com.contaazul.framework.email.EmailBeanPopulate.getDsEmailMsg:98' },
        { value: 'com.contaazul.framework.dao.NotaFiscal.executeSqlForSolic:123' },
        { value: 'com.contaazul.framework.dao.NotaFiscal.EmailBeanPopulate:22' },
        { value: 'com.contaazul.framework.service.NotaFiscal.PathTrack:22' },
        { value: 'com.contaazul.framework.service.NotaFiscal.executeSqlForSolic:22' },
        { value: 'com.contaazul.framework.service.NotaFiscal.ReflectionServiceFactoryBean:22' },
        { value: 'com.contaazul.framework.dao.NotaFiscal.ConfigParam:22' },
        { value: 'com.contaazul.framework.dao.NotaFiscal.service.getDeployers:22' },
        { value: 'com.contaazul.framework.dao.FluxoCaixa.EmailBeanPopulate:22' },
        { value: 'com.contaazul.framework.service.FluxoCaixa.PathTrack:22' },
        { value: 'com.contaazul.framework.service.FluxoCaixa.executeSqlForSolic:22' },
        { value: 'com.contaazul.framework.service.FluxoCaixa.ReflectionServiceFactoryBean:22' },
        { value: 'com.contaazul.framework.dao.FluxoCaixa.ConfigParam:22' },
        { value: 'com.contaazul.framework.dao.FluxoCaixa.service.getDeployers:22' },
        { value: 'com.contaazul.framework.dao.Administrator.executeSqlForSolic:434' },
        { value: 'com.contaazul.framework.dao.Customer.executeSqlForSolic:23' },
        { value: 'com.contaazul.framework.dao.Invoice.executeSqlForSolic:77' },
        { value: 'com.contaazul.framework.dao.Product.executeSqlForSolic:43' },
        { value: 'com.contaazul.framework.dao.Provider.executeSqlForSolic:123' },
        { value: 'com.contaazul.framework.dao.HistoricoSolicitacaoDAO.executeSqlForSolic:456' }
      ]
      return titles[this.getRandom(0, titles.length)].value
    },
    getRandom (min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min)) + min
    },
    stopGenerate () {
      console.log('stop!')
      window.clearInterval(this.intervalLive)
    },
    startGenerate () {
      console.log('start!')
      this.intervalLive = window.setInterval(() => {
        this.generateLog()
      }, 500)
    },
    generate () {
      console.log('generating ...')
      this.onGenerate = !this.onGenerate
      if (this.onGenerate) {
        this.startGenerate()
      } else {
        this.stopGenerate()
      }
    }
  }
}
</script>
