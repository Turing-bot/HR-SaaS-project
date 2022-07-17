import { constantRoutes, dynamicRoutes } from '@/router'

const state = {
  routes: constantRoutes
}
const mutations = {
  setRoutes (state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes]
  }
}
const actions = {
  filterRoutes (context, menus) {
    const routes = []
    menus.forEach(key => {
      routes.push(...dynamicRoutes.filter(item => item.name === key))
    })
    context.commit('setRoutes', routes)
    return routes
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions
}
