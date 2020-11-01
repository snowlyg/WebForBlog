import request from '@/utils/request'

export function fetchPublishedChapter(id) {
  return request({
    url: `/chapter/${id}`,
    method: 'get',
    params: {
      relation: 'Doc'
    }
  })
}

export function like(id) {
  return request({
    url: `/chapter/like/${id}`,
    method: 'get'
  })
}

export function fetchChapter(id) {
  return request({
    url: `/admin/chapters/${id}`,
    method: 'get',
    params: {
      relation: 'Doc'
    }
  })
}

export function getChapters(query) {
  return request({
    url: '/admin/chapters',
    method: 'get',
    params: query
  })
}

export function addChapter(data) {
  return request({
    url: '/admin/chapters',
    method: 'post',
    data
  })
}

export function updateChapter(data, id) {
  return request({
    url: `/admin/chapters/${id}`,
    method: 'put',
    data
  })
}

export function setChapterSort(data, id) {
  return request({
    url: `/admin/chapters/${id}/set_sort`,
    method: 'put',
    data
  })
}

export function sortChapter(data) {
  return request({
    url: `/admin/chapters/sort`,
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
