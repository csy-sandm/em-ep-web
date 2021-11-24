import myrequest from '@/utils/axios'

/** 部门信息查询:分页查询数据 */
export function departmentInfoQueryListByPage (params) {
  return myrequest({
    url: '/v1/DepartmentInfoController/queryListByPage',
    method: 'post',
    data: params
  })
}

/** 部门信息查询:无分页 */
export function departmentInfoQueryList (params) {
  return myrequest({
    url: '/v1/DepartmentInfoController/queryList',
    method: 'post',
    data: params
  })
}

/** 部门信息插入:批量插入 */
export function departmentInfoInsertList (params) {
  return myrequest({
    url: '/v1/DepartmentInfoController/insertList',
    method: 'post',
    data: params
  })
}

/** 部门信息插入:单条插入 */
export function departmentInfoInsert (params) {
  return myrequest({
    url: '/v1/DepartmentInfoController/insert',
    method: 'post',
    data: params
  })
}

/** 更新部门信息数据:批量更新 */
export function departmentInfoUpdateList (params) {
  return myrequest({
    url: '/v1/DepartmentInfoController/updateList',
    method: 'post',
    data: params
  })
}

/** 更新部门信息数据:单条更新 */
export function departmentInfoUpdate (params) {
  return myrequest({
    url: '/v1/DepartmentInfoController/update',
    method: 'post',
    data: params
  })
}

/** 删除部门信息:单条删除 */
export function departmentInfoDelete (params) {
  return myrequest({
    url: '/v1/DepartmentInfoController/delete',
    method: 'post',
    data: params
  })
}
