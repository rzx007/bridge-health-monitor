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
  const param = { account: sessionStorage.getItem('uname'), token: sessionStorage.getItem('key') }
  return http.get('http://183.66.148.62:5001/Home/GetUsers', param, { parallel: true })
}

// 查看任务结果
export const getTaskResult = (params: { taskId: string }): Promise<any> => {
  return http.post('/bridge/taskInfo/taskResult', params, { parallel: true })
}
// 查询任务检查结果问题详情
export const getTaskResultDetail = (params: { taskId: string }): Promise<any> => {
  return http.post('/bridge/taskInfo/taskProblem', params, { parallel: true })
}
// 最近一次任务检查结果
export const getLastTaskResult = (): Promise<any> => {
  return http.post('/bridge/taskInfo/latelyTask')
}
