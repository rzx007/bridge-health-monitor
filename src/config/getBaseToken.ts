import axios from 'axios'
import { getUrlParamsToObj } from '@/utils/urlUtils'
import { isEmptyObject } from '@/utils/is'
export const getBaseToken = () => {
  if (import.meta.env.DEV) {
    return axios
      .get<{ StatusCode: number; UserName: string; Token: string; ID: number }>('http://183.66.148.62:5001/Home/Login?account=巡检测试&pwd=xjcs2022')
      .then((res) => {
        if (res.data.StatusCode === 1) {
          sessionStorage.setItem('token', res.data.Token)
          sessionStorage.setItem('userId', res.data.ID.toString())
          sessionStorage.setItem('userName', res.data.UserName)
          return true
        }
        return false
      })
  }
  const params = getUrlParamsToObj()
  if (!isEmptyObject(params)) {
    sessionStorage.setItem('token', params['key'])
    sessionStorage.setItem('userId', params['uname'])
    // sessionStorage.setItem('userName', params.UserName)
    return Promise.resolve(true)
  }
  return Promise.resolve(true)
}
