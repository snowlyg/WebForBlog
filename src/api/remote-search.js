import request from '@/utils/request'

export function searchUser(name) {
  return request({
    url: '/admin/users',
    method: 'get',
    params: {
      name: name + ':like'
    }
  })
}

export function transactionList(query) {
  return request({
    url: '/admin/transaction/list',
    method: 'get',
    params: query
  })
}
