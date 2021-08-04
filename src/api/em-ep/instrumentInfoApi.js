import myrequest from '@/utils/axios'

/** 仪器信息表查询:分页查询数据 */
export function instrumentInfoQueryListByPage(params) {
	return myrequest({
		url: '/InstrumentInfoController/queryListByPage',
		method: 'post',
		data: params
	})
}

/** 仪器信息表查询:无分页 */
export function  instrumentInfoQueryList(params) {
	return myrequest({
		url: '/InstrumentInfoController/queryList',
		method: 'post',
		data: params
	})
}

/** 仪器信息表插入:批量插入 */
export function  instrumentInfoInsertList(params) {
	return myrequest({
		url: '/InstrumentInfoController/insertList',
		method: 'post',
		data: params
	})
}

/** 仪器信息表插入:单条插入 */
export function  instrumentInfoInsert(params) {
	return myrequest({
		url: '/InstrumentInfoController/insert',
		method: 'post',
		data: params
	})
}

/** 更新仪器信息表数据:批量更新 */
export function  instrumentInfoUpdateList(params) {
	return myrequest({
		url: '/InstrumentInfoController/updateList',
		method: 'post',
		data: params
	})
}

/** 更新仪器信息表数据:单条更新 */
export function  instrumentInfoUpdate(params) {
	return myrequest({
		url: '/InstrumentInfoController/update',
		method: 'post',
		data: params
	})
}

/** 删除仪器信息表:单条删除 */
export function  instrumentInfoDelete(params) {
	return myrequest({
		url: '/InstrumentInfoController/delete',
		method: 'post',
		data: params
	})
}