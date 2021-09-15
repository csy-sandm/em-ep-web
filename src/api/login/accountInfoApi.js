import myrequest from '@/utils/axios'

/** 用户信息表查询:分页查询数据 */
export function accountInfoQueryListByPage(params) {
	return myrequest({
		url: '/v1/AccountInfoController/queryListByPage',
		method: 'post',
		data: params
	})
}

/** 用户信息表查询:无分页 */
export function  accountInfoQueryList(params) {
	return myrequest({
		url: '/v1/AccountInfoController/queryList',
		method: 'post',
		data: params
	})
}

/** 用户信息表插入:批量插入 */
export function  accountInfoInsertList(params) {
	return myrequest({
		url: '/v1/AccountInfoController/insertList',
		method: 'post',
		data: params
	})
}

/** 用户信息表插入:单条插入 */
export function  accountInfoInsert(params) {
	return myrequest({
		url: '/v1/AccountInfoController/insert',
		method: 'post',
		data: params
	})
}

/** 更新用户信息表数据:批量更新 */
export function  accountInfoUpdateList(params) {
	return myrequest({
		url: '/v1/AccountInfoController/updateList',
		method: 'post',
		data: params
	})
}

/** 更新用户信息表数据:单条更新 */
export function  accountInfoUpdate(params) {
	return myrequest({
		url: '/v1/AccountInfoController/update',
		method: 'post',
		data: params
	})
}

/** 删除用户信息表:单条删除 */
export function  accountInfoDelete(params) {
	return myrequest({
		url: '/v1/AccountInfoController/delete',
		method: 'post',
		data: params
	})
}