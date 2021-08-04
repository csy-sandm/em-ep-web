import myrequest from '@/utils/axios'

/** 站点监测l历史数据查询:分页查询数据 */
export function siteMonitorHisQueryListByPage(params) {
	return myrequest({
		url: '/em-ep/SiteMonitorHisController/queryListByPage',
		method: 'post',
		data: params
	})
}

/** 站点监测l历史数据查询:无分页 */
export function  siteMonitorHisQueryList(params) {
	return myrequest({
		url: '/em-ep/SiteMonitorHisController/queryList',
		method: 'post',
		data: params
	})
}

/** 站点监测l历史数据插入:批量插入 */
export function  siteMonitorHisInsertList(params) {
	return myrequest({
		url: '/em-ep/SiteMonitorHisController/insertList',
		method: 'post',
		data: params
	})
}

/** 站点监测l历史数据插入:单条插入 */
export function  siteMonitorHisInsert(params) {
	return myrequest({
		url: '/em-ep/SiteMonitorHisController/insert',
		method: 'post',
		data: params
	})
}

/** 更新站点监测l历史数据数据:批量更新 */
export function  siteMonitorHisUpdateList(params) {
	return myrequest({
		url: '/em-ep/SiteMonitorHisController/updateList',
		method: 'post',
		data: params
	})
}

/** 更新站点监测l历史数据数据:单条更新 */
export function  siteMonitorHisUpdate(params) {
	return myrequest({
		url: '/em-ep/SiteMonitorHisController/update',
		method: 'post',
		data: params
	})
}

/** 删除站点监测l历史数据:单条删除 */
export function  siteMonitorHisDelete(params) {
	return myrequest({
		url: '/em-ep/SiteMonitorHisController/delete',
		method: 'post',
		data: params
	})
}