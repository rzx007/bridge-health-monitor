import qs from 'qs'
import { http } from '@/utils/http'

// 获取验证码
export const getVerify = (): Promise<IRes<IGiftInfo>> => {
  return http.request<IRes<IGiftInfo>>('get', '/orderlyElectricityConsumption/electricAnalysis/getOverviewRation', { occurDate: '2021-10-22' })
}

// 接口返回类型定义 例子
export const getGiftlist = (params: any): Promise<IRes<IGiftInfo>> => {
  return http.get('/apis/gift/list', params)
}

export const getAsyncRoutes = (data?: object) => {
  return http.request<{ list: Array<IrouteItem>; code: number }>('get', '/mock/api/getAsyncRoutes', data)
}

export const loginByyUsername = (params: { account: string; pwd: string }): Promise<any> => {
  return http.post('http://183.66.148.62:5001/Home/Login', params)
}
// 获取用户列表
export const getUserList = (): Promise<any> => {
  const param = { account: sessionStorage.getItem('userName'), token: sessionStorage.getItem('token') }
  return http.get('http://183.66.148.62:5001/Home/GetUsers', param, { parallel: true })
}
