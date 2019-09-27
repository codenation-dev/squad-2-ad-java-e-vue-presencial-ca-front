import router from '@/router/index'
import OAuthService from '@/services/api/oauth.js'

const login = ({ commit }, payload) => {
  let token = null
  commit('application/SET_ERROR', false, { root: true })
  commit('application/SET_LOADING', true, { root: true })
  OAuthService.getToken(payload)
    .then((reponse) => {
      token = reponse.data.access_token
      return OAuthService.self(token)
    })
    .then((currentUser) => {
      localStorage.setItem('token', token)
      commit('application/SET_CURRENT_USER', currentUser.data, { root: true })
      commit('application/SET_TOKEN', token, { root: true })
      commit('application/SET_LOADING', false, { root: true })
      router.push('/logs')
    })
    .catch(() => {
      commit('application/SET_LOADING', false, { root: true })
      commit('application/SET_ERROR', true, { root: true })
    })
}

const register = ({ commit }, payload) => {
  commit('application/SET_LOADING', true, { root: true })
  OAuthService.signup(payload)
    .then(() =>{
      commit('application/SET_LOADING', false, { root: true })
      login({ commit }, payload)
    })
    .catch(() => {
      commit('application/SET_LOADING', false, { root: true })
      commit('application/SET_ERROR', true, { root: true })
    })
}

const logout = ({ commit }) => {
  commit('application/CLEAR_CURRENT_USER', null, { root: true })
  commit('application/SET_TOKEN', null, { root: true })
  router.push('/login')
}

export default {
  login,
  register,
  logout
}
