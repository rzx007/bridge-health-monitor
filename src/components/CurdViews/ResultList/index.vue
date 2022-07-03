<template>
  <div class="result_main">
    <template v-if="data.length > 0">
      <div v-for="(item, index) in data" :key="index" class="result_item">
        <div class="result_item_title">
          <div class="result_item_title_left">
            <span class="title">{{ item[defaultProps.title] }}</span>
            <el-icon><QuestionFilled /></el-icon>
          </div>
        </div>
        <div class="result_item_content">
          <el-row>
            <template v-for="(ele, i) in item.children" :key="i">
              <el-col v-for="(iten, keys) in defaultLabels" :key="keys" :span="defaultSpan[keys]">
                <div class="content">
                  <label class="label" style="width: 120px">{{ iten }}： </label>
                  <p class="cont">{{ ele[defaultProps[keys]] }}</p>
                </div>
              </el-col>
            </template>
          </el-row>
        </div>
      </div>
    </template>
    <el-empty v-else description="暂无结果" />
  </div>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{ data?: any[]; defaultProps?: { [key: string]: string }; defaultLabels?: { [key: string]: string }; defaultSpan?: { [key: string]: number } }>(),
  {
    data: () => {
      return [
        {
          title: '斜拉索',
          children: [
            { label: '斜拉索斜拉索斜拉索斜拉索斜拉索斜拉索斜拉索斜拉索斜拉索斜拉索斜拉索斜拉索斜拉索', value: '斜拉索' },
            { label: '斜拉索', value: '1' }
          ]
        },
        {
          title: '斜拉索',
          children: [
            { label: '斜拉索斜拉索斜拉索斜拉索斜拉索斜拉索斜拉索斜拉索斜拉索斜拉索斜拉索斜拉索斜拉索', value: '斜拉索' },
            { label: '斜拉索', value: '斜拉索' }
          ]
        }
      ]
    },
    defaultProps: () => {
      return {
        title: 'title',
        label: 'label',
        value: 'value'
      }
    },
    defaultLabels: () => {
      return {
        label: '巡检项',
        value: '结果'
      }
    },
    defaultSpan: () => {
      return {
        label: 8,
        value: 16
      }
    }
  }
)
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
      padding: 0 18px;
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
