import request from '@/utils/request'

// 获取员工列表
export function getEmployeeSimple () {
  return request({
    method: 'GET',
    url: '/sys/user/simple'
  })
}

// 获取员工详细信息
export function getEmployeeList (params) {
  return request({
    method: 'GET',
    url: '/sys/user',
    params
  })
}

// 删除员工
export function deleteRole (id) {
  return request({
    method: 'DELETE',
    url: `/sys/user/${id}`
  })
}
