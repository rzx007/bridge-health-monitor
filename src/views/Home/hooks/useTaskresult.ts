import datas from '../constant/components_options.json'
type taskType = {
  componentId: number
  componentName: string
  id: number
  taskId: number
  taskResult: string
}
type resultType = { id: number; taskId: number; componentName: string; children: Array<any> }
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
      componentName: component.componentName,
      taskId: item.taskId,
      children: lastItemList
    })
  })
  return { resultList }
}
