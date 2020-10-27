import request from '@/utils/request'

export function getArticleDocs(query) {
  return request({
    url: '/docs',
    method: 'get',
    params: query
  })
}
export function getArticleDoc(id) {
  return request({
    url: `/docs/${id}`,
    method: 'get',
    params: {
      relation: 'Chapters'
    }
  })
}

export function getDocs() {
  return request({
    url: '/admin/docs',
    method: 'get'
  })
}

export function addDoc(data) {
  return request({
    url: '/admin/docs',
    method: 'post',
    data
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
