import myrequest from '@/utils/axios'

/** 报警类型维表查询:分页查询数据 */
export function alarmTypeQueryListByPage(params) {
	return myrequest({
		url: '/em-ep/AlarmTypeController/queryListByPage',
		method: 'post',
		data: params
	})
}

/** 报警类型维表查询:无分页 */
export function  alarmTypeQueryList(params) {
	return myrequest({
		url: '/em-ep/AlarmTypeController/queryList',
		method: 'post',
		data: params
	})
}

/** 报警类型维表插入:批量插入 */
export function  alarmTypeInsertList(params) {
	return myrequest({
		url: '/em-ep/AlarmTypeController/insertList',
		method: 'post',
		data: params
	})
}

/** 报警类型维表插入:单条插入 */
export function  alarmTypeInsert(params) {
	return myrequest({
		url: '/em-ep/AlarmTypeController/insert',
		method: 'post',
		data: params
	})
}

/** 更新报警类型维表数据:批量更新 */
export function  alarmTypeUpdateList(params) {
	return myrequest({
		url: '/em-ep/AlarmTypeController/updateList',
		method: 'post',
		data: params
	})
}

/** 更新报警类型维表数据:单条更新 */
export function  alarmTypeUpdate(params) {
	return myrequest({
		url: '/em-ep/AlarmTypeController/update',
		method: 'post',
		data: params
	})
}

/** 删除报警类型维表:单条删除 */
export function  alarmTypeDelete(params) {
	return myrequest({
		url: '/em-ep/AlarmTypeController/delete',
		method: 'post',
		data: params
	})
}