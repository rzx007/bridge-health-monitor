import axios from 'axios'
import { getUrlParamsToObj } from '@/utils/urlUtils'
import { isEmptyObject } from '@/utils/is'
export const getBaseToken = () => {
  if (!import.meta.env.PROD) {
    return axios
      .get<{ StatusCode: number; UserName: string; Token: string }>('http://183.66.148.62:5001/Home/Login?account=巡检测试&pwd=xjcs2022')
      .then((res) => {
        if (res.data.StatusCode === 1) {
          sessionStorage.setItem('token', res.data.Token)
          sessionStorage.setItem('userName', res.data.UserName)
          return true
        }
        return false
      })
  }
  const params = getUrlParamsToObj()
  if (!isEmptyObject(params)) {
    sessionStorage.setItem('token', params.token)
    sessionStorage.setItem('userName', params.UserName)
    return Promise.resolve(true)
  }
  return Promise.resolve(false)
}
