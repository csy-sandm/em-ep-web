import myrequest from '@/utils/axios'

/** 客户信息表查询:分页查询数据 */
export function customerInfoQueryListByPage(params) {
	return myrequest({
		url: '/em-ep/CustomerInfoController/queryListByPage',
		method: 'post',
		data: params
	})
}

/** 客户信息表查询:无分页 */
export function  customerInfoQueryList(params) {
	return myrequest({
		url: '/em-ep/CustomerInfoController/queryList',
		method: 'post',
		data: params
	})
}

/** 客户信息表插入:批量插入 */
export function  customerInfoInsertList(params) {
	return myrequest({
		url: '/em-ep/CustomerInfoController/insertList',
		method: 'post',
		data: params
	})
}

/** 客户信息表插入:单条插入 */
export function  customerInfoInsert(params) {
	return myrequest({
		url: '/em-ep/CustomerInfoController/insert',
		method: 'post',
		data: params
	})
}

/** 更新客户信息表数据:批量更新 */
export function  customerInfoUpdateList(params) {
	return myrequest({
		url: '/em-ep/CustomerInfoController/updateList',
		method: 'post',
		data: params
	})
}

/** 更新客户信息表数据:单条更新 */
export function  customerInfoUpdate(params) {
	return myrequest({
		url: '/em-ep/CustomerInfoController/update',
		method: 'post',
		data: params
	})
}

/** 删除客户信息表:单条删除 */
export function  customerInfoDelete(params) {
	return myrequest({
		url: '/em-ep/CustomerInfoController/delete',
		method: 'post',
		data: params
	})
}