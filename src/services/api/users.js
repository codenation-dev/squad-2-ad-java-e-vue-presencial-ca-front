import http from '../config/http'

const findAll = token => http.get('/api/v1/users', {
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export default {
  findAll
}
