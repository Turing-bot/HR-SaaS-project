import request from '@/utils/request'

// 用户登录
export function login (data) {
  return request({
    method: 'POST',
    url: '/sys/login',
    data
  })
}

export function getInfo () {

}

export function logout () {

}
