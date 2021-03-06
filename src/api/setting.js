import request from '@/utils/request'

// 获取角色信息
export function getRoleInfo (params) {
  return request({
    method: 'GET',
    url: '/sys/role',
    params
  })
}

// 获取企业信息
export function getCompanyInfo (companyId) {
  return request({
    method: 'GET',
    url: `/company/${companyId}`
  })
}

// 删除角色
export function deleteRole (id) {
  return request({
    method: 'DELETE',
    url: `/sys/role/${id}`
  })
}

// 编辑角色信息
export function editRoleInfo (data) {
  return request({
    method: 'PUT',
    url: `/sys/role/${data.id}`,
    data
  })
}

// 获取角色详细信息
export function getRoleDetail (id) {
  return request({
    method: 'GET',
    url: `/sys/role/${id}`
  })
}

// 新增角色
export function addRole (data) {
  return request({
    method: 'POST',
    url: '/sys/role',
    data
  })
}

// 角色分配权限
export function assignPerm (data) {
  return request({
    method: 'PUT',
    url: '/sys/role/assignPrem',
    data
  })
}
