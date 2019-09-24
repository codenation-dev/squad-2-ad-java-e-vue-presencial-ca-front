import Vue from 'vue'
import level from '@/domains/level'
import environment from '@/domains/environment'

Vue.filter('level', (value) => {
  if (!value) return ''
  return level.filter((l) => l.value === value).map((l) => { return l.text })[0]
})

Vue.filter('environment', (value) => {
  if (!value) return ''
  return environment.filter((l) => l.value === value).map((l) => { return l.text })[0]
})
