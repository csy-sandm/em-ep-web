import myrequest from '@/utils/axios'

/** 封装的主界面的接口 */
export function initMenu() {
    return myrequest({
      url: '/MenuInfoController/queryListByUser',
      method: 'post',
      data: {}
    })
}

/** 获取天气接口 */
export async function  getWeatherShow(city) {
  return await myrequest({
    url: 'http://wthrcdn.etouch.cn/weather_mini?city='+city,
    method: 'get',
    dataType:'JSON',
    data: {}
  })
}


// 导出的方法  tHeader => 设置Excel的表格第一行的标题  filterVal => 对象的属性key值 被导出listData => 导出数据  => 导出(文件)名称
export function outExportExcel(tHeader = [], filterVal = [], listData = [], exportName = new Date().getTime()) {
	require.ensure([], () => {
		// 注意这个Export2Excel路径
		const { export_json_to_excel } = require('@/utils/Export2Excel');
		const data = formatJson(filterVal, listData);
		export_json_to_excel(tHeader, data, exportName);
	});
  }
function formatJson(filterVal, jsonData) {
	return jsonData.map(v => filterVal.map(j => v[j]))
}