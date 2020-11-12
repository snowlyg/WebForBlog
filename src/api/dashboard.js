import request from '@/utils/request'

export function getDatas() {
  return request({
    url: '/admin/dashboard',
    method: 'get'
  })
}
