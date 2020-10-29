import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/admin/permissions',
    method: 'get',
    params: {
      offset: -1,
      limit: -1
    }
  })
}

export function getRoles(query) {
  return request({
    url: '/admin/roles',
    method: 'get',
    params: query
  })
}

export function addRole(data) {
  return request({
    url: '/admin/roles',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/admin/roles/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/admin/roles/${id}`,
    method: 'delete'
  })
}
