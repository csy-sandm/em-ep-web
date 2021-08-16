/*
 * @Description:
 * @Author: John Holl
 * @Github: https://github.com/hzylyh
 * @Date: 2020-11-26 19:55:32
 * @LastEditors: yanxiao
 */
import axios from 'axios'
import router from '../router'

axios.defaults.headers['Content-Type'] = 'application/json'

// create an axios instance
const service = axios.create({
  baseURL: '/emApi', // url = base url + request url
  // baseURL: 'http://39.105.109.252:9000',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

// 请求前要处理的事
service.interceptors.request.use(

  config => {
    // 添加headers
    config.headers.userToken = localStorage.getItem('userToken')
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  // 所以的响应都会走的拦截
  response => {
    const res = response.data
    if (res.resultCode === '3001' || res.resultCode === '3004') {
      // 3001是未登录/登录失效，所以要跳回登录页面
      // router.push('/login')
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
