import myrequest from '@/utils/axios'

/** 操作日志查询:分页查询数据 */
export function operateLogQueryListByPage(params) {
	return myrequest({
		url: '/OperateLogController/queryListByPage',
		method: 'post',
		data: params
	})
}

/** 操作日志查询:无分页 */
export function  operateLogQueryList(params) {
	return myrequest({
		url: '/OperateLogController/queryList',
		method: 'post',
		data: params
	})
}

/** 操作日志插入:批量插入 */
export function  operateLogInsertList(params) {
	return myrequest({
		url: '/OperateLogController/insertList',
		method: 'post',
		data: params
	})
}

/** 操作日志插入:单条插入 */
export function  operateLogInsert(params) {
	return myrequest({
		url: '/OperateLogController/insert',
		method: 'post',
		data: params
	})
}

/** 更新操作日志数据:批量更新 */
export function  operateLogUpdateList(params) {
	return myrequest({
		url: '/OperateLogController/updateList',
		method: 'post',
		data: params
	})
}

/** 更新操作日志数据:单条更新 */
export function  operateLogUpdate(params) {
	return myrequest({
		url: '/OperateLogController/update',
		method: 'post',
		data: params
	})
}

/** 删除操作日志:单条删除 */
export function  operateLogDelete(params) {
	return myrequest({
		url: '/OperateLogController/delete',
		method: 'post',
		data: params
	})
}