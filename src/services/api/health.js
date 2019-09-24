import http from '../config/http'

const check = () => http.get('/actuator/health', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

export default {
  check
}
