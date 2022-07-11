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
