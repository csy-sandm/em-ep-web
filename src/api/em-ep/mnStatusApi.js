import myrequest from '@/utils/axios'

/** MN编号状态维表查询:分页查询数据 */
export function mnStatusQueryListByPage(params) {
	return myrequest({
		url: '/em-ep/MnStatusController/queryListByPage',
		method: 'post',
		data: params
	})
}

/** MN编号状态维表查询:无分页 */
export function  mnStatusQueryList(params) {
	return myrequest({
		url: '/em-ep/MnStatusController/queryList',
		method: 'post',
		data: params
	})
}

/** MN编号状态维表插入:批量插入 */
export function  mnStatusInsertList(params) {
	return myrequest({
		url: '/em-ep/MnStatusController/insertList',
		method: 'post',
		data: params
	})
}

/** MN编号状态维表插入:单条插入 */
export function  mnStatusInsert(params) {
	return myrequest({
		url: '/em-ep/MnStatusController/insert',
		method: 'post',
		data: params
	})
}

/** 更新MN编号状态维表数据:批量更新 */
export function  mnStatusUpdateList(params) {
	return myrequest({
		url: '/em-ep/MnStatusController/updateList',
		method: 'post',
		data: params
	})
}

/** 更新MN编号状态维表数据:单条更新 */
export function  mnStatusUpdate(params) {
	return myrequest({
		url: '/em-ep/MnStatusController/update',
		method: 'post',
		data: params
	})
}

/** 删除MN编号状态维表:单条删除 */
export function  mnStatusDelete(params) {
	return myrequest({
		url: '/em-ep/MnStatusController/delete',
		method: 'post',
		data: params
	})
}