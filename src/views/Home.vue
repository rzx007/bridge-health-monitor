<template>
  <div>
    <CurdView :table-options="tableOptions" :from-options="fromOptions" @selection-change="selectionChange" @row-add="rowAdd">
      <template #oprated>
        <el-button type="primary" @click="close1 = true">查看结果</el-button>
        <el-button type="primary">历史比对</el-button>
      </template>
      <template #releaseUser="{ row }">
        <span>{{ findUserById(row.executeUser) }}</span>
      </template>
      <template #executeUser="{ row }">
        <span>{{ findUserById(row.executeUser) }}</span>
      </template>
    </CurdView>
    <Overlay v-model="close" title="添加巡检计划">
      <FormData v-bind="fromDataOptions" :before-submit="beforeSubmit" @submit="close = false"></FormData>
    </Overlay>
    <Overlay v-model="close1" size="large" title="结果展示" oheight="80vh">
      <ResultList></ResultList>
    </Overlay>
  </div>
</template>

<script lang="ts" setup>
import CurdView from '@/components/CurdViews/index.vue'
import { reactive, ref } from 'vue'
import Overlay from '@/components/Overlay/index.vue'
import { IformItem, ItableProps } from '@/components/CurdViews/type'
import { getUserList } from '@/api'
const close = ref<boolean>(false)
const close1 = ref<boolean>(false)
const tableOptions = reactive<ItableProps>({
  pageSize: 20,
  showPanelTool: true,
  defaultPanel: ['add'],
  params: { state: '' }, // params的改变都会触发，表格的重新查询
  responseName: 'entities',
  dataUrl: '/bridge/taskInfo/taskList',
  columns: [
    { type: 'selection', width: 70, align: 'center' },
    { type: 'index', label: '序号', align: 'center', width: 80 },
    { prop: 'title', label: '计划名称', align: 'center', width: 180 },
    { label: '发起人', slot: 'releaseUser', align: 'center' },
    { label: '执行人', slot: 'executeUser', align: 'center' },
    { label: '创建日期', prop: 'sendTime', align: 'center', width: 180 },
    { label: '计划完成日期', prop: 'planTime', align: 'center' },
    { label: '实际完成日期', prop: 'overTime', align: 'center' },
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
    { label: '操作', slot: 'oprated', width: 150, align: 'center', fixed: 'right' }
  ]
})
const fromOptions = reactive<IformItem[]>([
  {
    name: 'state',
    label: '任务状态',
    span: 6,
    type: 'select',
    clearable: true,
    options: [
      { label: '已发布', value: 0 },
      { label: '已完成', value: 1 }
    ]
  }
  // {
  //   name: 'occurTime',
  //   label: '日期',
  //   span: 6,
  //   type: 'date',
  //   format: 'yyyy-MM-dd'
  // }
])

const fromDataOptions = {
  postParams: {},
  postUrl: '/bridge/taskInfo/add',
  rules: {
    userScore: [{ required: true, message: '请填写计划名称', trigger: 'blur' }]
  },
  formItem: reactive([
    {
      name: 'title',
      label: '计划名称',
      type: 'text',
      rules: [{ required: true, message: '请填写计划名称', trigger: 'blur' }],
      span: 24
    },
    {
      name: 'releaseUser',
      label: '发起人',
      type: 'text',
      disabled: true,
      default: sessionStorage.getItem('userName')
    },
    {
      name: 'executeUser',
      label: '执行人',
      type: 'select',
      rules: [{ required: true, message: '请选择执行人', trigger: 'blur' }],
      options: [],
      remoteMethod: getUserListsMthod()
    },
    {
      name: 'planTime',
      label: '日期',
      type: 'date',
      rules: [{ required: true, message: '请选择日期', trigger: 'blur' }],
      format: 'YYYY-MM-DD'
    },

    {
      name: 'remark',
      label: '备注',
      type: 'textarea',
      span: 24
    }
  ])
}
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
  params.releaseUser = sessionStorage.getItem('userId')
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
</script>
<style lang="scss"></style>
