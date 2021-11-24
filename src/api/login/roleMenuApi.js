import myrequest from '@/utils/axios'

export function roleMenuDeleteList (params) {
  return myrequest({
    url: '/v1/RoleMenuController/deleteList',
    method: 'post',
    data: params
  })
}

export function roleMenuInsertList (params) {
  return myrequest({
    url: '/v1/RoleMenuController/insertList',
    method: 'post',
    data: params
  })
}
