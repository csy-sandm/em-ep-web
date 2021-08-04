import myrequest from '@/utils/axios'

/** 故障工单查询:分页查询数据 */
export function alarmWorkorderInfoQueryListByPage(params) {
	return myrequest({
		url: '/em-ep/AlarmWorkorderInfoController/queryListByPage',
		method: 'post',
		data: params
	})
}

/** 故障工单查询:无分页 */
export function  alarmWorkorderInfoQueryList(params) {
	return myrequest({
		url: '/em-ep/AlarmWorkorderInfoController/queryList',
		method: 'post',
		data: params
	})
}

/** 故障工单插入:批量插入 */
export function  alarmWorkorderInfoInsertList(params) {
	return myrequest({
		url: '/em-ep/AlarmWorkorderInfoController/insertList',
		method: 'post',
		data: params
	})
}

/** 故障工单插入:单条插入 */
export function  alarmWorkorderInfoInsert(params) {
	return myrequest({
		url: '/em-ep/AlarmWorkorderInfoController/insert',
		method: 'post',
		data: params
	})
}

/** 更新故障工单数据:批量更新 */
export function  alarmWorkorderInfoUpdateList(params) {
	return myrequest({
		url: '/em-ep/AlarmWorkorderInfoController/updateList',
		method: 'post',
		data: params
	})
}

/** 更新故障工单数据:单条更新 */
export function  alarmWorkorderInfoUpdate(params) {
	return myrequest({
		url: '/em-ep/AlarmWorkorderInfoController/update',
		method: 'post',
		data: params
	})
}

/** 删除故障工单:单条删除 */
export function  alarmWorkorderInfoDelete(params) {
	return myrequest({
		url: '/em-ep/AlarmWorkorderInfoController/delete',
		method: 'post',
		data: params
	})
}