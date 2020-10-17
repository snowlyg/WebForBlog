import request from '@/utils/request'

export function getConfigs() {
  return request({
    url: '/admin/configs',
    method: 'get'
  })
}

export function addConfig(data) {
  return request({
    url: '/admin/configs',
    method: 'post',
    data
  })
}

export function updateConfig(id, data) {
  return request({
    url: `/admin/configs/${id}`,
    method: 'put',
    data
  })
}

export function deleteConfig(id) {
  return request({
    url: `/admin/configs/${id}`,
    method: 'delete'
  })
}
