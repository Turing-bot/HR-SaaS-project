import PageTools from './PageTools/index.vue'

// 注册全局通用的通用栏组件对象
export default {
  install (Vue) {
    Vue.component('PageTools', PageTools)
  }
}
