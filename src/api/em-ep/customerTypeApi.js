import myrequest from '@/utils/axios'

/** 客户类型维表查询:分页查询数据 */
export function customerTypeQueryListByPage(params) {
	return myrequest({
		url: '/em-ep/CustomerTypeController/queryListByPage',
		method: 'post',
		data: params
	})
}

/** 客户类型维表查询:无分页 */
export function  customerTypeQueryList(params) {
	return myrequest({
		url: '/em-ep/CustomerTypeController/queryList',
		method: 'post',
		data: params
	})
}

/** 客户类型维表插入:批量插入 */
export function  customerTypeInsertList(params) {
	return myrequest({
		url: '/em-ep/CustomerTypeController/insertList',
		method: 'post',
		data: params
	})
}

/** 客户类型维表插入:单条插入 */
export function  customerTypeInsert(params) {
	return myrequest({
		url: '/em-ep/CustomerTypeController/insert',
		method: 'post',
		data: params
	})
}

/** 更新客户类型维表数据:批量更新 */
export function  customerTypeUpdateList(params) {
	return myrequest({
		url: '/em-ep/CustomerTypeController/updateList',
		method: 'post',
		data: params
	})
}

/** 更新客户类型维表数据:单条更新 */
export function  customerTypeUpdate(params) {
	return myrequest({
		url: '/em-ep/CustomerTypeController/update',
		method: 'post',
		data: params
	})
}

/** 删除客户类型维表:单条删除 */
export function  customerTypeDelete(params) {
	return myrequest({
		url: '/em-ep/CustomerTypeController/delete',
		method: 'post',
		data: params
	})
}