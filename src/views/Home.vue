<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="巡检任务" name="first">
      <taskList></taskList>
    </el-tab-pane>
    <el-tab-pane label="巡检结果" lazy name="second"><taskResult></taskResult></el-tab-pane>
    <el-tab-pane label="报表下载" lazy name="third"><taskExport></taskExport></el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
import taskList from '@/views/Home/widgets/taskList.vue'
import taskResult from '@/views/Home/widgets/taskResult.vue'
import taskExport from '@/views/Home/widgets/taskExport.vue'
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
// import { flatToTreeData } from './Home/hooks/useOption'
// import data from './Home/constant/components.json'
// console.log(flatToTreeData(data))

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>
<style></style>
