import myrequest from '@/utils/axios'

/** 站点类型维表查询:分页查询数据 */
export function siteTypeQueryListByPage(params) {
	return myrequest({
		url: '/em-ep/SiteTypeController/queryListByPage',
		method: 'post',
		data: params
	})
}

/** 站点类型维表查询:无分页 */
export function  siteTypeQueryList(params) {
	return myrequest({
		url: '/em-ep/SiteTypeController/queryList',
		method: 'post',
		data: params
	})
}

/** 站点类型维表插入:批量插入 */
export function  siteTypeInsertList(params) {
	return myrequest({
		url: '/em-ep/SiteTypeController/insertList',
		method: 'post',
		data: params
	})
}

/** 站点类型维表插入:单条插入 */
export function  siteTypeInsert(params) {
	return myrequest({
		url: '/em-ep/SiteTypeController/insert',
		method: 'post',
		data: params
	})
}

/** 更新站点类型维表数据:批量更新 */
export function  siteTypeUpdateList(params) {
	return myrequest({
		url: '/em-ep/SiteTypeController/updateList',
		method: 'post',
		data: params
	})
}

/** 更新站点类型维表数据:单条更新 */
export function  siteTypeUpdate(params) {
	return myrequest({
		url: '/em-ep/SiteTypeController/update',
		method: 'post',
		data: params
	})
}

/** 删除站点类型维表:单条删除 */
export function  siteTypeDelete(params) {
	return myrequest({
		url: '/em-ep/SiteTypeController/delete',
		method: 'post',
		data: params
	})
}