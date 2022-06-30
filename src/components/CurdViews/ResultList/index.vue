<template>
  <div class="result_main">
    <div v-for="(item, index) in data" :key="index" class="result_item">
      <div class="result_item_title">
        <div class="result_item_title_left">
          <span class="title">{{ item.label }}</span>
          <el-icon><QuestionFilled /></el-icon>
        </div>
      </div>
      <div class="result_item_content">
        <el-row>
          <template v-for="(ele, i) in item.list" :key="i">
            <el-col v-for="(iten, keys) in defaultProps" :key="keys" :span="12">
              <div class="content">
                <label class="label" style="width: 120px">{{ iten }}： </label>
                <p class="cont">{{ ele[keys] }}</p>
              </div>
            </el-col>
          </template>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = withDefaults(defineProps<{ data?: any[]; defaultProps?: { [key: string]: string } }>(), {
  data: () => {
    return [
      {
        label: '斜拉索',
        list: [
          { componentName: '斜拉索斜拉索斜拉索斜拉索斜拉索斜拉索斜拉索斜拉索斜拉索斜拉索斜拉索斜拉索斜拉索', evaluateName: '斜拉索' },
          { componentName: '斜拉索', evaluateName: '斜拉索' }
        ]
      },
      {
        label: '斜拉索',
        list: [
          { componentName: '斜拉索斜拉索斜拉索斜拉索斜拉索斜拉索斜拉索斜拉索斜拉索斜拉索斜拉索斜拉索斜拉索', evaluateName: '斜拉索' },
          { componentName: '斜拉索', evaluateName: '斜拉索' }
        ]
      }
    ]
  },
  defaultProps: () => {
    return {
      componentName: '巡检项',
      evaluateName: '评价'
    }
  }
})
</script>
<style lang="scss">
.result_main {
  box-sizing: border-box;
  padding: 10px 12px;
  width: 100%;
  .result_item {
    border-radius: 4px;
    background-color: #fff;
    min-height: 100px;
    width: 100%;
    margin-bottom: 12px;
    .result_item_title {
      box-sizing: border-box;
      padding: 0 18px;
      margin: 0 auto;
      line-height: 38px;
      font-size: 20px;
      font-weight: 600;
      letter-spacing: 2px;
      .result_item_title_left {
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
    }
    .result_item_content {
      .content {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 12px;
        .cont {
          flex: 1;
        }
      }
    }
  }
}
</style>
