import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getTimeStamp } from '@/utils/auth'

const TimeOut = 3600

// 创建一个axios的实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    if (IsCheckTimeOut()) {
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token超时了!'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, error => {
  Message.error(error.message)
  return Promise.reject(error)
})

function IsCheckTimeOut () {
  var currentTime = Date.now()
  var timeStamp = getTimeStamp()
  return (currentTime - timeStamp) / 1000 > TimeOut
}

// 导出axios实例
export default service 
