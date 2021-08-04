import myrequest from '@/utils/axios'

/** 监测站点信息查询:分页查询数据 */
export function siteInfoQueryListByPage(params) {
	return myrequest({
		url: '/em-ep/SiteInfoController/queryListByPage',
		method: 'post',
		data: params
	})
}

/** 监测站点信息查询:无分页 */
export function  siteInfoQueryList(params) {
	return myrequest({
		url: '/em-ep/SiteInfoController/queryList',
		method: 'post',
		data: params
	})
}

/** 监测站点信息插入:批量插入 */
export function  siteInfoInsertList(params) {
	return myrequest({
		url: '/em-ep/SiteInfoController/insertList',
		method: 'post',
		data: params
	})
}

/** 监测站点信息插入:单条插入 */
export function  siteInfoInsert(params) {
	return myrequest({
		url: '/em-ep/SiteInfoController/insert',
		method: 'post',
		data: params
	})
}

/** 更新监测站点信息数据:批量更新 */
export function  siteInfoUpdateList(params) {
	return myrequest({
		url: '/em-ep/SiteInfoController/updateList',
		method: 'post',
		data: params
	})
}

/** 更新监测站点信息数据:单条更新 */
export function  siteInfoUpdate(params) {
	return myrequest({
		url: '/em-ep/SiteInfoController/update',
		method: 'post',
		data: params
	})
}

/** 删除监测站点信息:单条删除 */
export function  siteInfoDelete(params) {
	return myrequest({
		url: '/em-ep/SiteInfoController/delete',
		method: 'post',
		data: params
	})
}