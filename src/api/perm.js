import request from '@/utils/request'

export function getPerms(query) {
  return request({
    url: '/admin/permissions',
    method: 'get',
    params: query
  })
}

export function addPerm(data) {
  return request({
    url: '/admin/permissions',
    method: 'post',
    data
  })
}

export function updatePerm(id, data) {
  return request({
    url: `/admin/permissions/${id}`,
    method: 'put',
    data
  })
}

export function deletePerm(id) {
  return request({
    url: `/admin/permissions/${id}`,
    method: 'delete'
  })
}
