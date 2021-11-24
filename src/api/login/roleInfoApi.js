import myrequest from '@/utils/axios'

/** 角色表查询:分页查询数据 */
export function roleInfoQueryListByPage (params) {
  return myrequest({
    url: '/v1/RoleInfoController/queryListByPage',
    method: 'post',
    data: params
  })
}

/** 角色表查询:无分页 */
export function roleInfoQueryList (params) {
  return myrequest({
    url: '/v1/RoleInfoController/queryList',
    method: 'post',
    data: params
  })
}

/** 角色表插入:批量插入 */
export function roleInfoInsertList (params) {
  return myrequest({
    url: '/v1/RoleInfoController/insertList',
    method: 'post',
    data: params
  })
}

/** 角色表插入:单条插入 */
export function roleInfoInsert (params) {
  return myrequest({
    url: '/v1/RoleInfoController/insert',
    method: 'post',
    data: params
  })
}

/** 更新角色表数据:批量更新 */
export function roleInfoUpdateList (params) {
  return myrequest({
    url: '/v1/RoleInfoController/updateList',
    method: 'post',
    data: params
  })
}

/** 更新角色表数据:单条更新 */
export function roleInfoUpdate (params) {
  return myrequest({
    url: '/v1/RoleInfoController/update',
    method: 'post',
    data: params
  })
}

/** 删除角色表:单条删除 */
export function roleInfoDelete (params) {
  return myrequest({
    url: '/v1/RoleInfoController/delete',
    method: 'post',
    data: params
  })
}
