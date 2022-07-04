export const flatToTreeData = (data: Array<any>) => {
  const result: Array<any> = []
  const hash: any = {}
  data.forEach((item) => {
    if (!hash[item.componentId]) {
      hash[item.componentId] = []
      result.push({
        componentId: item.componentId,
        componentName: item.componentName,
        structureId: item.structureId,
        children: []
      })
    }
  })
  result.forEach((ele, index) => {
    const evaluateIdList = []
    data[index].evaluateBeanList.forEach((item) => {
      const lastItem = { describe: item.describe, explain: item.explain, scale: item.scale, maxScale: item.maxScale }
      if (evaluateIdList.indexOf(item.evaluateId) > -1) {
        const index = evaluateIdList.indexOf(item.evaluateId)

        ele.children[index].children?.push(lastItem)
      } else {
        evaluateIdList.push(item.evaluateId)
        ele.children.push({
          evaluateId: item.evaluateId,
          evaluateName: item.evaluateName,
          children: [lastItem]
        })
      }
    })
  })
  console.log(result)

  return result
}
