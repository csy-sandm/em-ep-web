import myrequest from '@/utils/axios'

/** 部门信息查询:分页查询数据 */
export function departInfoQueryListByPage (params) {
  return myrequest({
    url: '/em-ep/DepartInfoController/queryListByPage',
    method: 'post',
    data: params
  })
}

/** 部门信息查询:无分页 */
export function departInfoQueryList (params) {
  return myrequest({
    url: '/em-ep/DepartInfoController/queryList',
    method: 'post',
    data: params
  })
}

/** 部门信息插入:批量插入 */
export function departInfoInsertList (params) {
  return myrequest({
    url: '/em-ep/DepartInfoController/insertList',
    method: 'post',
    data: params
  })
}

/** 部门信息插入:单条插入 */
export function departInfoInsert (params) {
  return myrequest({
    url: '/em-ep/DepartInfoController/insert',
    method: 'post',
    data: params
  })
}

/** 更新部门信息数据:批量更新 */
export function departInfoUpdateList (params) {
  return myrequest({
    url: '/em-ep/DepartInfoController/updateList',
    method: 'post',
    data: params
  })
}

/** 更新部门信息数据:单条更新 */
export function departInfoUpdate (params) {
  return myrequest({
    url: '/em-ep/DepartInfoController/update',
    method: 'post',
    data: params
  })
}

/** 删除部门信息:单条删除 */
export function departInfoDelete (params) {
  return myrequest({
    url: '/em-ep/DepartInfoController/delete',
    method: 'post',
    data: params
  })
}
