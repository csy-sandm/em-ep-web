import myrequest from '@/utils/axios'

/** 计划工单查询:分页查询数据 */
export function planWorkorderInfoQueryListByPage(params) {
	return myrequest({
		url: '/em-ep/PlanWorkorderInfoController/queryListByPage',
		method: 'post',
		data: params
	})
}

/** 计划工单查询:无分页 */
export function  planWorkorderInfoQueryList(params) {
	return myrequest({
		url: '/em-ep/PlanWorkorderInfoController/queryList',
		method: 'post',
		data: params
	})
}

/** 计划工单插入:批量插入 */
export function  planWorkorderInfoInsertList(params) {
	return myrequest({
		url: '/em-ep/PlanWorkorderInfoController/insertList',
		method: 'post',
		data: params
	})
}

/** 计划工单插入:单条插入 */
export function  planWorkorderInfoInsert(params) {
	return myrequest({
		url: '/em-ep/PlanWorkorderInfoController/insert',
		method: 'post',
		data: params
	})
}

/** 更新计划工单数据:批量更新 */
export function  planWorkorderInfoUpdateList(params) {
	return myrequest({
		url: '/em-ep/PlanWorkorderInfoController/updateList',
		method: 'post',
		data: params
	})
}

/** 更新计划工单数据:单条更新 */
export function  planWorkorderInfoUpdate(params) {
	return myrequest({
		url: '/em-ep/PlanWorkorderInfoController/update',
		method: 'post',
		data: params
	})
}

/** 删除计划工单:单条删除 */
export function  planWorkorderInfoDelete(params) {
	return myrequest({
		url: '/em-ep/PlanWorkorderInfoController/delete',
		method: 'post',
		data: params
	})
}