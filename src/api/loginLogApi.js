import myrequest from '@/utils/axios'

/** 登录日志查询:分页查询数据 */
export function loginLogQueryListByPage(params) {
	return myrequest({
		url: '/LoginLogController/queryListByPage',
		method: 'post',
		data: params
	})
}

/** 登录日志查询:无分页 */
export function  loginLogQueryList(params) {
	return myrequest({
		url: '/LoginLogController/queryList',
		method: 'post',
		data: params
	})
}

/** 登录日志插入:批量插入 */
export function  loginLogInsertList(params) {
	return myrequest({
		url: '/LoginLogController/insertList',
		method: 'post',
		data: params
	})
}

/** 登录日志插入:单条插入 */
export function  loginLogInsert(params) {
	return myrequest({
		url: '/LoginLogController/insert',
		method: 'post',
		data: params
	})
}

/** 更新登录日志数据:批量更新 */
export function  loginLogUpdateList(params) {
	return myrequest({
		url: '/LoginLogController/updateList',
		method: 'post',
		data: params
	})
}

/** 更新登录日志数据:单条更新 */
export function  loginLogUpdate(params) {
	return myrequest({
		url: '/LoginLogController/update',
		method: 'post',
		data: params
	})
}

/** 删除登录日志:单条删除 */
export function  loginLogDelete(params) {
	return myrequest({
		url: '/LoginLogController/delete',
		method: 'post',
		data: params
	})
}