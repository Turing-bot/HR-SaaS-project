import request from '@/utils/request'

// 用户登录
export function login (data) {
  return request({
    method: 'POST',
    url: '/sys/login',
    data
  })
}

// 获取用户信息
export function getUserInfo () {
  return request({
    method: 'POST',
    url: '/sys/profile'
  })
}

export function logout () {

}
