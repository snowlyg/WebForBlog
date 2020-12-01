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

export function fetchPublishedChaptersByDocId(query) {
  return request({
    url: `/chapter`,
    method: 'get',
    params: query
  })
}

export function likeChapter(id) {
  return request({
    url: `/chapter/like/${id}`,
    method: 'get'
  })
}

export function prevChapter(sort) {
  return request({
    url: `/chapter/prev/${sort}`,
    method: 'get',
    params: {
      relation: 'Doc'
    }

  })
}

export function nextChapter(sort) {
  return request({
    url: `/chapter/next/${sort}`,
    method: 'get',
    params: {
      relation: 'Doc'
    }
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

export function deleteChapter(id, docId) {
  return request({
    url: `/admin/chapters/${id}/doc/${docId}`,
    method: 'delete'
  })
}
