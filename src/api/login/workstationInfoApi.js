import myrequest from '@/utils/axios'

/** 工作站信息查询:分页查询数据 */
export function workstationInfoQueryListByPage(params) {
	return myrequest({
		url: '/v1/WorkstationInfoController/queryListByPage',
		method: 'post',
		data: params
	})
}

/** 工作站信息查询:无分页 */
export function  workstationInfoQueryList(params) {
	return myrequest({
		url: '/v1/WorkstationInfoController/queryList',
		method: 'post',
		data: params
	})
}

/** 工作站信息插入:批量插入 */
export function  workstationInfoInsertList(params) {
	return myrequest({
		url: '/v1/WorkstationInfoController/insertList',
		method: 'post',
		data: params
	})
}

/** 工作站信息插入:单条插入 */
export function  workstationInfoInsert(params) {
	return myrequest({
		url: '/v1/WorkstationInfoController/insert',
		method: 'post',
		data: params
	})
}

/** 更新工作站信息数据:批量更新 */
export function  workstationInfoUpdateList(params) {
	return myrequest({
		url: '/v1/WorkstationInfoController/updateList',
		method: 'post',
		data: params
	})
}

/** 更新工作站信息数据:单条更新 */
export function  workstationInfoUpdate(params) {
	return myrequest({
		url: '/v1/WorkstationInfoController/update',
		method: 'post',
		data: params
	})
}

/** 删除工作站信息:单条删除 */
export function  workstationInfoDelete(params) {
	return myrequest({
		url: '/v1/WorkstationInfoController/delete',
		method: 'post',
		data: params
	})
}