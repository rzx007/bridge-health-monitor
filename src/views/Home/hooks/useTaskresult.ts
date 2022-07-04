/*
 * @Author: 阮志雄
 * @Date: 2022-07-03 12:59:25
 * @LastEditTime: 2022-07-04 22:03:12
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \bridge-health-monitor\src\views\Home\hooks\useTaskresult.ts
 */
import datas from '../constant/components_options.json'
type taskType = {
  componentId: number
  componentName: string
  id: number
  taskId: number
  taskResult?: string
}
type resultType = { id: number; taskId: number; componentName: string; evaluateName?: string; structureId: number; children?: Array<any> }
export const useTaskresult = (taskData: Array<taskType>): any => {
  const resultList: resultType[] = []
  taskData.forEach((item: taskType) => {
    const checkArr = item.taskResult.split(',')
    const component = datas.find((data: any) => data.componentId === item.componentId)
    const lastItemList = []
    checkArr.forEach((child: any, index: number) => {
      const { evaluateName } = component.children[index]
      const result = component.children[index].children[Number(child) - 1]
      lastItemList.push({ evaluateName, ...result })
    })
    resultList.push({
      id: item.id,
      structureId: component.structureId,
      componentName: component.componentName,
      taskId: item.taskId,
      children: lastItemList
    })
  })
  return { resultList }
}
type Tresult = taskType & resultType
export const useTaskFloatresult = (taskData: Array<taskType>): any => {
  const resultList: Tresult[] = []
  taskData.forEach((item: taskType) => {
    const checkArr = item.taskResult.split(',')
    const component = datas.find((data: any) => data.componentId === item.componentId)
    const lastItemList = []
    checkArr.forEach((child: any, index: number) => {
      const { evaluateName } = component.children[index]
      const result = component.children[index].children[Number(child) - 1]
      lastItemList.push({ evaluateName, ...result })
      resultList.push({
        id: item.id,
        structureId: component.structureId,
        componentName: component.componentName,
        taskId: item.taskId,
        evaluateName,
        ...result,
        componentId: component.componentId
      })
    })
  })
  return { resultList }
}
