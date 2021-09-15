import myrequest from '@/utils/axios'

/** 工单实时动态查询:分页查询数据 */
export function workorderDataQueryListByPage(params) {
	return myrequest({
		url: '/em-ep/WorkorderDataController/queryListByPage',
		method: 'post',
		data: params
	})
}

/** 工单实时动态查询:无分页 */
export function  workorderDataQueryList(params) {
	return myrequest({
		url: '/em-ep/WorkorderDataController/queryList',
		method: 'post',
		data: params
	})
}

/** 工单实时动态插入:批量插入 */
export function  workorderDataInsertList(params) {
	return myrequest({
		url: '/em-ep/WorkorderDataController/insertList',
		method: 'post',
		data: params
	})
}

/** 工单实时动态插入:单条插入 */
export function  workorderDataInsert(params) {
	return myrequest({
		url: '/em-ep/WorkorderDataController/insert',
		method: 'post',
		data: params
	})
}

/** 更新工单实时动态数据:批量更新 */
export function  workorderDataUpdateList(params) {
	return myrequest({
		url: '/em-ep/WorkorderDataController/updateList',
		method: 'post',
		data: params
	})
}

/** 更新工单实时动态数据:单条更新 */
export function  workorderDataUpdate(params) {
	return myrequest({
		url: '/em-ep/WorkorderDataController/update',
		method: 'post',
		data: params
	})
}

/** 删除工单实时动态:单条删除 */
export function  workorderDataDelete(params) {
	return myrequest({
		url: '/em-ep/WorkorderDataController/delete',
		method: 'post',
		data: params
	})
}