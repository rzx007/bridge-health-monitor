// 获取url上的参数
export const getUrlQuery = (url: string): object => {
  const query = url.split('?')[1]
  const queryArr = query.split('&')
  const queryObj = {}
  queryArr.forEach((v) => {
    const arr = v.split('=')
    queryObj[arr[0]] = arr[1]
  })
  return queryObj
}
export default getUrlQuery
