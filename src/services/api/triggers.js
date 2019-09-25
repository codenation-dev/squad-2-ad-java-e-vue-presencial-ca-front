import http from '../config/http'

const add = trigger => http.post('/api/v1/triggers', trigger, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

const findAll = () => http.get('/api/v1/triggers', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

const findById = id => http.get(`/api/v1/triggers/${id}`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

const updateById = (id, trigger) => http.put(`/api/v1/triggers/${id}`, trigger, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

const archiveById = id => http.put(`/api/v1/triggers/${id}/archive`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

const activeById = id => http.put(`/api/v1/triggers/${id}/active`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

const desactiveById = id => http.delete(`/api/v1/triggers/${id}/active`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

export default {
  add,
  findAll,
  findById,
  updateById,
  archiveById,
  activeById,
  desactiveById
}
