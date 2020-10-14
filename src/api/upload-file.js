import request from '@/utils/request'

export function uploadFile(file) {
  const formData = new FormData()
  formData.append('uploadfile', file)
  return request.post('/admin/upload_file', formData, { headers: { 'Content-Type': 'multipart/form-data' }})
}
