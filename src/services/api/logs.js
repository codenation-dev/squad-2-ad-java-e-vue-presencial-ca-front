import http from '../config/http'

const add = log => http.post('/api/v1/logs', log, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

const search = (filters) => http.get('/api/v1/logs', {
  params: filters,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

const findById = id => http.get(`/api/v1/logs/${id}`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

const archiveById = id => http.put(`/api/v1/logs/${id}/archive`, null, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

export default {
  add,
  search,
  findById,
  archiveById
}
