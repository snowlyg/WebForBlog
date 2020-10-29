import request from '@/utils/request'

export function getArticleTypes(query) {
  return request({
    url: '/types',
    method: 'get',
    params: query
  })
}
export function getTypes(query) {
  return request({
    url: '/admin/types',
    method: 'get',
    params: query
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
