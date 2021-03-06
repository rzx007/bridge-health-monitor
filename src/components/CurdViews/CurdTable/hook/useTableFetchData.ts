import { reactive, Ref, ref, unref } from 'vue'
import { http } from '@/utils/http'
import { defaultTableData } from '../enums'
export function useTableFetchData(props, emit: (arg0: string, arg1: any[] | Ref<any[]>) => void, selection: Ref<any[]>) {
  const loading = ref<boolean>(false)
  const tableData = ref<any[]>()
  const pageParam = reactive<{ pageSize: number; pageNo: number }>({
    pageSize: 20,
    pageNo: 1
  })
  const total = ref<number>(0)
  const lazyLoad = ref<boolean>(props.lazy)

  const queryData = () => {
    let timeout: any = {}
    if (!props.dataUrl || loading.value) {
      return
    }
    timeout && clearTimeout(timeout)
    timeout = setTimeout(() => {
      selection.value = []
      tableData.value = []
      emit('selection-change', [])
      loading.value = true
      const params = props.showPage
        ? Object.assign({}, JSON.parse(JSON.stringify(pageParam)), props.params, {
            pageNo: pageParam.pageNo
          })
        : props.params
      http
        .post<any>(props.dataUrl, params)
        .then((res) => {
          loading.value = false
          if (res.code === 0) {
            let data = res.data
            total.value = res.data.count
            if (props.responseName) {
              if (Array.isArray(props.responseName)) {
                props.responseName.forEach((item) => {
                  // @ts-ignore
                  data = data[item]
                })
              } else {
                data = res.data[props.responseName]
              }
            }

            if (props.isPrivate) {
              data.forEach((item: { _disabled: number }) => {
                // 添加私有属性，
                item._disabled = 0
              })
            }
            console.log(data)
            const newData = props.beforeData ? props.beforeData(data) : data
            tableData.value = newData
            console.log(tableData.value)
            emit('getTableData', tableData)
          }
        })
        .catch(() => {
          loading.value = false
        })
    }, 200)
  }
  !lazyLoad.value && queryData()
  return {
    queryData,
    loading,
    tableData,
    pageParam,
    total,
    lazyLoad
  }
}
