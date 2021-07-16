import myrequest from '@/utils/axios'

/** 站点监测告警实时数据查询:分页查询数据 */
export function monitorAlarmDataQueryListByPage(params) {
	return myrequest({
		url: '/em-ep/MonitorAlarmDataController/queryListByPage',
		method: 'post',
		data: params
	})
}

/** 站点监测告警实时数据查询:无分页 */
export function  monitorAlarmDataQueryList(params) {
	return myrequest({
		url: '/em-ep/MonitorAlarmDataController/queryList',
		method: 'post',
		data: params
	})
}

/** 站点监测告警实时数据插入:批量插入 */
export function  monitorAlarmDataInsertList(params) {
	return myrequest({
		url: '/em-ep/MonitorAlarmDataController/insertList',
		method: 'post',
		data: params
	})
}

/** 站点监测告警实时数据插入:单条插入 */
export function  monitorAlarmDataInsert(params) {
	return myrequest({
		url: '/em-ep/MonitorAlarmDataController/insert',
		method: 'post',
		data: params
	})
}

/** 更新站点监测告警实时数据数据:批量更新 */
export function  monitorAlarmDataUpdateList(params) {
	return myrequest({
		url: '/em-ep/MonitorAlarmDataController/updateList',
		method: 'post',
		data: params
	})
}

/** 更新站点监测告警实时数据数据:单条更新 */
export function  monitorAlarmDataUpdate(params) {
	return myrequest({
		url: '/em-ep/MonitorAlarmDataController/update',
		method: 'post',
		data: params
	})
}

/** 删除站点监测告警实时数据:单条删除 */
export function  monitorAlarmDataDelete(params) {
	return myrequest({
		url: '/em-ep/MonitorAlarmDataController/delete',
		method: 'post',
		data: params
	})
}