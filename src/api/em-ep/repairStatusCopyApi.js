import myrequest from '@/utils/axios'

/** 运维状态维表查询:分页查询数据 */
export function repairStatusCopyQueryListByPage(params) {
	return myrequest({
		url: '/em-ep/RepairStatusCopyController/queryListByPage',
		method: 'post',
		data: params
	})
}

/** 运维状态维表查询:无分页 */
export function  repairStatusCopyQueryList(params) {
	return myrequest({
		url: '/em-ep/RepairStatusCopyController/queryList',
		method: 'post',
		data: params
	})
}

/** 运维状态维表插入:批量插入 */
export function  repairStatusCopyInsertList(params) {
	return myrequest({
		url: '/em-ep/RepairStatusCopyController/insertList',
		method: 'post',
		data: params
	})
}

/** 运维状态维表插入:单条插入 */
export function  repairStatusCopyInsert(params) {
	return myrequest({
		url: '/em-ep/RepairStatusCopyController/insert',
		method: 'post',
		data: params
	})
}

/** 更新运维状态维表数据:批量更新 */
export function  repairStatusCopyUpdateList(params) {
	return myrequest({
		url: '/em-ep/RepairStatusCopyController/updateList',
		method: 'post',
		data: params
	})
}

/** 更新运维状态维表数据:单条更新 */
export function  repairStatusCopyUpdate(params) {
	return myrequest({
		url: '/em-ep/RepairStatusCopyController/update',
		method: 'post',
		data: params
	})
}

/** 删除运维状态维表:单条删除 */
export function  repairStatusCopyDelete(params) {
	return myrequest({
		url: '/em-ep/RepairStatusCopyController/delete',
		method: 'post',
		data: params
	})
}