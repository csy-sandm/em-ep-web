import myrequest from '@/utils/axios'

/** 站点监测告警方案信息查询:分页查询数据 */
export function alarmCaseInfoQueryListByPage(params) {
	return myrequest({
		url: '/em-ep/AlarmCaseInfoController/queryListByPage',
		method: 'post',
		data: params
	})
}

/** 站点监测告警方案信息查询:无分页 */
export function  alarmCaseInfoQueryList(params) {
	return myrequest({
		url: '/em-ep/AlarmCaseInfoController/queryList',
		method: 'post',
		data: params
	})
}

/** 站点监测告警方案信息插入:批量插入 */
export function  alarmCaseInfoInsertList(params) {
	return myrequest({
		url: '/em-ep/AlarmCaseInfoController/insertList',
		method: 'post',
		data: params
	})
}

/** 站点监测告警方案信息插入:单条插入 */
export function  alarmCaseInfoInsert(params) {
	return myrequest({
		url: '/em-ep/AlarmCaseInfoController/insert',
		method: 'post',
		data: params
	})
}

/** 更新站点监测告警方案信息数据:批量更新 */
export function  alarmCaseInfoUpdateList(params) {
	return myrequest({
		url: '/em-ep/AlarmCaseInfoController/updateList',
		method: 'post',
		data: params
	})
}

/** 更新站点监测告警方案信息数据:单条更新 */
export function  alarmCaseInfoUpdate(params) {
	return myrequest({
		url: '/em-ep/AlarmCaseInfoController/update',
		method: 'post',
		data: params
	})
}

/** 删除站点监测告警方案信息:单条删除 */
export function  alarmCaseInfoDelete(params) {
	return myrequest({
		url: '/em-ep/AlarmCaseInfoController/delete',
		method: 'post',
		data: params
	})
}