import request from '@/utils/request'

export function uploadFile(formData) {
  return request.post('/admin/upload_file', formData, { headers: { 'Content-Type': 'multipart/form-data' }})
}
