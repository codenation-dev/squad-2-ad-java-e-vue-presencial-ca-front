import http from '../config/http'

const add = user => http.post('/api/v1/users', user)

const self = token => http.get('/api/v1/users/self', {
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export default {
  add,
  self
}
