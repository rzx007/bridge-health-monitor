import { Ref, ref } from 'vue'
import { Icolumns } from '../../type'
export function useTableSlot(mColumns: Ref<Icolumns[]>) {
  const slotArr = ref<Array<any>>([])
  const Columns = mColumns.value

  function Maps(Columns: any[]) {
    Columns.forEach((item: { childrens?: any }) => {
      const keys = Object.keys(item)
      if (keys.includes('slot')) {
        slotArr.value.push(item)
      }
      if (item.childrens && item.childrens.length > 0) {
        Maps(item.childrens)
      }
    })
  }
  Maps(Columns)
  return { slotArr }
}
