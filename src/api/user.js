import request from '@/utils/request'

export function login (data) {
  return request({
    method: 'post',
    url: '/sys/login',
    data
  })
}

// 获取用户基本资料
export function getUserInfo () {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

// 获取用户基本信息
export function getUserDetailById (id) {
  return request({
    url: `/sys/user/${id}`
  })
}

export function logout () {

}
