import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserById } from '@/api/user'
import { resetRouter } from '@/router'

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
    state.token = null
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
    setTimeStamp()
  },
  async getUserInfo (context) {
    const result = await getUserInfo()
    const baseInfo = await getUserById(result.userId)
    const baseResult = { ...result, ...baseInfo }
    context.commit('setUserInfo', baseResult)
    return result
  },
  logout (context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
    resetRouter()
    context.commit('permission/setRoutes', [], { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
