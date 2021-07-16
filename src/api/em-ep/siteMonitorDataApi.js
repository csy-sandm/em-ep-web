import myrequest from '@/utils/axios'

/** 站点监测实时数据查询:分页查询数据 */
export function siteMonitorDataQueryListByPage(params) {
	return myrequest({
		url: '/em-ep/SiteMonitorDataController/queryListByPage',
		method: 'post',
		data: params
	})
}

/** 站点监测实时数据查询:无分页 */
export function  siteMonitorDataQueryList(params) {
	return myrequest({
		url: '/em-ep/SiteMonitorDataController/queryList',
		method: 'post',
		data: params
	})
}

/** 站点监测实时数据插入:批量插入 */
export function  siteMonitorDataInsertList(params) {
	return myrequest({
		url: '/em-ep/SiteMonitorDataController/insertList',
		method: 'post',
		data: params
	})
}

/** 站点监测实时数据插入:单条插入 */
export function  siteMonitorDataInsert(params) {
	return myrequest({
		url: '/em-ep/SiteMonitorDataController/insert',
		method: 'post',
		data: params
	})
}

/** 更新站点监测实时数据数据:批量更新 */
export function  siteMonitorDataUpdateList(params) {
	return myrequest({
		url: '/em-ep/SiteMonitorDataController/updateList',
		method: 'post',
		data: params
	})
}

/** 更新站点监测实时数据数据:单条更新 */
export function  siteMonitorDataUpdate(params) {
	return myrequest({
		url: '/em-ep/SiteMonitorDataController/update',
		method: 'post',
		data: params
	})
}

/** 删除站点监测实时数据:单条删除 */
export function  siteMonitorDataDelete(params) {
	return myrequest({
		url: '/em-ep/SiteMonitorDataController/delete',
		method: 'post',
		data: params
	})
}