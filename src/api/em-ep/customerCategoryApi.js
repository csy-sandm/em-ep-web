import myrequest from '@/utils/axios'

/** 客户类别维表查询:分页查询数据 */
export function customerCategoryQueryListByPage(params) {
	return myrequest({
		url: '/em-ep/CustomerCategoryController/queryListByPage',
		method: 'post',
		data: params
	})
}

/** 客户类别维表查询:无分页 */
export function  customerCategoryQueryList(params) {
	return myrequest({
		url: '/em-ep/CustomerCategoryController/queryList',
		method: 'post',
		data: params
	})
}

/** 客户类别维表插入:批量插入 */
export function  customerCategoryInsertList(params) {
	return myrequest({
		url: '/em-ep/CustomerCategoryController/insertList',
		method: 'post',
		data: params
	})
}

/** 客户类别维表插入:单条插入 */
export function  customerCategoryInsert(params) {
	return myrequest({
		url: '/em-ep/CustomerCategoryController/insert',
		method: 'post',
		data: params
	})
}

/** 更新客户类别维表数据:批量更新 */
export function  customerCategoryUpdateList(params) {
	return myrequest({
		url: '/em-ep/CustomerCategoryController/updateList',
		method: 'post',
		data: params
	})
}

/** 更新客户类别维表数据:单条更新 */
export function  customerCategoryUpdate(params) {
	return myrequest({
		url: '/em-ep/CustomerCategoryController/update',
		method: 'post',
		data: params
	})
}

/** 删除客户类别维表:单条删除 */
export function  customerCategoryDelete(params) {
	return myrequest({
		url: '/em-ep/CustomerCategoryController/delete',
		method: 'post',
		data: params
	})
}