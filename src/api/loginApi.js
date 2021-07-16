import myrequest from '@/utils/axios'

/** 封装的登录接口 */
export function loginIn(params) {
    return myrequest({
      url: '/LoginController/loginIn',
      method: 'post',
      data: params
    })
}