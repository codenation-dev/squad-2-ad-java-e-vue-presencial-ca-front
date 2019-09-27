import http from '../config/http'

const endpoint = '/api/v1/logs'

const add = log => http.post(endpoint, log, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

const exportCSV = (filters) => http.get(`${endpoint}/export`, {
  params: filters,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

const search = (filters) => http.get(endpoint, {
  params: filters,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

const findById = id => http.get(`${endpoint}/${id}`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

const archiveById = id => http.put(`${endpoint}/${id}/archive`, null, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

export default {
  add,
  search,
  exportCSV,
  findById,
  archiveById
}
