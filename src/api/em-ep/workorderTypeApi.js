import myrequest from '@/utils/axios'

/** 工单类型维表查询:分页查询数据 */
export function workorderTypeQueryListByPage(params) {
	return myrequest({
		url: '/em-ep/WorkorderTypeController/queryListByPage',
		method: 'post',
		data: params
	})
}

/** 工单类型维表查询:无分页 */
export function  workorderTypeQueryList(params) {
	return myrequest({
		url: '/em-ep/WorkorderTypeController/queryList',
		method: 'post',
		data: params
	})
}

/** 工单类型维表插入:批量插入 */
export function  workorderTypeInsertList(params) {
	return myrequest({
		url: '/em-ep/WorkorderTypeController/insertList',
		method: 'post',
		data: params
	})
}

/** 工单类型维表插入:单条插入 */
export function  workorderTypeInsert(params) {
	return myrequest({
		url: '/em-ep/WorkorderTypeController/insert',
		method: 'post',
		data: params
	})
}

/** 更新工单类型维表数据:批量更新 */
export function  workorderTypeUpdateList(params) {
	return myrequest({
		url: '/em-ep/WorkorderTypeController/updateList',
		method: 'post',
		data: params
	})
}

/** 更新工单类型维表数据:单条更新 */
export function  workorderTypeUpdate(params) {
	return myrequest({
		url: '/em-ep/WorkorderTypeController/update',
		method: 'post',
		data: params
	})
}

/** 删除工单类型维表:单条删除 */
export function  workorderTypeDelete(params) {
	return myrequest({
		url: '/em-ep/WorkorderTypeController/delete',
		method: 'post',
		data: params
	})
}