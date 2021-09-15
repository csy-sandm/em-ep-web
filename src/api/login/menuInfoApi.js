import myrequest from '@/utils/axios'

/** 系统菜单表查询:分页查询数据 */
export function menuInfoQueryListByPage(params) {
	return myrequest({
		url: '/v1/MenuInfoController/queryListByPage',
		method: 'post',
		data: params
	})
}

/** 系统菜单表查询:无分页 */
export function  menuInfoQueryList(params) {
	return myrequest({
		url: '/v1/MenuInfoController/queryList',
		method: 'post',
		data: params
	})
}

/** 系统菜单表插入:批量插入 */
export function  menuInfoInsertList(params) {
	return myrequest({
		url: '/v1/MenuInfoController/insertList',
		method: 'post',
		data: params
	})
}

/** 系统菜单表插入:单条插入 */
export function  menuInfoInsert(params) {
	return myrequest({
		url: '/v1/MenuInfoController/insert',
		method: 'post',
		data: params
	})
}

/** 更新系统菜单表数据:批量更新 */
export function  menuInfoUpdateList(params) {
	return myrequest({
		url: '/v1/MenuInfoController/updateList',
		method: 'post',
		data: params
	})
}

/** 更新系统菜单表数据:单条更新 */
export function  menuInfoUpdate(params) {
	return myrequest({
		url: '/v1/MenuInfoController/update',
		method: 'post',
		data: params
	})
}

/** 删除系统菜单表:单条删除 */
export function  menuInfoDelete(params) {
	return myrequest({
		url: '/v1/MenuInfoController/delete',
		method: 'post',
		data: params
	})
}