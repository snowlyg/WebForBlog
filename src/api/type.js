import request from '@/utils/request'

export function getTypes() {
  return request({
    url: '/admin/types',
    method: 'get'
  })
}

export function addType(data) {
  return request({
    url: '/admin/types',
    method: 'post',
    data
  })
}

export function updateType(id, data) {
  return request({
    url: `/admin/types/${id}`,
    method: 'put',
    data
  })
}

export function deleteType(id) {
  return request({
    url: `/admin/types/${id}`,
    method: 'delete'
  })
}
