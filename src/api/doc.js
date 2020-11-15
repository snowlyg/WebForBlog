import request from '@/utils/request'

export function getPublishedDocs(query) {
  return request({
    url: '/docs',
    method: 'get',
    params: query
  })
}
export function getPublishedDoc(id) {
  return request({
    url: `/docs/${id}`,
    method: 'get',
    params: {
      relation: 'Chapters'
    }
  })
}

export function getDocs(query) {
  return request({
    url: '/admin/docs',
    method: 'get',
    params: query
  })
}

export function addDoc(data) {
  return request({
    url: '/admin/docs',
    method: 'post',
    data
  })
}

export function fetchDoc(id) {
  return request({
    url: `/admin/docs/${id}`,
    method: 'get'
  })
}
export function updateDoc(id, data) {
  return request({
    url: `/admin/docs/${id}`,
    method: 'put',
    data
  })
}

export function deleteDoc(id) {
  return request({
    url: `/admin/docs/${id}`,
    method: 'delete'
  })
}
