import request from '@/utils/request'

export function fetchChapter(id) {
  return request({
    url: `/admin/chapters/${id}`,
    method: 'get'
  })
}

export function getChapters(docId) {
  return request({
    url: '/admin/chapters',
    method: 'get',
    params: {
      docId: docId
    }
  })
}

export function addChapter(data) {
  return request({
    url: '/admin/chapters',
    method: 'post',
    data
  })
}

export function updateChapter(id, data) {
  return request({
    url: `/admin/chapters/${id}`,
    method: 'put',
    data
  })
}

export function deleteChapter(id) {
  return request({
    url: `/admin/chapters/${id}`,
    method: 'delete'
  })
}
