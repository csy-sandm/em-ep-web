import myrequest from '@/utils/axios'

/** 设备仪器信息表查询:分页查询数据 */
export function deviceInfoQueryListByPage(params) {
	return myrequest({
		url: '/em-ep/DeviceInfoController/queryListByPage',
		method: 'post',
		data: params
	})
}

/** 设备仪器信息表查询:无分页 */
export function  deviceInfoQueryList(params) {
	return myrequest({
		url: '/em-ep/DeviceInfoController/queryList',
		method: 'post',
		data: params
	})
}

/** 设备仪器信息表插入:批量插入 */
export function  deviceInfoInsertList(params) {
	return myrequest({
		url: '/em-ep/DeviceInfoController/insertList',
		method: 'post',
		data: params
	})
}

/** 设备仪器信息表插入:单条插入 */
export function  deviceInfoInsert(params) {
	return myrequest({
		url: '/em-ep/DeviceInfoController/insert',
		method: 'post',
		data: params
	})
}

/** 更新设备仪器信息表数据:批量更新 */
export function  deviceInfoUpdateList(params) {
	return myrequest({
		url: '/em-ep/DeviceInfoController/updateList',
		method: 'post',
		data: params
	})
}

/** 更新设备仪器信息表数据:单条更新 */
export function  deviceInfoUpdate(params) {
	return myrequest({
		url: '/em-ep/DeviceInfoController/update',
		method: 'post',
		data: params
	})
}

/** 删除设备仪器信息表:单条删除 */
export function  deviceInfoDelete(params) {
	return myrequest({
		url: '/em-ep/DeviceInfoController/delete',
		method: 'post',
		data: params
	})
}