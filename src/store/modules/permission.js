import { constantRoutes } from '@/router'

const state = {
  routes: constantRoutes
}
const mutations = {
  setRoutes (state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes]
  }
}
const actions = {}

export default {
  namespace: true,
  state,
  mutations,
  actions
}
