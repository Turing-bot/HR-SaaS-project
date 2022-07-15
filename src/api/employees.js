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

// 新增员工
export function addRole (data) {
  return request({
    method: 'POST',
    url: '/sys/user',
    data
  })
}

// 导入员工
export function importRole (data) {
  return request({
    method: 'POST',
    url: '/sys/user/batch',
    data
  })
}

// 保存员工基本信息
export function saveRoleInfo (data) {
  return request({
    method: 'PUT',
    url: `/sys/user/${data.id}`,
    data
  })
}

// 读取用户详情的基础信息
export function getPersonalDetail (id) {
  return request({
    method: 'GET',
    url: `/employees/${id}/personalInfo`
  })
}

// 更新用户详情的基础信息
export function updatePersonal (data) {
  return request({
    method: 'PUT',
    url: `/employees/${data.userId}/personalInfo`,
    data
  })
}

// 获取用户的岗位信息
export function getJobDetail (id) {
  return request({
    method: 'GET',
    url: `/employees/${id}/jobs`
  })
}

// 保存岗位信息
export function updateJob (data) {
  return request({
    method: 'PUT',
    url: `/employees/${data.userId}/jobs`,
    data
  })
}

// 员工分配角色
export function assignRole (data) {
  return request({
    method: 'PUT',
    url: '/sys/user/assignRoles',
    data
  })
}
