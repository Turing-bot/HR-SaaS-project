import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo, getUserById } from '@/api/user'

// 状态
const state = {
  token: getToken(),
  userInfo: {}
}
// 修改状态
const mutations = {
  setToken (state, token) {
    state.token = token
    setToken(token)
  },
  removeToken (state) {
    state.Token = null
    removeToken()
  },
  setUserInfo (state, result) {
    state.userInfo = result
  },
  removeUserInfo (state) {
    state.userInfo = {}
  }
}
// 执行异步
const actions = {
  async login (context, data) {
    const result = await login(data)
    context.commit('setToken', result)
  },
  async getUserInfo (context) {
    const result = await getUserInfo()
    const baseInfo = await getUserById(result.userId)
    const baseResult = { ...result, ...baseInfo }
    context.commit('setUserInfo', baseResult)
    return baseResult
  },
  logout (context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
