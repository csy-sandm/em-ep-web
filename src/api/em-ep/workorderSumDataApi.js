import myrequest from '@/utils/axios'

/** 工单总表表查询:分页查询数据 */
export function workorderSumDataQueryListByPage(params) {
	return myrequest({
		url: '/em-ep/WorkorderSumDataController/queryListByPage',
		method: 'post',
		data: params
	})
}

/** 工单总表表查询:无分页 */
export function  workorderSumDataQueryList(params) {
	return myrequest({
		url: '/em-ep/WorkorderSumDataController/queryList',
		method: 'post',
		data: params
	})
}

/** 工单总表表插入:批量插入 */
export function  workorderSumDataInsertList(params) {
	return myrequest({
		url: '/em-ep/WorkorderSumDataController/insertList',
		method: 'post',
		data: params
	})
}

/** 工单总表表插入:单条插入 */
export function  workorderSumDataInsert(params) {
	return myrequest({
		url: '/em-ep/WorkorderSumDataController/insert',
		method: 'post',
		data: params
	})
}

/** 更新工单总表表数据:批量更新 */
export function  workorderSumDataUpdateList(params) {
	return myrequest({
		url: '/em-ep/WorkorderSumDataController/updateList',
		method: 'post',
		data: params
	})
}

/** 更新工单总表表数据:单条更新 */
export function  workorderSumDataUpdate(params) {
	return myrequest({
		url: '/em-ep/WorkorderSumDataController/update',
		method: 'post',
		data: params
	})
}

/** 删除工单总表表:单条删除 */
export function  workorderSumDataDelete(params) {
	return myrequest({
		url: '/em-ep/WorkorderSumDataController/delete',
		method: 'post',
		data: params
	})
}