import request from '@/utils/request'

export function getArticleTags(query) {
  return request({
    url: '/tags',
    method: 'get',
    params: query
  })
}

export function getTags(query) {
  return request({
    url: '/admin/tags',
    method: 'get',
    params: query
  })
}

export function addTag(data) {
  return request({
    url: '/admin/tags',
    method: 'post',
    data
  })
}

export function updateTag(id, data) {
  return request({
    url: `/admin/tags/${id}`,
    method: 'put',
    data
  })
}

export function deleteTag(id) {
  return request({
    url: `/admin/tags/${id}`,
    method: 'delete'
  })
}
