import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import Component from './components'
import Print from 'vue-print-nb'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import * as directives from '@/directives'
import * as filters from '@/filters' // 引入工具类
import checkPermission from '@/mixin/checkPermission'
import i18n from '@/lang'

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })

// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.use(ElementUI, { i18n: (key, value) => i18n.t(key, value) })

// 注册通用栏组件
Vue.use(Component)

// 注册打印插件
Vue.use(Print)

// 所有组件注册检查方法
Vue.mixin(checkPermission)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
