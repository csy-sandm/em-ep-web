import myrequest from '@/utils/axios'

/** 查询:分页查询数据 */
export function alarmAnalysisQueryListByPage(params) {
	return myrequest({
		url: '/em-ep/AlarmAnalysisController/queryListByPage',
		method: 'post',
		data: params
	})
}

/** 查询:无分页 */
export function  alarmAnalysisQueryList(params) {
	return myrequest({
		url: '/em-ep/AlarmAnalysisController/queryList',
		method: 'post',
		data: params
	})
}

/** 插入:批量插入 */
export function  alarmAnalysisInsertList(params) {
	return myrequest({
		url: '/em-ep/AlarmAnalysisController/insertList',
		method: 'post',
		data: params
	})
}

/** 插入:单条插入 */
export function  alarmAnalysisInsert(params) {
	return myrequest({
		url: '/em-ep/AlarmAnalysisController/insert',
		method: 'post',
		data: params
	})
}

/** 更新数据:批量更新 */
export function  alarmAnalysisUpdateList(params) {
	return myrequest({
		url: '/em-ep/AlarmAnalysisController/updateList',
		method: 'post',
		data: params
	})
}

/** 更新数据:单条更新 */
export function  alarmAnalysisUpdate(params) {
	return myrequest({
		url: '/em-ep/AlarmAnalysisController/update',
		method: 'post',
		data: params
	})
}

/** 删除:单条删除 */
export function  alarmAnalysisDelete(params) {
	return myrequest({
		url: '/em-ep/AlarmAnalysisController/delete',
		method: 'post',
		data: params
	})
}