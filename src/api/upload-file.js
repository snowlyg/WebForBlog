import request from '@/utils/request'

export function uploadFile() {
  return request({
    url: '/admin/upload_file',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
