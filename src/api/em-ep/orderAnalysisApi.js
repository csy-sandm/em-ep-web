import myrequest from '@/utils/axios'

/** 工单统计查询:分页查询数据 */
export function orderAnalysisQueryListByPage(params) {
	return myrequest({
		url: '/em-ep/OrderAnalysisController/queryListByPage',
		method: 'post',
		data: params
	})
}

/** 工单统计查询:无分页 */
export function  orderAnalysisQueryList(params) {
	return myrequest({
		url: '/em-ep/OrderAnalysisController/queryList',
		method: 'post',
		data: params
	})
}

/** 工单统计插入:批量插入 */
export function  orderAnalysisInsertList(params) {
	return myrequest({
		url: '/em-ep/OrderAnalysisController/insertList',
		method: 'post',
		data: params
	})
}

/** 工单统计插入:单条插入 */
export function  orderAnalysisInsert(params) {
	return myrequest({
		url: '/em-ep/OrderAnalysisController/insert',
		method: 'post',
		data: params
	})
}

/** 更新工单统计数据:批量更新 */
export function  orderAnalysisUpdateList(params) {
	return myrequest({
		url: '/em-ep/OrderAnalysisController/updateList',
		method: 'post',
		data: params
	})
}

/** 更新工单统计数据:单条更新 */
export function  orderAnalysisUpdate(params) {
	return myrequest({
		url: '/em-ep/OrderAnalysisController/update',
		method: 'post',
		data: params
	})
}

/** 删除工单统计:单条删除 */
export function  orderAnalysisDelete(params) {
	return myrequest({
		url: '/em-ep/OrderAnalysisController/delete',
		method: 'post',
		data: params
	})
}