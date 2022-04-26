import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'

const state = {
  token: getToken(), // 设置token初始状态
  userInfo: {}
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
  },
  // 设置用户信息
  setUserInfo (state, result) {
    state.userInfo = result
  },
  // 删除用户信息
  removeUserInfo (state) {
    state.userInfo = {}
  }
}
const actions = {
  async login (context, data) {
    const result = await login(data)
    context.commit('setToken', result)
    setTimeStamp()
  },
  // 获取用户资料action
  async getUserInfo (context) {
    const result = await getUserInfo()
    const baseInfo = await getUserDetailById(result.userId)
    const baseResult = { ...result, ...baseInfo }
    context.commit('setUserInfo', baseResult)
    return baseResult
  },
  // 登出的action
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
