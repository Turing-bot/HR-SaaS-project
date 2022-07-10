import request from '@/utils/request'

// 获取组织架构数据
export function getDepartmentsData () {
  return request({
    url: '/company/department'
  })
}

// 删除部门
export function delDepartments (id) {
  return request({
    method: 'DELETE',
    url: `/company/department/${id}`
  })
}

// 新增部门
export function addDepartments (data) {
  return request({
    method: 'POST',
    url: '/company/department',
    data
  })
}

// 获取部门详情
export function getDepartDetail (id) {
  return request({
    url: `/company/department/${id}`
  })
}

// 编辑部门
export function editDepartments (data) {
  return request({
    method: 'PUT',
    url: `/company/department/${data.id}`,
    data
  })
}
