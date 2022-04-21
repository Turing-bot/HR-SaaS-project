import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'

const state = {
  token: getToken() // 设置token初始状态
}
const mutations = {
  // 设置token
  setToken (state, token) {
    state.token = token
    setToken(token)
  },
  removeToken (state) {
    state.token = null
    removeToken()
  }
}
const actions = {
  async login (context, data) {
    const result = await login(data)
    context.commit('setToken', result)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
