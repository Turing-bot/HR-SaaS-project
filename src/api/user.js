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

// 获取用户基本信息（头像）
export function getUserById (id) {
  return request({
    method: 'GET',
    url: `/sys/user/${id}`
  })
}

export function logout () {

}
