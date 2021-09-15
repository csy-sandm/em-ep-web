import myrequest from '@/utils/axios'

/** 维修类型维表查询:分页查询数据 */
export function repairTypeQueryListByPage(params) {
	return myrequest({
		url: '/em-ep/RepairTypeController/queryListByPage',
		method: 'post',
		data: params
	})
}

/** 维修类型维表查询:无分页 */
export function  repairTypeQueryList(params) {
	return myrequest({
		url: '/em-ep/RepairTypeController/queryList',
		method: 'post',
		data: params
	})
}

/** 维修类型维表插入:批量插入 */
export function  repairTypeInsertList(params) {
	return myrequest({
		url: '/em-ep/RepairTypeController/insertList',
		method: 'post',
		data: params
	})
}

/** 维修类型维表插入:单条插入 */
export function  repairTypeInsert(params) {
	return myrequest({
		url: '/em-ep/RepairTypeController/insert',
		method: 'post',
		data: params
	})
}

/** 更新维修类型维表数据:批量更新 */
export function  repairTypeUpdateList(params) {
	return myrequest({
		url: '/em-ep/RepairTypeController/updateList',
		method: 'post',
		data: params
	})
}

/** 更新维修类型维表数据:单条更新 */
export function  repairTypeUpdate(params) {
	return myrequest({
		url: '/em-ep/RepairTypeController/update',
		method: 'post',
		data: params
	})
}

/** 删除维修类型维表:单条删除 */
export function  repairTypeDelete(params) {
	return myrequest({
		url: '/em-ep/RepairTypeController/delete',
		method: 'post',
		data: params
	})
}