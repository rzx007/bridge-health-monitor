<template>
  <div>
    <CurdView :table-options="tableOptions" :from-options="fromOptions" @selection-change="selectionChange" @row-add="rowAdd">
      <template #oprated="{ row }">
        <el-button v-if="row.state === 1" @click="exportRes(row)">导出</el-button>
        <el-button v-if="row.state === 1" @click="getTaskResultDetailMethod(row.id)">查看详情</el-button>
        <span v-else>-</span>
      </template>
      <template #releaseUser="{ row }">
        <span>{{ findUserById(row.releaseUser) }}</span>
      </template>
      <template #executeUser="{ row }">
        <span>{{ findUserById(row.executeUser) }}</span>
      </template>
    </CurdView>
    <Overlay v-model="close1" title="结果展示" oheight="80vh">
      <ResultList :data="resultArr" :default-props="{ title: 'componentName', label: 'evaluateName', value: 'describe' }"></ResultList>
    </Overlay>
    <Overlay v-model="close2" title="问题详情" oheight="60vh">
      <taskDetail :task-list="taskArr"></taskDetail>
    </Overlay>
  </div>
</template>

<script lang="ts" setup>
import CurdView from '@/components/CurdViews/index.vue'
import { reactive, ref } from 'vue'
import Overlay from '@/components/Overlay/index.vue'
import taskDetail from '@/views/Home/widgets/taskDetail.vue'
import { IformItem, ItableProps } from '@/components/CurdViews/type'
import { getUserList, getTaskResult, getTaskResultDetail, exportDoc } from '@/api'
import { useTaskresult } from '../hooks/useTaskresult'
import fileDownload from 'js-file-download'

const close = ref<boolean>(false)
const close1 = ref<boolean>(false)
const close2 = ref<boolean>(false)

const tableOptions = reactive<ItableProps>({
  pageSize: 20,
  showPanelTool: true,
  defaultPanel: [],
  params: { state: '1' }, // params的改变都会触发，表格的重新查询
  responseName: 'entities',
  dataUrl: '/bridge/taskInfo/taskList',
  columns: [
    // { type: 'selection', width: 70, align: 'center' },
    { type: 'index', label: '序号', align: 'center', width: 80 },
    { prop: 'title', label: '计划名称', align: 'center', width: 180 },
    { prop: 'id', label: '任务编号', align: 'center', width: 180 },
    { label: '发起人', slot: 'releaseUser', align: 'center' },
    { label: '执行人', slot: 'executeUser', align: 'center' },
    { label: '创建日期', prop: 'sendTime', align: 'center', width: 180 },
    { label: '计划完成日期', prop: 'planTime', align: 'center', width: 180 },
    { label: '实际完成日期', prop: 'overTime', align: 'center', width: 180 },
    { label: '备注', prop: 'remark', align: 'center', width: 180, showOverflowTooltip: true },
    {
      label: '状态',
      prop: 'state',
      width: 150,
      align: 'center',
      enum: [
        { id: 0, value: '已发布' },
        { id: 1, value: '已完成', type: 'danger' }
      ]
    },
    { label: '得分', prop: 'score', align: 'center' },
    { label: '操作', slot: 'oprated', width: 210, align: 'center' }
  ]
})
const fromOptions = reactive<IformItem[]>([
  // {
  //   name: 'state',
  //   label: '任务状态',
  //   span: 6,
  //   type: 'select',
  //   clearable: true,
  //   disabled: true,
  //   options: [
  //     { label: '已发布', value: 0 },
  //     { label: '已完成', value: 1 }
  //   ]
  // },
  {
    name: 'taskId',
    label: '任务编号',
    type: 'input'
  }
])

const rowAdd = () => {
  close.value = true
}
const selectionChange = (selection) => {
  console.log(selection)
}
const getRow = (row) => {
  console.log(row)
}

const beforeSubmit = (params) => {
  console.log(params)
  params.releaseUser = Number(sessionStorage.getItem('userId'))
  return params
}
// 获取用户列表
const userList = ref<Array<any>>([])
function getUserLists() {
  getUserList().then((datas) => {
    userList.value = datas.map((item) => {
      return {
        value: item['ID'],
        label: item['USERNAME']
      }
    })
  })
}
function getUserListsMthod() {
  return getUserList().then((datas) => {
    const userId = Number(sessionStorage.getItem('userId'))
    let data = []
    return (data = datas
      .map((item) => {
        return {
          value: item['ID'],
          label: item['USERNAME']
        }
      })
      .filter((item) => item.value !== userId))
  })
}
getUserLists()
const findUserById = (id: number) => {
  for (let index = 0; index < userList.value.length; index++) {
    const element = userList.value[index]
    if (element.value === id) {
      return element.label
    }
  }
}
const resultArr = ref<Array<any>>([])
const getTaskResultMethod = (taskId: string) => {
  getTaskResult({ taskId }).then((datas) => {
    const { resultList } = useTaskresult(datas.data)
    resultArr.value = resultList
    close1.value = true
  })
}
const taskArr = ref<Array<any>>([])
const getTaskResultDetailMethod = (taskId: string) => {
  getTaskResultDetail({ taskId }).then((datas) => {
    taskArr.value = datas.data
    close2.value = true
  })
}
// 导出
const exportRes = (item: any) => {
  exportDoc({ taskId: item.id }).then((datas) => {
    fileDownload(datas.data, `${item.title}-巡检报表.docx`)
    // window.open(datas.request.responseURL)
    // const blob = new Blob(['\ufeff', datas.data], {
    //   type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8'
    // })
    // const downloadElement = document.createElement('a')
    // const href = window.URL.createObjectURL(blob)
    // downloadElement.style.display = 'none'
    // downloadElement.href = href

    // document.body.appendChild(downloadElement)
    // downloadElement.click() //点击下载
    // document.body.removeChild(downloadElement) //下载完成移除元素
    // window.URL.revokeObjectURL(href) //释放掉blob对象
  })
}
</script>
<style lang="scss">
.panel_content {
  float: right;
  vertical-align: middle;
  .left {
    font-size: 16px;
    letter-spacing: 2px;
    margin-right: 12px;
  }
  .right {
    display: inline-block;
    margin-left: 10px;
    vertical-align: middle;
    .midd {
      margin-bottom: 10px;
    }
  }
}
</style>
