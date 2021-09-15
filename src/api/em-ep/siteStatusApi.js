import myrequest from '@/utils/axios'

/** 设备状态维表查询:分页查询数据 */
export function siteStatusQueryListByPage(params) {
	return myrequest({
		url: '/em-ep/SiteStatusController/queryListByPage',
		method: 'post',
		data: params
	})
}

/** 设备状态维表查询:无分页 */
export function  siteStatusQueryList(params) {
	return myrequest({
		url: '/em-ep/SiteStatusController/queryList',
		method: 'post',
		data: params
	})
}

/** 设备状态维表插入:批量插入 */
export function  siteStatusInsertList(params) {
	return myrequest({
		url: '/em-ep/SiteStatusController/insertList',
		method: 'post',
		data: params
	})
}

/** 设备状态维表插入:单条插入 */
export function  siteStatusInsert(params) {
	return myrequest({
		url: '/em-ep/SiteStatusController/insert',
		method: 'post',
		data: params
	})
}

/** 更新设备状态维表数据:批量更新 */
export function  siteStatusUpdateList(params) {
	return myrequest({
		url: '/em-ep/SiteStatusController/updateList',
		method: 'post',
		data: params
	})
}

/** 更新设备状态维表数据:单条更新 */
export function  siteStatusUpdate(params) {
	return myrequest({
		url: '/em-ep/SiteStatusController/update',
		method: 'post',
		data: params
	})
}

/** 删除设备状态维表:单条删除 */
export function  siteStatusDelete(params) {
	return myrequest({
		url: '/em-ep/SiteStatusController/delete',
		method: 'post',
		data: params
	})
}