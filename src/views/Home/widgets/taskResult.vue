<template>
  <CurdView :table-options="tableOptions" :tree-options="treeOptions" :show-search-dynamic="false" @node-click="treeNodeClick">
    <template #panel>
      <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane :label="'上部结构' + getCount(0)" name="0"></el-tab-pane>
        <el-tab-pane :label="'下部结构' + getCount(1)" name="1"></el-tab-pane>
        <el-tab-pane :label="'桥面系' + getCount(2)" name="2"></el-tab-pane>
      </el-tabs>
      <p class="midd">
        巡检总分: <el-tag :type="taskItem?.score > 60 ? 'success' : 'danger'">{{ taskItem?.score }}</el-tag>
      </p>
    </template>
    <template #oprated="{ row }">
      <el-button type="text" @click="getTaskResultDetailMethod(row.taskId)">查看问题详情</el-button>
    </template>
  </CurdView>
  <Overlay v-model="close2" title="问题详情" oheight="60vh">
    <taskDetail :task-list="taskArr"></taskDetail>
  </Overlay>
</template>
<script setup lang="ts">
import { getUserList, getTaskResult, getTaskResultDetail, getLastTaskResult } from '@/api'
import CurdView from '@/components/CurdViews/index.vue'
import { ItableProps, ItreeProps } from '@/components/CurdViews/type'
import { ref, reactive } from 'vue'
import taskDetail from '@/views/Home/widgets/taskDetail.vue'
import { useTaskFloatresult } from '../hooks/useTaskresult'
import type { TabsPaneContext } from 'element-plus'
import subPoint from '../constant/subPoints.json'

const tableData = ref([])
const activeName = ref('0')

// 获取个数
const getCount = (index: number): string => {
  const count = tableData.value[index]?.length
  return count ? `(${count})` : ''
}
const handleClick = (tab: TabsPaneContext, event: Event) => {
  tableOptions.initData = tableData.value[Number(tab.index)]
}
const tableOptions = reactive<ItableProps>({
  showPage: false,
  showPanelTool: true,
  showSettingTool: false,
  initData: [],
  rowKey: 'evaluateName',
  defaultPanel: [],
  columns: [
    { type: 'selection', width: 70, align: 'center' },
    { type: 'index', label: '序号', align: 'center', width: 80 },
    { prop: 'componentName', label: '构件名称', align: 'center', width: 180 },
    { label: '检查项', prop: 'evaluateName', align: 'center' },
    { label: '扣分项', prop: 'describe', align: 'center' },
    { label: '扣分值', prop: 'subScore', align: 'center', width: 180 },
    { label: '实际完成日期', prop: 'overTime', align: 'center' },
    { label: '操作', slot: 'oprated', width: 150, align: 'center', fixed: 'right' }
  ]
})
const treeOptions: ItreeProps = {
  dataUrl: '/bridge/taskInfo/taskList',
  resDataName: 'entities',
  param: { state: 1 },
  httpMethod: 'post',
  search: true,
  treeProps: { children: 'children', label: 'title', disable: 'false' }
}
const taskArr = ref<Array<any>>([])
const close2 = ref<boolean>(false)
const getTaskResultDetailMethod = (taskId: string) => {
  getTaskResultDetail({ taskId }).then((datas) => {
    taskArr.value = datas.data
    close2.value = true
  })
}
const getTaskResultMethod = (taskId: string, data: any) => {
  getTaskResult({ taskId }).then((datas) => {
    const { resultList } = useTaskFloatresult(datas.data)
    const dataList = resultList
      .map((item: any) => {
        for (let index = 0; index < subPoint.length; index++) {
          const element = subPoint[index]
          if (item.scale === element.scale && item.maxScale === element.maxLevel) {
            return {
              ...item,
              subScore: element.subPoint,
              overTime: data.overTime,
              score: data.score
            }
          }
        }
      })
      .filter((item: any) => item.subScore !== 0)
    const list = [[], [], []]
    dataList.forEach((element) => {
      if (element.structureId === 1) {
        list[0].push(element)
      } else if (element.structureId === 2) {
        list[1].push(element)
      } else {
        list[2].push(element)
      }
    })
    tableData.value = list
    tableOptions.initData = list[Number(activeName.value)]
  })
}
const taskItem = ref<any>()
const treeNodeClick = ({ data, node }) => {
  taskItem.value = data
  getTaskResultMethod(data.id, data)
}

const score = ref<number>(0)
const lastTime = ref<string>('')
getLastTaskResult().then((res) => {
  console.log(res)
  score.value = res.data.score
  lastTime.value = res.data.overTime
})
</script>
<style lang="scss">
.bridge_main {
  width: 100%;
}
</style>
