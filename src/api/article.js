import request from '@/utils/request'

export function like(id) {
  return request({
    url: `/article/like/${id}`,
    method: 'get'
  })
}

export function indexList(query) {
  return request({
    url: '/article',
    method: 'get',
    params: query
  })
}

export function indexDetail(id) {
  return request({
    url: `/article/${id}`,
    method: 'get',
    params: { relation: 'Type;Tags' }
  })
}
export function fetchList(query) {
  return request({
    url: '/admin/article',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: `/admin/article/${id}`,
    method: 'get',
    params: {
      relation: 'Type;Tags'
    }
  })
}

export function createArticle(data) {
  return request({
    url: '/admin/article',
    method: 'post',
    data
  })
}

export function updateArticle(data, id) {
  return request({
    url: `/admin/article/${id}`,
    method: 'put',
    data
  })
}

export function deleteArticle(id) {
  return request({
    url: `/admin/article/${id}`,
    method: 'delete'
  })
}
