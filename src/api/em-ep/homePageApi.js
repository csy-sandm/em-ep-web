import myrequest from '@/utils/axios'

/** 上月接口 */
export function queryWorkOrdersSGY (params) {
  return myrequest({
    url: '/em-ep/HomePageController/queryWorkOrdersSGY',
    method: 'post',
    data: params
  })
}

/** 当月接口 */
export function queryWorkOrdersBY (params) {
  return myrequest({
    url: '/em-ep/HomePageController/queryWorkOrdersBY',
    method: 'post',
    data: params
  })
}

/** 资产情况 */
export function queryZcqk (params) {
  return myrequest({
    url: '/em-ep/HomePageController/queryZcqk',
    method: 'post',
    data: params
  })
}

/** 工单动态 */
export function queryRtWorlOrder (params) {
  return myrequest({
    url: '/em-ep/HomePageController/queryRtWorlOrder',
    method: 'post',
    data: params
  })
}

/** 监控报警 */
export function queryRtAlarm (params) {
  return myrequest({
    url: '/em-ep/HomePageController/queryRtAlarm',
    method: 'post',
    data: params
  })
}

/** 地图实时展示站点 */
export function querySiteList (params) {
  return myrequest({
    url: '/em-ep/HomePageController/querySiteList',
    method: 'post',
    data: params
  })
}
