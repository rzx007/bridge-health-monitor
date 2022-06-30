<template>
  <div>
    <CurdView :table-options="tableOptions" :from-options="fromOptions" @selection-change="selectionChange" @row-add="rowAdd">
      <template #panel>
        <el-button type="primary" @click="close1 = true">查看结果</el-button>
        <el-button type="primary">历史比对</el-button>
      </template>
    </CurdView>
    <Overlay v-model="close" title="添加巡检计划">
      <FormData v-bind="fromDataOptions" :before-submit="beforeSubmit"></FormData>
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
const close = ref<boolean>(false)
const close1 = ref<boolean>(false)
const tableOptions = reactive<ItableProps>({
  pageSize: 20,
  showPanelTool: true,
  params: {}, // params的改变都会触发，表格的重新查询
  exportUrl: '/exportAsyncRoutes',
  dataUrl: '/getAsyncRoutes',
  columns: [
    { type: 'selection', width: 70, align: 'center' },
    { type: 'index', label: '序号', align: 'center', width: 80 },
    { prop: 'creator', label: '计划名称', align: 'center', width: 180 },
    { prop: 'creator', label: '所属名称', align: 'center' },
    { label: '执行人', prop: 'proflies', align: 'center' },
    { label: '开始日期', prop: 'operation', align: 'center' },
    { label: '结束日期', prop: 'operation', align: 'center' },
    { label: '状态', prop: 'status', width: 150, align: 'center', enum: [{ id: 1, value: '已发布' }] },
    { label: '操作', slot: 'oprated', width: 150, align: 'center', fixed: 'right' }
  ]
})
const fromOptions = reactive<IformItem[]>([
  { name: 'description', label: '任务描述', span: 6, type: 'text' },
  {
    name: 'occurTime',
    label: '日期',
    span: 6,
    type: 'date',
    format: 'yyyy-MM-dd'
  }
])

const fromDataOptions = {
  postParams: {},
  postUrl: '/api/modifyComment/create',
  contentType: 'form-data',
  rules: {
    userScore: [{ required: true, message: '请填写计划名称', trigger: 'blur' }]
  },
  formItem: reactive([
    {
      name: 'userScore',
      label: '计划名称',
      type: 'text',

      span: 24
    },
    {
      name: 'issueType',
      label: '所属桥梁',
      type: 'select',
      options: [
        {
          value: '计量故障',
          label: '计量故障'
        },
        {
          value: '电线打火',
          label: '电线打火'
        }
      ]
    },
    {
      name: 'status',
      label: '计划状态',
      type: 'select',
      options: [
        {
          value: '满意',
          label: '满意'
        },
        {
          value: '不满意',
          label: '不满意'
        }
      ],
      default: '满意'
    },
    {
      name: 'userComment',
      label: '计划类型',
      type: 'select',
      options: [
        {
          value: '满意',
          label: '满意'
        },
        {
          value: '不满意',
          label: '不满意'
        }
      ],
      default: '满意'
    },
    {
      name: 'userComment',
      label: '巡检周期',
      type: 'select',
      options: [
        {
          value: '满意',
          label: '满意'
        },
        {
          value: '不满意',
          label: '不满意'
        }
      ],
      default: '满意'
    },
    {
      name: 'user',
      label: '发起人',
      type: 'text',
      disabled: true,
      default: '管理员'
    },
    {
      name: 'userComment',
      label: '支持人',
      type: 'select',
      options: [
        {
          value: '满意',
          label: '满意'
        },
        {
          value: '不满意',
          label: '不满意'
        }
      ],
      default: '张三'
    },
    {
      name: 'date',
      label: '日期',
      type: 'daterange',
      format: 'YYYY-MM-DD'
    },

    {
      name: 'userScore',
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

  return params
}
</script>
<style lang="scss"></style>
